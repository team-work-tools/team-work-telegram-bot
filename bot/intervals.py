from typing import List
from collections import Counter
from datetime import datetime, time
from zoneinfo import ZoneInfo

from pydantic import BaseModel, computed_field, field_validator
from pytz import timezone, UnknownTimeZoneError


class IntervalException(Exception):
    """Base class for other Interval exceptions"""
    pass


class InvalidTimeFormatException(IntervalException):
    """Raised when the time format is invalid"""
    def __init__(self, time_str: str, message="Time format must be either HH:MM or HH.MM"):
        self.time_str = time_str
        self.message = message
        super().__init__(self.message)


class InvalidIntervalException(IntervalException):
    """Raised when the interval is invalid"""
    def __init__(self, start_time: time, end_time: time, message: str = "Start time must be earlier than end time"):
        self.start_time: str = start_time.strftime("%H:%M")
        self.end_time: str = end_time.strftime("%H:%M")
        self.message: str = message
        super().__init__(self.message)


IMMUTABLE_DATE = datetime(year=2024, month=1, day=1)


class Interval(BaseModel):
    start_time: datetime
    end_time: datetime
    tz: str = "UTC"

    @computed_field
    @property
    def start_time_utc(self) -> datetime:
        return self.convert_to_utc(self.start_time)

    @computed_field
    @property
    def end_time_utc(self) -> datetime:
        return self.convert_to_utc(self.end_time)

    @field_validator("tz")
    def zone_must_be_valid(cls, tz: str):
        try:
            timezone(tz)
        except UnknownTimeZoneError:
            raise ValueError("You should pass valid zone name")
        return tz

    @staticmethod
    def convert_to_utc(local_time: datetime) -> datetime:
        utc_dt = local_time.astimezone(ZoneInfo("UTC"))
        return utc_dt

    @classmethod
    def from_string(cls, interval_str: str, tz: str = "UTC"):
        start_str, end_str = interval_str.replace(" ", "").split('-')
        start_time = datetime.combine(IMMUTABLE_DATE, cls.parse_time(start_str), ZoneInfo(tz))
        end_time = datetime.combine(IMMUTABLE_DATE, cls.parse_time(end_str), ZoneInfo(tz))

        if start_time >= end_time:
            raise InvalidIntervalException(start_time.time(), end_time.time())

        return cls(start_time=start_time, end_time=end_time, tz=tz)

    @staticmethod
    def parse_time(time_str: str) -> time:
        try:
            if ':' in time_str:
                return datetime.strptime(time_str, "%H:%M").time()
            elif '.' in time_str:
                return datetime.strptime(time_str, "%H.%M").time()
            else:
                raise InvalidTimeFormatException(time_str)
        except ValueError:
            raise InvalidTimeFormatException(time_str)

    def convert_to_timezone(self, new_tz: str):
        new_start_dt = self.start_time.astimezone(ZoneInfo(new_tz))
        new_end_dt = self.end_time.astimezone(ZoneInfo(new_tz))
        return Interval(start_time=new_start_dt, end_time=new_end_dt, tz=new_tz)

    def to_string(self):
        return f"{self.start_time.strftime('%H:%M')} - {self.end_time.strftime('%H:%M')}"

    def __hash__(self):
        return hash((self.start_time_utc, self.end_time_utc))

    def __eq__(self, other):
        if not isinstance(other, Interval):
            return False
        return (self.start_time_utc == other.start_time_utc and
                self.end_time_utc == other.end_time_utc)

    def __str__(self):
        return self.to_string()

    def __repr__(self):
        return f"Interval({self.to_string()}, tz={self.tz})"

    def overlaps_with(self, other):
        start_a = self.start_time_utc.time()
        end_a = self.end_time_utc.time()
        start_b = other.start_time_utc.time()
        end_b = other.end_time_utc.time()

        return max(start_a, start_b) < min(end_a, end_b)

    @staticmethod
    def merge_intervals(intervals):
        distinct_tzs = set([timezone(interval.tz).utcoffset(datetime.now()) for interval in intervals])

        if len(distinct_tzs) != 1:
            raise ValueError("Intervals have to have same timezone offset")

        if not intervals:
            return []

        # Sort intervals by start time
        sorted_intervals = sorted(intervals, key=lambda x: x.start_time.time())

        print("Debug:\n")
        for i in sorted_intervals:
            print(i.to_string(), i.start_time, i.end_time, i.tz, "\n")

        # Exclude repeating intervals
        counter = Counter(sorted_intervals)
        print("Debug:\n")
        print(counter)
        unique = []
        n_unique = []
        for interval in sorted_intervals:
            if counter[interval] == 1:
                unique.append(interval)
            else:
                n_unique.append(interval)

        # Merge unique intervals
        merged_intervals = []
        if len(unique) > 0:
            merged_intervals.append(unique[0])
            for current in unique[1:]:
                last = merged_intervals[-1]

                if current.overlaps_with(last) or current.start_time.time() <= last.end_time.time():
                    # Merge intervals
                    merged_intervals[-1] = Interval(
                        start_time=min(last.start_time, current.start_time),
                        end_time=max(last.end_time, current.end_time),
                        tz=last.tz
                    )
                else:
                    merged_intervals.append(current)

        return list(sorted(merged_intervals + n_unique, key=lambda x: x.start_time.time()))


DEFAULT_INTERVAL = Interval.from_string("9:00 - 17:00", "Europe/Moscow")


class DaySchedule(BaseModel):
    name: str
    included: bool = False
    intervals: List[Interval] = []

    def toggle_inclusion(self) -> None:
        self.included = not self.included
        if self.included and len(self.intervals) == 0:
            self.add_interval(DEFAULT_INTERVAL)

    def add_interval(self, interval: Interval) -> None:
        self.intervals.append(interval)
        self.intervals = Interval.merge_intervals(self.intervals)

    def remove_interval(self, interval: Interval) -> None:
        self.intervals.remove(interval)
        if len(self.intervals) == 0 and self.included:
            self.toggle_inclusion()

    @staticmethod
    def is_workday(day: str) -> bool:
        return day not in {"Saturday", "Sunday"}

    def __hash__(self):
        return hash(self.name)

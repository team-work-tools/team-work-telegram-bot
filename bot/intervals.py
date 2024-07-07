from typing import List, Tuple
from collections import Counter
from datetime import datetime, time, timedelta
from zoneinfo import ZoneInfo

from pydantic import BaseModel
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
    start_time_utc: datetime
    end_time_utc: datetime
    tz: str = "UTC"

    @staticmethod
    def validate_zone(tz: str):
        try:
            timezone(tz)
        except UnknownTimeZoneError:
            raise ValueError("You should pass valid zone name")

    @classmethod
    def from_string(cls, interval_str: str, tz: str = "UTC", shift: int = 0):
        cls.validate_zone(tz)

        start_str, end_str = interval_str.replace(" ", "").split('-')
        start_time = datetime.combine(IMMUTABLE_DATE, cls.parse_time(start_str), ZoneInfo(tz))
        end_time = datetime.combine(IMMUTABLE_DATE, cls.parse_time(end_str), ZoneInfo(tz))

        if start_time >= end_time:
            raise InvalidIntervalException(start_time.time(), end_time.time())

        hour_delta = timedelta(hours=shift)

        start_time_utc = cls.convert_to_utc(start_time) - hour_delta
        end_time_utc = cls.convert_to_utc(end_time) - hour_delta

        return cls(start_time_utc=start_time_utc, end_time_utc=end_time_utc, tz=tz)

    @staticmethod
    def convert_to_utc(local_time: datetime) -> datetime:
        utc_dt = local_time.astimezone(ZoneInfo("UTC"))
        return utc_dt

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

    def convert_to_timezone(self, new_tz: str, shift: int) -> Tuple[datetime, datetime]:
        self.validate_zone(new_tz)

        hour_delta = timedelta(hours=shift)

        new_start_dt = self.start_time_utc.astimezone(ZoneInfo(new_tz)) + hour_delta
        new_end_dt = self.end_time_utc.astimezone(ZoneInfo(new_tz)) + hour_delta
        return new_start_dt, new_end_dt

    def to_string(self, tz: str = "UTC", shift: int = 0):
        self.validate_zone(tz)

        start_time, end_time = self.convert_to_timezone(new_tz=tz, shift=shift)

        return f"{start_time.strftime('%H:%M')} - {end_time.strftime('%H:%M')}"

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
        sorted_intervals = sorted(intervals, key=lambda x: x.start_time_utc.time())

        # Exclude repeating intervals
        counter = Counter(sorted_intervals)
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

                if current.overlaps_with(last) or current.start_time_utc.time() <= last.end_time_utc.time():
                    # Merge intervals
                    merged_intervals[-1] = Interval(
                        start_time_utc=min(last.start_time_utc, current.start_time_utc),
                        end_time_utc=max(last.end_time_utc, current.end_time_utc),
                        tz=last.tz
                    )
                else:
                    merged_intervals.append(current)

        return list(sorted(merged_intervals + n_unique, key=lambda x: x.start_time_utc.time()))


DEFAULT_INTERVAL = Interval.from_string("9:00 - 17:00", "Europe/Moscow")


class DaySchedule(BaseModel):
    name: str
    included: bool = False
    intervals: List[Interval] = []

    def toggle_inclusion(self) -> None:
        self.included = not self.included
        if self.included and len(self.intervals) == 0:
            self.add_interval(DEFAULT_INTERVAL)

    def add_interval(self, interval: Interval, merge=False) -> None:
        self.intervals.append(interval)
        if merge:
            self.intervals = Interval.merge_intervals(self.intervals)

    def remove_interval(self, interval: Interval, ignore_inclusion=False) -> None:
        self.intervals.remove(interval)
        if not ignore_inclusion:
            if len(self.intervals) == 0 and self.included:
                self.toggle_inclusion()

    @staticmethod
    def is_workday(day: str) -> bool:
        return day not in {"Saturday", "Sunday"}

    def __hash__(self):
        return hash(self.name)

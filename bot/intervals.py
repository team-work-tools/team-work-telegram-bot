from datetime import datetime, time, timedelta
from typing import Dict, List, Tuple
from uuid import UUID, uuid4
from zoneinfo import ZoneInfo

from pydantic import BaseModel
from pytz import UnknownTimeZoneError, timezone
from .i18n import _
from .constants import days_array

class IntervalException(Exception):
    """Base class for other Interval exceptions"""

    pass


class InvalidTimeFormatException(IntervalException):
    """Raised when the time format is invalid"""

    def __init__(self, time_str: str, message=_("Time must be in 'hh:mm' format.")):
        self.time_str = time_str
        self.message = message
        super().__init__(self.message)


class InvalidIntervalException(IntervalException):
    """Raised when the interval is invalid"""

    def __init__(
        self,
        start_time: time,
        end_time: time,
        message: str = _("Start time must be earlier than end time."),
    ):
        self.start_time: str = start_time.strftime("%H:%M")
        self.end_time: str = end_time.strftime("%H:%M")
        self.message: str = message
        super().__init__(self.message)


IMMUTABLE_DATE = datetime(year=2024, month=1, day=1)
DEFAULT_INTERVAL = "9:00 - 17:00"


class Interval(BaseModel):
    start_time_utc: datetime
    end_time_utc: datetime
    id: UUID = uuid4()

    @staticmethod
    def validate_zone(tz: str):
        try:
            timezone(tz)
        except UnknownTimeZoneError:
            raise ValueError(_("You should pass a valid time zone name."))

    @classmethod
    def from_string(cls, interval_str: str, tz: str = "UTC", shift: int = 0):
        cls.validate_zone(tz)

        start_str, end_str = interval_str.replace(" ", "").split("-")
        start_time = datetime.combine(
            IMMUTABLE_DATE, cls.parse_time(start_str), ZoneInfo(tz)
        )
        end_time = datetime.combine(
            IMMUTABLE_DATE, cls.parse_time(end_str), ZoneInfo(tz)
        )

        if start_time >= end_time:
            raise InvalidIntervalException(start_time.time(), end_time.time())

        hour_delta = timedelta(hours=shift)

        start_time_utc = cls.convert_to_utc(start_time) - hour_delta
        end_time_utc = cls.convert_to_utc(end_time) - hour_delta

        return cls(start_time_utc=start_time_utc, end_time_utc=end_time_utc)

    @staticmethod
    def convert_to_utc(local_time: datetime) -> datetime:
        utc_dt = local_time.astimezone(ZoneInfo("UTC"))
        return utc_dt

    @staticmethod
    def parse_time(time_str: str) -> time:
        try:
            if ":" in time_str:
                return datetime.strptime(time_str, "%H:%M").time()
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
        return (
            self.start_time_utc == other.start_time_utc
            and self.end_time_utc == other.end_time_utc
        )

    def __str__(self):
        return self.to_string()

    def __repr__(self):
        return f"Interval({self.to_string()}, uid={self.id})"

    def overlaps_with(self, other):
        start_a = self.start_time_utc.time()
        end_a = self.end_time_utc.time()
        start_b = other.start_time_utc.time()
        end_b = other.end_time_utc.time()

        return max(start_a, start_b) < min(end_a, end_b)

    @staticmethod
    def merge_intervals(intervals):
        if not intervals:
            return []

        # Sort intervals by start time
        sorted_intervals = sorted(intervals, key=lambda x: x.start_time_utc.time())

        # Merge intervals
        merged_intervals = list()
        merged_intervals.append(sorted_intervals[0])
        for current in sorted_intervals[1:]:
            last = merged_intervals[-1]

            if (
                current.overlaps_with(last)
                or current.start_time_utc.time() <= last.end_time_utc.time()
            ):
                merged_intervals[-1] = Interval(
                    start_time_utc=min(last.start_time_utc, current.start_time_utc),
                    end_time_utc=max(last.end_time_utc, current.end_time_utc),
                )
            else:
                merged_intervals.append(current)

        return merged_intervals


def get_default_interval(tz: str, shift: int) -> Interval:
    Interval.validate_zone(tz)
    return Interval.from_string(DEFAULT_INTERVAL, tz, shift)


class DaySchedule(BaseModel):
    name: str
    included: bool = False
    intervals: List[Interval] = []

    def toggle_inclusion(self, tz: str, shift: int) -> None:
        self.included = not self.included
        if self.included and len(self.intervals) == 0:
            self.add_interval(get_default_interval(tz, shift))

    def add_interval(self, interval: Interval) -> None:
        self.intervals.append(interval)

    def remove_interval(
        self, interval: Interval, tz: str, shift: int, ignore_inclusion=False
    ) -> None:
        self.intervals.remove(interval)
        if not ignore_inclusion:
            if len(self.intervals) == 0 and self.included:
                self.toggle_inclusion(tz, shift)

    def get_interval(self, uid: UUID) -> Interval | None:
        for interval in self.intervals:
            if interval.id == uid:
                return interval
        return None

    def normalize_intervals(self):
        # Delete duplicates
        unique_intervals = set(self.intervals)
        # Sort and merge intervals
        if len(self.intervals) > 1:
            self.intervals = Interval.merge_intervals(unique_intervals)
        else:
            self.intervals = list(unique_intervals)
        return self

    def is_empty(self):
        return not self.included and len(self.intervals) == 0

    def __hash__(self):
        return hash(self.name)

    def __eq__(self, other):
        if not isinstance(other, DaySchedule):
            return False
        return (
            self.name == other.name
            and self.included == other.included
            and self.intervals == other.intervals
        )


def schedule_is_empty(schedule: Dict[str, DaySchedule]) -> bool:
    return all(weekday.is_empty() for weekday in schedule.values())


def is_working_time(
    schedule: Dict[str, DaySchedule],
    tz: str,
    shift: int,
    meeting_day: str,
    meeting_time: time,
) -> bool:
    if not schedule[meeting_day].included:
        return False

    for interval in schedule[meeting_day].intervals:
        st, end = interval.convert_to_timezone(tz, shift)
        st_t, end_t = st.time().replace(tzinfo=None), end.time().replace(tzinfo=None)
        if st_t <= meeting_time <= end_t:
            return True

    return False


def calculate_shift(
    old_tz: str, new_tz: str, old_shift: int, is_schedule_static: bool
) -> int:
    """Call this function every time you change the time zone.

    Args:
        old_tz (str): Previous user/chat time zone.
        new_tz (str): New user/chat time zone.
        old_shift (int): Previous time zone shift.
        is_schedule_static (bool): True if user wants to keep intervals same after changing time zone, False otherwise.

    Returns:
        int: New time zone shift.
    """
    Interval.validate_zone(old_tz)
    Interval.validate_zone(new_tz)

    old_offset = datetime.now(ZoneInfo(old_tz)).utcoffset()
    new_offset = datetime.now(ZoneInfo(new_tz)).utcoffset()

    if old_offset and new_offset:
        old_offset_h = old_offset.total_seconds() // 3600
        new_offset_h = new_offset.total_seconds() // 3600
        delta = int(old_offset_h - new_offset_h)
    else:
        raise ValueError(_("Error occurred while calculating the offset."))

    if is_schedule_static:
        return old_shift + delta
    else:
        return old_shift


def pretty_weekdays(days: list[str]):
    # Define the order of the days
    day_index = {day: i for i, day in enumerate(days_array)}

    # Sort the days based on their order in the week
    sorted_days = sorted(days, key=lambda x: day_index[x])

    groups = []
    current_group = [sorted_days[0]]

    for i in range(1, len(sorted_days)):
        if day_index[sorted_days[i]] == day_index[sorted_days[i - 1]] + 1:
            current_group.append(sorted_days[i])
        else:
            groups.append(current_group)
            current_group = [sorted_days[i]]

    groups.append(current_group)

    # Create the pretty string representation
    pretty_strings = []
    for group in groups:
        if len(group) > 1:
            pretty_strings.append(f"{group[0]} - {group[-1]}")
        else:
            pretty_strings.append(group[0])

    return ", ".join(pretty_strings)

empty_schedule = {day: DaySchedule(name=day) for day in days_array}

default_schedule = empty_schedule
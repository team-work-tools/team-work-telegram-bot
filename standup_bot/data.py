@dataclass
class State(JSONWizard):
    standup_time: Optional[str] = None
    reminder_period: Optional[str] = None
    subscribed_users: set[str] = set()

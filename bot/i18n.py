from aiogram.utils.i18n import I18n

from .constants import days_array
from .language import Language

i18n = I18n(path="locales", default_locale=str(Language.default), domain="messages")
_ = i18n.gettext


def day_to_day_i18n():
    days_array_i18n = [
        _("Monday"),
        _("Tuesday"),
        _("Wednesday"),
        _("Thursday"),
        _("Friday"),
        _("Saturday"),
        _("Sunday"),
    ]
    return {i: j for i, j in zip(days_array, days_array_i18n)}

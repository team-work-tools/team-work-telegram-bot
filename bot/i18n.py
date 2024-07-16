from aiogram.utils.i18n import I18n
from .language import Language

i18n = I18n(path="locales", default_locale=str(Language.default), domain="messages")
_ = i18n.gettext

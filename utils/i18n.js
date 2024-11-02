import en from '../locales/en.json'
import zh from '../locales/zh.json'

const messages = { en, zh }

const i18nConfig = {
  locale: uni.getLocale(),
  messages
}

export default i18nConfig

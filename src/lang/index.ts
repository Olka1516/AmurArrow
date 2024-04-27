import { createI18n } from 'vue-i18n'
import en from './en'
import ua from './ua'
import countries from './countries'

const customRule = (choice: number, choicesLength: number) => {
  if (choice === 0) {
    return 0
  }

  const teen = choice > 10 && choice < 20
  const endsWithOne = choice % 10 === 1
  if (!teen && endsWithOne) {
    return 1
  }
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2
  }

  return choicesLength < 4 ? 2 : 3
}

const messages = {
  ua: { ...ua, ...countries },
  en
}

export const i18n = createI18n({
  locale: 'ua',
  allowComposition: true,
  fallbackLocale: 'en' || process.env.VUE_APP_I18N_LOCALE,
  messages,
  pluralizationRules: {
    ua: customRule
  }
})

/// I18n module
import { I18n, createI18n } from 'vue-i18n';

/* Export i18n */
export const i18n: I18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en'
});

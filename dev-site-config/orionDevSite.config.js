const i18nConfig = require('../terraI18n.config');

const siteConfig = {
  appConfig: {
    defaultLocale: 'en-US',
    locales: i18nConfig.locales,
  },
};

module.exports = siteConfig;

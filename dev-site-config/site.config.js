const i18nConfig = require('../terraI18n.config');

const siteConfig = {
  appConfig: {
    defaultLocale: 'en-US',
    locales: i18nConfig.locales,
  },
  includeTestEvidence: !process.env.CI && !process.env.SELENIUM_GRID_URL,
};

module.exports = siteConfig;

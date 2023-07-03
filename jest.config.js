const jestConfig = require('@cerner/jest-config-terra');

module.exports = {
  ...jestConfig,
  setupFiles: [
    './jest.enzymeSetup.js',
  ],
  moduleDirectories: [
    'aggregated-translations',
    'node_modules',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
};

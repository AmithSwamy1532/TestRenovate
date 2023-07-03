const { merge } = require('webpack-merge');
const { OrionDevSitePlugin } = require('orion-dev-site-plugin');
const WebpackConfigTerra = require('@cerner/webpack-config-terra');
const {
  DirectorySwitcherPlugin,
  LocalPackageAliasPlugin,
  TerraDevSiteEntrypoints,
  TerraDevSite,
} = require('terra-dev-site');

/**
* Generates the file representing app name configuration.
*/
const devSiteConfig = (env = {}, argv = { p: false }) => {
  const production = argv.p;

  return {
    entry: TerraDevSiteEntrypoints,
    plugins: [
      new TerraDevSite({
        env,
        sites: [OrionDevSitePlugin],
      }),
    ],
    resolve: {
      plugins: [
        new DirectorySwitcherPlugin({
          shouldSwitch: !production,
        }),
        new LocalPackageAliasPlugin(),
      ],
    },
  };
};

const mergedConfig = (env, argv) => (
  merge(WebpackConfigTerra(env, argv), devSiteConfig(env, argv))
);

module.exports = mergedConfig;

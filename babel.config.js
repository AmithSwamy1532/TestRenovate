module.exports = (api) => {
  api.cache(false);
  api.assertVersion('^7.4.4');

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
  ];

  const plugins = [
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-regenerator',
  ];

  return {
    presets,
    plugins,
  };
};

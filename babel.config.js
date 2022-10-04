module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["./source"],
          alias: {
            api: "./source/api",
            assets: "./source/assets",
            components: "./source/components",
            core: "./source/core",
            pages: "./source/pages",
            routes: "./source/routes",
            utils: "./source/utils",
          },
        },
      ],
    ],
  };
};

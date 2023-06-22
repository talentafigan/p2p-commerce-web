const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#e31e52",
          },
          math: "always",
          javascriptEnabled: true,
          inlineJavaScript: true,
        },
      },
    },
  },
});

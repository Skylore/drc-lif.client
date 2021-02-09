const CracoLessPlugin = require("craco-less");
const cracoExtendScope = require("@dvhb/craco-extend-scope");
const lessToJs = require("less-vars-to-js");

const path = require("path");
const fs = require("fs");

const paletteLess = fs.readFileSync("./assets/lessvars.less", "utf8");
const palette = lessToJs(paletteLess, {
  resolveVariables: true,
  stripPrefix: true,
});
fs.writeFileSync("./assets/theme.json", JSON.stringify(palette));

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: cracoExtendScope,
      options: {
        path: "assets",
      },
    },
  ],
};

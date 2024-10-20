const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");
module.exports = override(
    addWebpackAlias({
        "@D": path.resolve(__dirname, "src"),
    })
);

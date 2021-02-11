const {babelInclude} = require("customize-cra");
const {addBabelPresets} = require("customize-cra");
const {addBabelPreset} = require("customize-cra");
const {addExternalBabelPlugin} = require("customize-cra");
const {
    addDecoratorsLegacy,
    override,
    disableEsLint,
} = require("customize-cra");
const path = require('path');


module.exports = {
    webpack: override(
        addDecoratorsLegacy(),
        disableEsLint(),
    )
};

module.exports = override(
    addDecoratorsLegacy(),
    babelInclude([
        path.resolve('src'),
        path.resolve('node_modules/react-router-native'),
    ]),
    addBabelPreset("@babel/preset-react"),
    addExternalBabelPlugin("@babel/plugin-proposal-class-properties")
)
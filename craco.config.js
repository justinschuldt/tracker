const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const darkTheme = require('@ant-design/dark-theme')
const CracoLessPlugin = require("craco-less");

// Don't open the browser during development
process.env.BROWSER = "none";

module.exports = function({ env }) {
    return {
        webpack: {
            plugins: [
            new WebpackBar({ profile: true }),
            ...(process.env.NODE_ENV === "development"
                ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
                : [])
            ]
        },
        plugins: [
            {
                plugin: CracoLessPlugin,
                options: {
                    lessLoaderOptions: {
                        modifyVars: darkTheme,
                        javascriptEnabled: true
                    }
                },
            },
            
        ]
    };
}

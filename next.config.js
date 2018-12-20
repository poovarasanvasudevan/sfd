const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]__[hash:base64:8]",
    },
    webpack: (config) => {
        config.plugins.push(
            new SWPrecacheWebpackPlugin({
                verbose: true,
                staticFileGlobsIgnorePatterns: [/\.next\//],
                runtimeCaching: [
                    {
                        handler: 'networkFirst',
                        urlPattern: /^https?.*/
                    }
                ]
            })
        )

        return config
    }
});
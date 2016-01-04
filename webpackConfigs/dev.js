import CopyWebpackPlugin from 'copy-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'
import HtmlwebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import merge from 'webpack-merge'

import pkg from '../package.json'
import { PATHS, COMMON_CONFIG, DEV_CSP, CHUNKS_NAMES, STATIC_COPY } from '../webpack.common'

const DEV_CONFIG = {
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        // Display only errors to reduce the amount of output.
        stats: 'errors-only'
    },
    resolve: {
        root:[PATHS.app]
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                include: PATHS.app
            }
        ],
        loaders: [
            {
                // Test expects a RegExp! Note the slashes!
                test: /\.s?css$/,
                loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap'],
                // Include accepts either a path or an array of paths.
                include: PATHS.app
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin( STATIC_COPY ),
        new WebpackNotifierPlugin( { title: pkg.name } ),
        new HtmlwebpackPlugin({
            appMountId: 'app',
            csp:DEV_CSP,
            mobile: true,
            template: PATHS.app+'/index.html',
            title: 'JS Boilerplate App'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({names: CHUNKS_NAMES})
    ]
};

export default (port = process.env.PORT, host = process.env.HOST) => {
    return merge(COMMON_CONFIG, DEV_CONFIG, { devServer: { host: host, port: port }});
}

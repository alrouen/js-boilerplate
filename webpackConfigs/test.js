import HtmlwebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import merge from 'webpack-merge'
import {PATHS, DEV_CSP, COMMON_CONFIG} from '../webpack.common'

const TEST_CONFIG = {
    entry: {}, // karma will set this
    resolve: {
        alias: {
            'app': PATHS.app
        }
    },
    output: {}, // karma will set this
    devtool: 'inline-source-map',
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['isparta-instrumenter'],
                include: PATHS.app
            }
        ],
        loaders: [
            {
                // Test expects a RegExp! Note the slashes!
                test: /\.s?css$/,
                loaders: ['style', 'css', 'resolve-url', 'sass'],
                // Include accepts either a path or an array of paths.
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: PATHS.test
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            appMountId: 'app',
            csp:DEV_CSP,
            mobile: true,
            template: PATHS.app+'/index.html',
            title: 'JS Skeleton App'
        })
    ]
};

export default () => {
    return merge(COMMON_CONFIG, TEST_CONFIG);
}

import Clean from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlwebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import merge from 'webpack-merge'
import {PATHS, COMMON_CONFIG, BUILD_CSP, CHUNKS_NAMES} from '../webpack.common'

const BUILD_CONFIG = {
    output: {
        path: PATHS.build,
        filename: '[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js'
    },
    resolve: {
        root:[PATHS.app]
    },
    module: {
        loaders:[
            // Extract CSS during build
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract('style', 'css', 'resolve-url', 'sass'),
                include: PATHS.app
            }
        ]
    },
    plugins: [
        new Clean([PATHS.build]),
        new ExtractTextPlugin('styles.[chunkhash].css'),
        new HtmlwebpackPlugin({
            appMountId: 'app',
            csp:BUILD_CSP,
            mobile: true,
            template: PATHS.app+'/index.html',
            title: 'JS Skeleton App'
        }),
        new webpack.optimize.CommonsChunkPlugin({names: CHUNKS_NAMES}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

export default () => {
    return merge(COMMON_CONFIG, BUILD_CONFIG);
}

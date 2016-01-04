var CopyWebpackPlugin = requre('copy-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    node_modules_dir: path.resolve(__dirname, 'node_modules'),
    test: path.join(__dirname, 'test')
};

const DEV_CSP = "script-src * 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'";
const BUILD_CSP = "script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'";
const CHUNKS_NAMES = ['vendor', 'manifest'];

//TODO: so far airflux in vendor libs seems to brake the compilation, with this error:
// ERROR in multi vendor, Module not found: Error: Cannot resolve module 'aiflux' in...
const VENDOR_LIBS = [
    'classnames',
    'es6-promise',
    'intl',
    'immutable',
    'lodash',
    'moment',
    'react',
    'react-dom',
    'react-router',
    'whatwg-fetch'
];

const pluginsForDev = () => { return [
    new HtmlwebpackPlugin({
        appMountId: 'app',
        csp:DEV_CSP,
        mobile: true,
        template: PATHS.app+'/index.html',
        title: 'JS Boilerplate App'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({names: CHUNKS_NAMES})
];};

const pluginsForBuild = () => { return [
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
];};

const pluginsForTest = () => { return [
    new HtmlwebpackPlugin({
        appMountId: 'app',
        csp:DEV_CSP,
        mobile: true,
        template: PATHS.app+'/index.html',
        title: 'JS Skeleton App'
    })
];};

const commonConfig = {
    entry: {
        app: PATHS.app,
        vendor: VENDOR_LIBS
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            // Set up jsx. This accepts js too thanks to RegExp
            {
                test: /\.jsx?$/,
                exclude: [PATHS.node_modules_dir],
                loaders: ['babel'],
                include: PATHS.app
            },
            {
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader : 'file-loader'
            }
        ]
    },

    sassLoader: {
        includePaths: [PATHS.node_modules_dir+'/font-awesome/scss']
    },

    // Entry accepts a path or an object of entries.
    // The build chapter contains an example of the latter. entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: []
};

// Default configuration
if(!TARGET || TARGET === 'start') {
    module.exports = merge(commonConfig, {
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            // Display only errors to reduce the amount of output.
            stats: 'errors-only',
            // Parse host and port from env so this is easy to customize.
            host: process.env.HOST,
            port: process.env.PORT || 8081
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
        plugins: pluginsForDev()
    });
}

// Build configuration
if(TARGET === 'build') {
    module.exports = merge(commonConfig, {
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
        plugins: pluginsForBuild()
    });
}

// Test configuration
if(TARGET === 'test' || TARGET === 'tdd') {

    module.exports = merge(commonConfig, {
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
        plugins: pluginsForTest()
    });
}

import path from 'path'
import webpack from 'webpack'

export const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    node_modules_dir: path.resolve(__dirname, 'node_modules'),
    test: path.join(__dirname, 'test')
};

export const DEV_CSP = "script-src * 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'";
export const BUILD_CSP = "script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' http://query.yahooapis.com";
export const CHUNKS_NAMES = ['vendor', 'manifest'];
export const STATIC_COPY = [
    {from:path.join(PATHS.app, 'config'), to:'config'}
];

export const VENDOR_LIBS = [
    'airflux',
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

export const COMMON_CONFIG = {
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
                test   : /\.(png|jpg|jpeg|gif|bmp)$/,
                loader : 'file?name=images/[hash].[ext]'
            },
            {
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9-\.=]+)?$/,
                loader : 'file?name=fonts/[hash].[ext]'
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

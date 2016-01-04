// Reference: http://karma-runner.github.io/0.13/config/configuration-file.html
export default (config) => {
    config.set({

        frameworks: [
            // Reference: https://github.com/karma-runner/karma-mocha // Set framework to mocha
            'mocha'
        ],

        reporters: [
            // Reference: https://github.com/mlex/karma-spec-reporter // Set reporter to print detailed results to console
            'spec',
            // Reference: https://github.com/karma-runner/karma-coverage // Output code coverage files
            'coverage'
        ],

        files: [
            // Grab all files in the tests directory that contain _test.
            'test/**/*_test.*'
        ],

        preprocessors: {
            // Reference: http://webpack.github.io/docs/testing.html
            // Reference: https://github.com/webpack/karma-webpack
            // Convert files with webpack and load sourcemaps
            'test/**/*_test.*': ['webpack', 'sourcemap']
        },

        browsers: [
            // Run tests using JSDom
            'jsdom'
        ],

        singleRun: true,
        // Configure code coverage reporter

        coverageReporter: {
            dir: 'build/coverage/',
            type: 'html'
        },
        // Test webpack config
        webpack: require('./webpack.config.babel'),
        // Hide webpack build information from output
        webpackMiddleware: {
            noInfo: true
        }
    })
}

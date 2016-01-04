import webpackConfig from './webpack.config.babel'

module.exports = function(config) {
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
        // optionally, configure the reporter
        coverageReporter: {
            dir: 'test-results/coverage',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'html', subdir: 'report-html' },
                // reporters supporting the `file` property, use `subdir` to directly
                // output them in the `dir` directory
                { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
                { type: 'text', subdir: '.', file: 'text.txt' },
                { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
            ]
        },

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

        // Test webpack config
        webpack: webpackConfig,
        // Hide webpack build information from output
        webpackMiddleware: {
            noInfo: true
        }
    })
}

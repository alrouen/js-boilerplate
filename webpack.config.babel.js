
import devConfig from './webpackConfigs/dev';
import buildConfig from './webpackConfigs/build';
import testConfig from './webpackConfigs/test';

var target = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : 'start';
target = target === 'tdd' ? 'test' : target;

const targetConfigSettings = {
    start: () => {
        return devConfig(8081);
    },

    build: () => {
        return buildConfig();
    },

    test: () => {
        return testConfig();
    }
};

const targetConfig = targetConfigSettings[target] ? targetConfigSettings[target]() : targetConfigSettings['start']();

export default targetConfig;

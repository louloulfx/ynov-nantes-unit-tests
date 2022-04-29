const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

const { cwd } = require('process');

setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

exports.config = {
    tests: './tests/test-e2e.js',
    output: 'dist',
    helpers: {
        Playwright: {
            waitForTimeout: 5000,
            show: process.env.HEADLESS === 'true' ? false : true,
            timeout: 5000,
        },
        REST:{}
    },
    bootstrap: null,
    mocha: {},
    name: 'integrations-e2e'
}

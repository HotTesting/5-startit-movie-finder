require('ts-node').register();

module.exports.config = {
    specs: ['spec.ts'],
    directConnect: true,
    baseUrl: 'https://movies-finder.firebaseapp.com/',
    SELENIUM_PROMISE_MANAGER: false,

    framework: 'mocha',
    mochaOpts: {
        timeout: 60000,
        //reporter: 'nyan'
    }
}
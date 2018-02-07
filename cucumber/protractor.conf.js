require('ts-node').register();

module.exports.config = {
    specs: ['features/*.feature'],
    directConnect: true,
    baseUrl: 'https://movies-finder.firebaseapp.com/',
    SELENIUM_PROMISE_MANAGER: false,

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    cucumberOpts: {
        format: ['node_modules/cucumber-pretty'],
        require: ['./stepDefinitions.ts'],
    }
};

/**
dependencies:
    "@types/cucumber": "^0.0.38",
    "@types/node": "^7.0.8",
    "@types/selenium-webdriver": "~2.53.39",
    "chai": "^3.5.0",
    "chai-as-promised": "^6.0.0",
    "cucumber": "^4.0.0",
    "protractor-cucumber-framework": "^1.0.1",
    "protractor": "^5.2.2",
    "ts-node": "^4.1.0",
    "typescript": "^2.7.1"
 */
require('ts-node').register();

module.exports.config = {
  specs: ['spec.ts'],

  baseUrl: 'https://movies-finder.firebaseapp.com/',
  SELENIUM_PROMISE_MANAGER: false,

  capabilities: {
    browserName: 'chrome',
    enableVNC: true,
    name: "Oleksandr Khotemskyi"
  },
  onPrepare: async function () {
    // Global implicit wait setup
    await browser.manage().timeouts().implicitlyWait(1000)

    afterEach(async function () {
      await browser.manage().timeouts().implicitlyWait(1000)
    })

    // Adding nice console output. 
    // Provided by: https://github.com/razvanz/jasmine2-reporter
    let ConsoleReporter = require('jasmine2-reporter').Jasmine2Reporter
    let console_reporter_options = {
      startingSpec: true
    }
    jasmine.getEnv().addReporter(new ConsoleReporter(console_reporter_options))

  }
}
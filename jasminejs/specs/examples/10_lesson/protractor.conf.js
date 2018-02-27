require('ts-node').register();

// import * as log4js from 'log4js'
let log4js = require('log4js')
log4js.setGlobalLogLevel(process.env.LOG_LEVEL || 'ERROR')
const logger = log4js.getLogger('ConfigLogger')

// Report portal config
const ReportportalAgent = require('agent-js-jasmine');
/** 
  launch: default_TEST_EXAMPLE
  project: default_personal
*/
const agent = new ReportportalAgent({
  token: "5da75e8d-5e23-4761-9edb-e44a329d90bf",
  endpoint: "http://localhost:8080/api/v1",
  launch: "default_TEST_EXAMPLE",
  project: "default_personal",
  attachPicturesToLogs: false
});


module.exports.config = {
  specs: ['./10.lesson.ts'],

  baseUrl: 'https://movies-finder.firebaseapp.com/',
  SELENIUM_PROMISE_MANAGER: false,

  capabilities: {
    browserName: 'chrome',
    enableVNC: true,
    name: "Oleksandr Khotemskyi"
  },
  onPrepare: async function () {
    logger.info('On prepare started')

    // Adding nice console output. 
    // Provided by: https://github.com/razvanz/jasmine2-reporter
    let ConsoleReporter = require('jasmine2-reporter').Jasmine2Reporter
    let console_reporter_options = {
      startingSpec: true,
      failuresSummary: false
    }
    jasmine.getEnv().addReporter(new ConsoleReporter(console_reporter_options))


    // XML REPORT
    // To view XML https://github.com/lukejpreston/xunit-viewer
    // sudo xunit-viewer --results=1.xml --output=./

    let reporters = require('jasmine-reporters');
    let junitReporter = new reporters.JUnitXmlReporter({
      savePath: `${__dirname}/xml`,
      consolidateAll: false
    });
    jasmine.getEnv().addReporter(junitReporter)


    // Allure results. After XML generated - need to generate HTML
    // npm install -g allure-commandline
    // allure generate --clean
    let AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));


    // REPORT PORTAL
    jasmine.getEnv().addReporter(agent.getJasmineReporter());

  },

  // RP hack to finish correctly. This will wait for RP to finish all http requests
  afterLaunch: () => {
    return agent.getExitPromise();
  }
}
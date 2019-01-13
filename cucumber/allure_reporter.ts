declare const CucumberJSAllureFormatter: any;
declare const AllureRuntime: any;

export default class Reporter extends CucumberJSAllureFormatter {
  constructor(options) {
    super(options, new AllureRuntime({ resultsDir: "./out/allure-results" }), {
      labels: {
        issue: [/@bug_(.*)/],
        epic: [/@feature:(.*)/]
      }
    });
  }
}

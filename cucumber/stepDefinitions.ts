import { browser, element, by } from 'protractor';
import { Then, When, Given } from 'cucumber'
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


let first_operand = element(by.model('first'))
let second_operand = element(by.model('second'))
let go_button = element(by.id('gobutton'))
let result = element(by.binding('latest'))

Given(/^I am on ng1 calculator page$/, async () => {
    await expect(await browser.getTitle()).to.equal('Super Calculator')
});

When(/^I calculate "(.*?)" "(.*?)" "(.*?)"$/, async (num1: string, optor: string, num2: string) => {
    await first_operand.sendKeys(num1)
    await element(by.cssContainingText('option', optor)).click()
    await second_operand.sendKeys(num2)
    await go_button.click();
});

Then(/^the result "(.*?)" should be displayed$/, async (expected: string) => {
    await expect(await result.getText()).to.equal(expected);
});

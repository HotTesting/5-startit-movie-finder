import { browser, element, By, $, $$, Key, ExpectedConditions as EC } from 'protractor'
import * as log4js from 'log4js'
const logger = log4js.getLogger('SpecLogger')

fdescribe('Reporting', function () {

    it('should report passed test', async function () {
        logger.debug('I am passed!')
    })

    it('should report failed test', async function () {
        logger.error('I am failed!')
        throw new Error('Test failed error')
    });

    (it('should report skipped test', async function () {
        logger.debug('You should not see this')
    }) as any).pend('This is skip reason')
    
})
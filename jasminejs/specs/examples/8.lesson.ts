import { browser, element, By, $, $$, Key, ExpectedConditions as EC } from 'protractor'
import * as log4js from 'log4js'
const logger = log4js.getLogger('SpecLogger')

describe('Logger', function () {
    it('can log', async function () {
        let someNiceVariable = 'I am very important!'
        logger.trace('this is trace!')
        logger.debug('this is debug!')
        logger.info('this is info!')
        logger.warn('Something not really bad, but take a look!')
        logger.error('this is error!')
        logger.fatal(`Something terribly wrong! ${someNiceVariable}`)
    })
})

describe('ActionSequence', function () {
    it('can drag-and-drop', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/drag_and_drop', 20000) // second optional param - page load timeout

        await browser.sleep(3000)

        let a: any = $('#column-a header') //.getLocation()
        //.then((location) => { return { x: location.x + 50, y: location.y + 50 } })

        let b: any = $('#column-b header')// .getLocation()
        // .then((location) => { return { x: location.x + 50, y: location.y + 50 } })

        let dragAndDrop = function (elemnt1, elemnt2) {
            return browser.actions()
            .mouseMove(a, { x: 5, y: 5 })
            .mouseDown()
            .mouseMove(b, { x: 5, y: 5 })
            .mouseUp()
        }
        await dragAndDrop(a, b).perform()
        await browser.sleep(20000)
    })

    it('can press keys', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/key_presses', 20000) // second optional param - page load timeout

        await browser.sleep(3000)
        await browser.actions().keyDown(Key.COMMAND).keyUp(Key.COMMAND).perform()
        await browser.sleep(5000)
        await browser.actions().keyDown(Key.COMMAND).sendKeys('F').keyUp(Key.COMMAND).perform()
        await browser.sleep(10000)
    })
})

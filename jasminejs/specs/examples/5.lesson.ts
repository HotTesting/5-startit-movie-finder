import { browser, element, By, $, $$, Key, ExpectedConditions as EC } from 'protractor'

describe('Waits', function () {
    it('implicit wait should wait for element to be present', async function () {
        await browser.manage().timeouts().implicitlyWait(10000)
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/dynamic_loading/2', 20000) // second optional param - page load timeout
        await $('#start button').click()
        // 10 sec waiting
        console.log(await $('#finish h4').getText())
    })

    it('explicit wait should wait for element to be present', async function () {
        // await browser.manage().timeouts().implicitlyWait(10000)
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/dynamic_loading/2', 20000) // second optional param - page load timeout
        await $('#start button').click()
        // 10 sec waiting
        let i = 0
        await browser.wait(async function () {
            console.log('Doing search', i)
            i++
            return await $('#finish h4').isPresent()
        }, 20000, 'result should appear in 20 seconds, but it doesnt')

        console.log(await $('#finish h4').getText())
    })

    it('explicit wait should wait for element to be displayed', async function () {
        // await browser.manage().timeouts().implicitlyWait(10000)
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/dynamic_loading/2', 20000) // second optional param - page load timeout
        await $('#start button').click()
        // 10 sec waiting
        await browser.wait(EC.visibilityOf($('#finish h4')),
            20000,
            'result should appear in 20 seconds, but it doesnt')

        console.log(await $('#finish h4').getText())
    })

    it('explicit wait should wait for element to match 2 conditions', async function () {

        // await browser.manage().timeouts().implicitlyWait(10000)

        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/dynamic_loading/1', 20000) // second optional param - page load timeout
        await $('#start button').click()
        // 10 sec waiting
        await browser.wait(EC.and(
            EC.visibilityOf($('#finish h4')),
            EC.invisibilityOf($('#loading')),
        ), 20000, 'result should appear in 20 seconds, but it doesnt')

        console.log(await $('#finish h4').getText())
    })

    it('explicit wait should wait for element to be displayed or loader disappear', async function () {

        // await browser.manage().timeouts().implicitlyWait(10000)

        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/dynamic_loading/1', 20000) // second optional param - page load timeout
        await $('#start button').click()
        // 10 sec waiting
        await browser.wait(EC.or(
            EC.visibilityOf($('#finish h4')),
            // Same as previous example - waiting for invisibility
            EC.not(EC.visibilityOf($('#loading'))),
        ), 20000, 'result should appear in 20 seconds, but it doesnt')

        // Extended usage
        // await browser.wait(EC.not(purchaseIsCompletedSuccessfully), 20000)

        console.log(await $('#finish h4').getText())
    })

    it('explicit wait should iteract with implict wait very strange', async function () {

        await browser.manage().timeouts().implicitlyWait(9000)

        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/dynamic_loading/2', 20000) // second optional param - page load timeout
        //await $('#start button').click()
        // 10 sec waiting
        let i = 0
        await browser.wait(async function () {
            console.log(i)
            i++
            return EC.visibilityOf($('#finish h4'))()
        },
            20000,
            'result should appear in 20 seconds, but it doesnt').then(null, err => {
                console.log(JSON.stringify(err))
            })
    })
})
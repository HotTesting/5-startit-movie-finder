import { browser, element, By, $, $$, Key } from 'protractor'

describe('Protractor searching', function () {
    it('Should return elements by css', async function () {
        await browser.get('/')
        let a = element.all(By.css('movie-card')).first()
        let b = $('movie-card') // the same as element(By.css('movie-card'))
        let c = $$('div').last()

        console.log(await a.getText())
        console.log(await b.getText())
        console.log(await c.getText())
    })

    it('should allow chaining of elements', async function () {
        await browser.get('/')
        let a = $$(`movie-card`).get(3).element(By.xpath('..'))

        console.log(await a.getAttribute('href'))
        // let b = $$(`movie-card h4 a[href*='movie']`).first()

    })

    it('should allow searching by XPATH', async function () {
        await browser.get('/')
        // https://docs.google.com/document/d/11EUbCnzutLiMCGQJzB6ebnKUnOkP7lNNPwJ3cGqBYg0/edit#
    })

})

describe('Browser', function () {
    it('can open URLs', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/', 20000) // second optional param - page load timeout
    })

    it('can sleep', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/') // second optional param - page load timeout

        console.time('sleep')
        await browser.sleep(5000)
        console.timeEnd('sleep')
    })

    it('can fork new driver instance', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/') // second optional param - page load timeout

        let browser2 = await browser.forkNewDriverInstance().ready;

        await browser2.get('/')
        await browser2.sleep(5000)

        //await browser.close()
        // Dirrect search in specified browser
        await browser2.$('div')
    })

    it('can switch to iframe', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/iframe') // second optional param - page load timeout
        let iframe = $('#mce_0_ifr')
        // BUG - test stops when passing ElementFinder into .frame()
        await browser.switchTo().frame(iframe.getWebElement())
        console.log(await $('#tinymce').getText());

        await browser.switchTo().defaultContent()
        console.log(await $('h3').getText())
    })

})




describe('ElementFinder', function () {
    it('can be clicked', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/checkboxes') // second optional param - page load timeout

        await $('[type="checkbox"]').click()
        await browser.sleep(3000)
    })

    it('can be checked for display', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/checkboxes') // second optional param - page load timeout

        await console.log(await $('NOT_EXISTING_ELEMENT').isDisplayed().then(null, err => false))
        await browser.sleep(3000)
    })

    it('can be checked for presence', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/checkboxes') // second optional param - page load timeout

        await console.log(await $('NOT_EXISTING_ELEMENT').isPresent())
        await browser.sleep(3000)
    })


    it('can be checked for presence', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/checkboxes') // second optional param - page load timeout

        await console.log(await $('NOT_EXISTING_ELEMENT').isPresent())
        await browser.sleep(3000)
    })

    it('can send keys into it', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/login') // second optional param - page load timeout

        await $('#username').clear()
        await $('#username').sendKeys('ADMIN', Key.ENTER)
        await $('#username').submit()

        await browser.sleep(15000)
    })


    it('can work with ElementArrayFinder`s ', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/checkboxes') // second optional param - page load timeout

        // Returns array with all selected statuses of found elements
        console.log(await $$('[type="checkbox"]').isSelected())
    })

    it('can work with ElementArrayFinder`s ', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/checkboxes') // second optional param - page load timeout

        // Returns number of found elements
        console.log(await $$('[type="checkbox"]').count())

        await $$('[type="checkbox"]').each(async (elem, index) => {
            console.log(await elem.isSelected(), 'INDEX:', index)
            if (!(await elem.isSelected())) {
                await elem.click()
            }
            console.log(await elem.isSelected(), 'INDEX:', index)
        })
    })

    it('can work with ElementArrayFinder`s ', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/checkboxes') // second optional param - page load timeout

        // Returns number of found elements
        console.log(await $$('[type="checkbox"]').count())

        console.log(await $$('[type="checkbox"]').map(async (elem, index) => {
            console.log(await elem.isSelected(), 'INDEX:', index)
            if (!(await elem.isSelected())) {
                await elem.click()
                return `${index} was checked!`
            }
            console.log(await elem.isSelected(), 'INDEX:', index)
            return `${index} was NOT checked!`
        }))
    })


})

describe('Expect', function () {
    it('should assert something', async function () {
        expect(['abc', 'def']).toContain('def')
        expect('HELLO WORLD').toContain('WORLD')
    })
})

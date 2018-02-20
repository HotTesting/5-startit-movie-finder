import { browser, element, By, $, $$, Key, ExpectedConditions as EC } from 'protractor'

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
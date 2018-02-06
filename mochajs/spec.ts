import { browser, element, By, $, $$, Key } from 'protractor'
import { expect } from 'chai';

describe('Protractor searching', function () {
    it('Should return elements by css', async function () {
        await browser.get('/')
        let a = element.all(By.css('movie-card')).first()
        let b = $('movie-card') // the same as element(By.css('movie-card'))
        let c = $$('movie-card').last()

        console.log(await a.getText())
        console.log(await b.getText())
        console.log(await c.getText())
    })

    it('should allow chaining of elements', async function () {
        await browser.get('/')
        let a = $$(`movie-card`).get(3).element(By.xpath('..'))

        console.log(await a.getAttribute('href'))
        expect(true).to.be.true;
    })
})

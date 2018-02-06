import { browser, element, By, by, until, $, $$, Key } from 'protractor'

describe('Search ', async function () {

    it('by exisiting name, should show first movie with complete name match', async function () {

    })

    it('results(all of them) should contain serach request', async function () {
        await browser.get('/', 1000);

        const SEARCH_REQUEST = 'Dreams';
        let searchField = $('input[name="searchStr"]');
        await searchField.sendKeys(SEARCH_REQUEST, Key.ENTER);
        await browser.sleep(5000)

        let foundMovieTitles = $$('movies > div > div.row.is-flex movie-card a[title]');
        let titles: any = await foundMovieTitles.getAttribute('title')
        expect(titles.length).toBe(20, 'Number of found movies must be 20')
        titles.forEach(title => expect(title).toContain(SEARCH_REQUEST))
    })

    it('result should be empty, after request for nonexistent movie', async function () {

    })
})
import { browser, element, By, by, until, $, $$, Key, ExpectedConditions as EC } from 'protractor'
import { HomePage } from './pages/home'

fdescribe('Search ', async function () {
    const homePage = new HomePage()

    beforeEach(async function () {
        await homePage.open()
    })

    xit('by exisiting name, should show first movie with complete name match', async function () {
        
    })

    fit('results(all of them) should contain search request', async function () {
        const SEARCH_REQUEST = 'Dreams';
        await homePage.searchFor(SEARCH_REQUEST)
        let titles = await homePage.getFoundMoviesTitles()
        expect(titles.length).toBe(20, 'Number of found movies must be 20')
        titles.forEach(title => expect(title).toContain(SEARCH_REQUEST))
    })

    it('result should be empty, after request for nonexistent movie', async function () {
        const SEARCH_REQUEST = 'NON-EXIST!'
        await homePage.searchFor(SEARCH_REQUEST)
        let movies = await homePage.getFoundMovies()
        expect(await movies.count()).toBe(0, 'Number of found movies must be 0')
    })
})
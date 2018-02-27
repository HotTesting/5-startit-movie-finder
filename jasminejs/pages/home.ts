import { browser, element, By, by, until, $, $$, Key, ExpectedConditions as EC, ElementArrayFinder } from 'protractor'

export class HomePage {
    private searchField = $$('input[name="searchStr"]').first()
    private foundMovies: ElementArrayFinder = $$('movies > div > div.row.is-flex movie-card');

    async searchFor(search_request: string | number) {
        await this.searchField.sendKeys(search_request, Key.ENTER);
    }

    async open() {
        await browser.get('/', 1000)
    }

    async getFoundMovies() {
        await browser.wait(EC.visibilityOf(this.foundMovies.first()), 5000, 'Movies not loaded!')
        return this.foundMovies
    }

    // How to return another pageobject 
    // async goToDetails(indx:number) {
    //     let movies = await this.getFoundMovies()
    //     await movies[indx].click()
    //     await browser.wait

    //     return new DetailsPage()
    // }
    // 
    async getFoundMoviesTitles() {
        /** 
         * Notice, this.getFoundMovies() resolves to array of ElementFinders, not ElementArrayFinder object.
         * Probably protractor bug.
        */
        let foundMovies = await this.getFoundMovies()
        
        let attributes = []
        for (let movie of foundMovies) {
            attributes.push(await movie.$('a[title]').getAttribute('title'))
        }
        return Promise.all(attributes)

    }
}

// let detailsPage = new HomePage().goToDetails(0)
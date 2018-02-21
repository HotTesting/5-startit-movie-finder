import { browser, element, By, by, until, $, $$, Key, ExpectedConditions as EC } from 'protractor'

export class HomePage {
    private searchField = $$('input[name="searchStr"]').first()
    private foundMovies = $$('movies > div > div.row.is-flex movie-card');

    async searchFor(search_request: string | number) {
        await this.searchField.sendKeys(search_request, Key.ENTER);
    }

    async open() {
        await browser.get('/', 1000)
    }

    async getFoundMovies(): Promise<any> {
        await browser.wait(EC.visibilityOf(this.foundMovies.first()), 5000, 'Movies not loaded!')
        return this.foundMovies
    }

    async getFoundMoviesTitles() {
        let foundMovies = await this.getFoundMovies()
        return foundMovies.$$('a[title]').getAttribute('title')
    }
}
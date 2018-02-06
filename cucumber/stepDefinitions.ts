import { browser, element, by, $$ } from 'protractor';
import { Then, When, Given } from 'cucumber'
import { expect } from 'chai';


Given("I am on home page", async function () {
    await browser.get('/')
});

When("I see movie cards loaded", async function () {
    await expect(await $$('movie-card').count()).not.to.equal(0)
});

Then("Movie Card should have name", async function () {
    await expect(await $$('movie-card').first().$('.text-ellipsis a').getAttribute('title'))
        .to.contain('Dilwale Dulhania Le Jayenge')
});

Then("Movie Card should have raiting pointer", async function () {
    let movieRating = $$('movie-card').get(0).$('small')
    await expect(await movieRating.isDisplayed())
        .to.be.true
});

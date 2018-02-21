import { browser, element, By, $, $$, Key, ExpectedConditions as EC } from 'protractor'

describe('Lazy Elements', function () {
    let goneMessage = element(By.cssContainingText('p#message', `It's gone!`))
    let button = $('button#btn')

    xit('should not be searched if no manipulations', async function () {
        await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
        await browser.get('http://the-internet.herokuapp.com/dynamic_controls') // second optional param - page load timeout

        // expect(goneMessage.isPresent()).toBe(true)

        await browser.sleep(30000);
        try {
            console.log('Got text:', await goneMessage.getText())
        } catch (error) {
            console.log(error.message)
        }

        await button.click()
        await browser.wait(EC.visibilityOf(goneMessage), 10000)
        try {
            console.log('Got text:', await goneMessage.getText())
        } catch (error) {
            console.log(error.message)
        }
    })
})


describe('Model Pattern', function () {
    interface IMovie {
        title: string,
        rating: number,
        cast: {
            img: string
            name: string
        }[]

    }


    class Movie implements IMovie {
        public title: string = null
        public rating: number = null
        public cast: { img: string, name: string }[] = []

        setTitle(title: string) {
            this.title = title
        }
        setRating(rating: number) {
            this.rating = rating
        }

        pushToCast(actor: { img: string, name: string }) {
            this.cast.push(actor)
        }
    }

    class Comedy extends Movie {
        genre: 'Comedy'
    }


    xit('can be created for data from page', async function () {
        await browser.get('https://movies-finder.firebaseapp.com/movie/19404')

        await browser.sleep(1500)

        let movieModel = new Movie()

        let rating = await ($('app-movie h2 .label').getText())
        movieModel.setRating(parseFloat(rating))

        let casts = await $$('app-movie div .col-md-3 .thumbnail').asElementFinders_()
        await Promise.all(casts.map(async function (elem) {
            let imgLink = await elem.$('img').getAttribute('src')
            let name = await elem.$('a').getText()
            await movieModel.pushToCast({ img: imgLink, name: name })
        }))

        console.log('Model is', JSON.stringify(movieModel))
    })
})
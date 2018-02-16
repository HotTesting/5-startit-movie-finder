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

    describe('can fork', async function () {
        let browser2 = null

        it(' new driver instance', async function () {
            await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
            await browser.get('http://the-internet.herokuapp.com/') // second optional param - page load timeout

            browser2 = await browser.forkNewDriverInstance().ready;
            await browser2.get('/')
            await browser2.sleep(5000)
            // Direct search for element in specified browser
            console.log('Element displayed in second browser!', await browser2.$('div').isDisplayed())
        })

        afterAll(async function () {
            // Cleaning up to not have zombie browser in other tests
            if (browser2) {
                browser2.quit()
            }
        })

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

describe('Lazy Elements', function () {
    let goneMessage = element(By.cssContainingText('p#message', `It's gone!`))
    let button = $('button#btn')

    it('should not be searched if no manipulations', async function () {
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


    it('can be created for data from page', async function () {
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

describe('ASYNC code', function () {

    it('can work with callbacks', function () {
        let fs = require('fs')
        console.time('fileread')
        fs.readFile('./package.json',
            'utf8',
            (err, data) => {
                if (err) throw err;
                console.log(data);
                fs.readFile('./.travis.yml',
                    'utf8',
                    (err, data) => {
                        if (err) throw err;
                        console.log(data);
                    });
            });
        console.timeEnd('fileread')
    })

    it('promises example', function () {
        let fs = require('fs')
        console.time('fileread')
        let a = new Promise(function (resolve, reject) {
            fs.readFile('./package.json',
                'utf8',
                (err, data) => {
                    if (err) { reject(err) }
                    resolve(data)
                })
        });
        console.log(a)
        a.then(console.log, console.log)
            .then(() => console.timeEnd('fileread'))
    })

    it('promises can be used for protractor synchronization', function () {
        let a = element.all(By.css('movie-card')).first()
        let b = $('movie-card') // the same as element(By.css('movie-card'))
        let c = $$('div').last()

        return browser.get('/').then(() => {
            return a.getText().then((text) => {
                console.log('1', text)
            })
        }).then(() => {
            return c.getText().then((text) => {
                console.log('3', text)
            })
        }).then(() => {
            return b.getText().then((text) => {
                console.log('2', text)
            })
        })
    })

    it('async/await error handling', async function () {
        try {
            await $('div').getText()
        } catch (error) {
            console.log('Got error:', error)
            // throw error
        } finally {
            console.log('finally block executed in any case')
        }
    })

    fit('iterating with async actions', async function () {
        await browser.get('/')

        let elements = await $$('div').asElementFinders_()

        for (let elem of elements) {
            console.log(await elem.getText())
        }

    })

})
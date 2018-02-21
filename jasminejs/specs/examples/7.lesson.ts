import { browser, element, By, $, $$, Key, ExpectedConditions as EC } from 'protractor'

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

    it('iterating with async actions', async function () {
        await browser.get('/')

        let elements = await $$('movie-card').asElementFinders_()

        for (let elem of elements) {
            console.log(await elem.getText())
        }

    }, 60000)

})
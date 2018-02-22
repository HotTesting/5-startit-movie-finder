import { browser, element, By, $, $$, Key, ExpectedConditions as EC } from 'protractor'
import * as log4js from 'log4js'
const logger = log4js.getLogger('SpecLogger')

fdescribe('execute script', function () {
    it('can return something ', async function () {
        await browser.get('/movie/19404')
        await browser.sleep(2000)

        let text = await browser.executeScript(`
            return $("app-movie > div:nth-child(1) > div.col-md-8 > h2").text().trim()
                .replace($("app-movie > div:nth-child(1) > div.col-md-8 > h2 > small")
                .text().trim(), '')
        `)

        console.log('Got text by js:', text)

    })

    it('can return something ', async function () {
        await browser.get('/movie/19404')
        await browser.sleep(2000)

        let text = await browser.executeAsyncScript(`
            var callback = arguments[arguments.length - 1]
            
        `)

        console.log('Got text by js:', text)

    })

    it('can return something ', async function () {
        await browser.get('/movie/19404')
        await browser.sleep(2000)

        let a = element(By.js(`var buttons = document.querySelectorAll('button');buttons.forEach((but)=> {
            if(but.innerText.includes('Go!')) {
                return but
            }
        })`))


        By.addLocator('buttonTextOWN', `var buttons = document.querySelectorAll('button');buttons.forEach((but)=> {
            if(but.innerText.includes('Go!')) {
                return but
            }
        })`)


        let b = element(By['buttonTextOWN'])

        console.log('Got text by js search:', a)

        // element(by.ratingMoreThan('7.0'));

    })

    it('can send some HTTP requests from page', async function () {
        await browser.get('/movie/19404')
        await browser.sleep(2000)

        let text = await browser.executeAsyncScript(`
            // 1. Создаём новый объект XMLHttpRequest
            var xhr = new XMLHttpRequest();

            // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
            xhr.open('GET', 'https://httpbin.org/ip', false);

            // 3. Отсылаем запрос
            xhr.send();

            // 4. Если код ответа сервера не 200, то это ошибка
            if (xhr.status != 200) {
            // обработать ошибку
            return xhr.status + ': ' + xhr.statusText // пример вывода: 404: Not Found
            } else {
            // вывести результат
            return xhr.responseText  // responseText -- текст ответа.
            }
        `)

        console.log('Got text by js:', text)
    })

    it('can accept arguments ', async function () {
        await browser.get('/movie/19404')
        await browser.sleep(2000)

        let text = await browser.executeScript(`
            console.log(arguments[0]);
            console.log(arguments[1]);
            console.log('BODY:', arguments[2])
            return arguments[0] + ' ' + arguments[1] 
        `, 'hello', 'world', $('body'))

        console.log('Got text by js:', text)
        await browser.sleep(10000)
    })
})
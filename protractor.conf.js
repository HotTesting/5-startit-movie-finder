require('ts-node').register();

module.exports.config = {
    specs: ['spec.ts'],
    directConnect: true,
    baseUrl: 'https://movies-finder.firebaseapp.com/'
}
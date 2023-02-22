const request = require('request')
const cheerio = require('cheerio')

request('https://wobb.ai/app/discover', function(error,response,html){
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html)
        const siteHeading = $('.card-title')
        console.log(siteHeading.html())
        console.log(siteHeading.text())
    }
    
}
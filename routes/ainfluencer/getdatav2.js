const axios  = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const chalk = require('chalk');

const headers = {
    'Content-Type': 'application/json',
    'authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyYW5kb21fc3RyIjoiMTBibUQ0eW83TzhqSFlNMU1ybHE3VlJCN1NnMkhrbjMyTk44RW9mbUx5bFdOSmJ3T2d6SjVzZW5ZZW9MRldFcjNZcFVacVFNN1R6QTR2aENhNkJjcFhEMkJhTDdmejNONWx3UkdUWGlIYkxjRG9pSjdJQ2U3ZUJXIn0.zsmmpXrDqqqgaSoXYzLX3AYC5hnQDdU1SEdYenP7DVI',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
};

const fetchDatav2 = async () => {
    try {
        const totalnumber = 100; // Limit the number of requests sent to the API
        for (let i = 1; i <= totalnumber; i++) {
            const url = `https://influencers.ainfluencer.com/api/v2/elastic/extended/search`;
            const payload = {
                "countries": [],
                "from": 0,
                "budget": { "min": "1", "max": "10000" },
                "limit": 100,
                "gender": null,
                "followers": { "min": 5000, "max": 5000000 },
                "only_with_email": true
            };
           // const response = await axios.post(url, JSON.stringify(payload), { headers });
           const response = await axios.post(url, JSON.stringify(payload), { headers });
           

            console.log(`${chalk.green(`🟢 🔴 UserId: ${i}`)}`, JSON.stringify(response.data));
            ///const path_tosave = `../data_scraper/scraped_data/ainfluencer/listprofiles/withemail_${i}.json`;
            const path_tosave = `../data_scraper/scraped_data/ainfluencer/listprofiles/withemail_${i.toString().padStart(4, '0')}.json`;

            fs.writeFile(path_tosave, JSON.stringify(response.data), (err) => {
                if (err)
                    throw err;
                console.log(`${chalk.green(`🟢 🔴 UserId: ${i}.json File has been created`)}`);
            });
            console.log('🟢 🔴 File has been saved!')
        }
    } catch (error) {
        console.log(error);
    }
};
fetchDatav2();


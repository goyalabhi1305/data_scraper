const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();
const port = process.env.PORT || 4000;
// const fs = require('fs');
// const writeStream = fs.createWriteStream('devBlog.csv');

// const scrapeData = require('./routes/scrape');
const Wobbv2_Getuserdata = require('./routes/wobbV2/getUserData')
// const Wobbv2_Storedata = require('./routes/wobbV2/Storedata')
app.post('/',Wobbv2_Getuserdata )
// app.post('/store',Wobbv2_Storedata )


//Listen to server
app.listen(port, () => {
    console.log(`Server Established and  running on Port ⚡${port}`)
})

// create a bsic express app

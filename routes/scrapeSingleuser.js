const axios = require('axios');
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname,`../scraped_data/alluserIds.json`),async (err, data) => {
    if (err) throw err;
    console.log(`🟢File has been Read!`);
    // console.log('⚫',data);
    const jsonData = JSON.parse(data);
    console.log(jsonData)
    

    // function to scrape
    // create a loop that prints hello with 10 seconds delay
for (let i = 11; i < jsonData?.length; i++) {

    const userId =jsonData[i]
    // all details user
const all_registered_influencers_url = `https://api.winkl.in/brand_user/campaign_profile_v2?id=${userId}`

    const result = await axios.get(all_registered_influencers_url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            // 'Referer': 'http://books.toscrape.com/',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'DNT': '1',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Referer': 'https://campaignmanager.winkl.co/',
            'Origin': 'https://campaignmanager.winkl.co',

            // important token below
            'authorization': 'Token ruor7REQi9KJz6wIQKDXvwtt kTSzYRkYHbGTCr3DWtadNQtt'
        }
    })

    // console.log(result?.data)
    console.log(`🟢Loop Running= User-Id-Scraping:${userId}`)
    // console.log(all_registered_influencers_url);

    // creating new series files of data
    const path_tosave = path.join(__dirname,`../scraped_data/single_user/campaign_profile_v2/single_${userId}.json`)
    fs.writeFile(path_tosave, JSON.stringify(result?.data), (err) => {
        if (err) throw err;
        console.log(`🔴 UserId: ${userId}.json File has been created`);
    })

    // appending users list data into previous list
    // const AlluserId = result?.data?.campaign_profiles?.map(user => user.user_id)
    // fs.appendFile("./scraped_data/all_creators.json", AlluserId , function (err) {
    //     if (err) throw err;
    //     console.log(`User Ids appended to file : ${AlluserId?.length}`);
    //  });
     

    // javascript wait for 10seconds
    await new Promise(resolve => setTimeout(resolve, 10000));
}



});






const scrapeData = async (req, res) => {
    return false;
    try {
        const limit = 1000
        const looplimit = 41


        // create a loop that prints hello with 10 seconds delay
        for (let i = 0; i < 1?.length; i++) {

            const userId =allIds[i]
            // all details user
const all_registered_influencers_url = `https://api.winkl.in/brand_user/campaign_profile_v2?id=${userId}`

            const result = await axios.get(all_registered_influencers_url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                    // 'Referer': 'http://books.toscrape.com/',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Dest': 'empty',
                    'DNT': '1',
                    'Pragma': 'no-cache',
                    'Cache-Control': 'no-cache',
                    // important token below
                    'authorization': 'Token ruor7REQi9KJz6wIQKDXvwtt HKFvc2tnnoa6KDkiQcOfVQtt'
                }
            })

            console.log(result?.data)
            console.log(`🟢Loop Running= User-Id-Scraping:${userId}`)
            // console.log(all_registered_influencers_url);

            // creating new series files of data
            fs.writeFile(`./scraped_data/single_user/campaign_profile_v2/single_${userId}.json`, JSON.stringify(result?.data), (err) => {
                if (err) throw err;
                console.log(`🔴 UserId: ${userId}.json File has been created`);
            })

            // appending users list data into previous list
            // const AlluserId = result?.data?.campaign_profiles?.map(user => user.user_id)
            // fs.appendFile("./scraped_data/all_creators.json", AlluserId , function (err) {
            //     if (err) throw err;
            //     console.log(`User Ids appended to file : ${AlluserId?.length}`);
            //  });
             

            // javascript wait for 10seconds
            await new Promise(resolve => setTimeout(resolve, 10000));
        }




        res.status(200).json({ msg: 'good' })

    }
    catch (err) {
        console.log(`⚠️ ${err}`);
        res.status(400).json({ msg: 'err' })
    }
}


module.exports = scrapeData;
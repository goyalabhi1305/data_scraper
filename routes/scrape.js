const axios = require('axios');
const fs = require('fs');
const scrapeData = async (req, res) => {
    try {
        const limit = 1000
        const looplimit = 1


// appending users list data into previous list
// fs.readFile('./scraped_data/all_creators.json', function (err, data) {
//     // var json = JSON.parse(data)
//     // json.push('search result: ' + currentSearchResult)
//     if (err) throw err;
//     console.log('File has been Read!');

//     fs.writeFile("./scraped_data/all_creators.json", 'dfgdfgdg', (err) => {
//         if (err) throw err;
//         console.log('File has been created');
//     })

// })

        // create a loop that prints hello with 10 seconds delay
        for (let i = 0; i < looplimit; i++) {

            const skip = i * limit
            console.log(`${i}--- ${skip}---${skip+limit}`);

            const all_registered_influencers_url = `https://api.winkl.in/brand_user/campaign_profiles_v2?audience_filter=false&sort=&download_csv=false&limit=${limit}&offset=${skip}&search_phrase=&platform_id=1&initialize=true&followers_lrange=0&followers_urange=9307535441&following_lrange=0&following_urange=1714938&eng_lrange=0&eng_urange=19300&ff_lrange=-1114&ff_urange=935913425&posts_lrange=0&posts_urange=9100912&followers=&following=&ff=&posts=&views_lrange=0&views_urange=923447454901&subscribers_lrange=0&subscribers_urange=9101481436&videos_lrange=0&videos_urange=9447579&age_urange=99&age_lrange=1&l_avg_video_views=0&u_avg_video_views=99999999&l_avg_likes=0&u_avg_likes=6391666&audience_age_lrange=1&audience_age_urange=100&audience_gender%5B%5D=male&audience_gender%5B%5D=female&campaign_preference%5B%5D=no_barter&campaign_preference%5B%5D=barter_allowed`

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

            // console.log(result?.data)
            console.log(`Loop Running= Skipped:${skip}, till:${skip + 1000} , loopNumber:${i}, totalResults: ${result?.data?.campaign_profiles?.length}`)
            // console.log(all_registered_influencers_url);

            // creating new series files of data
            fs.writeFile(`./scraped_data/all_data/${skip}_data_${skip + limit}.json`, JSON.stringify(result?.data), (err) => {
                if (err) throw err;
                console.log('File has been created');
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
        console.log(err);
        res.status(400).json({ msg: 'err' })
    }
}


module.exports = scrapeData;
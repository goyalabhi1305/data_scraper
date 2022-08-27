const path = require("path");
const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");

const fetch = async (pagenumber) => {
  try {
    console.log(
      `${chalk.yellowBright(
        `⚫ Processing: Page ${pagenumber} is processing...`
      )}`
    );

    const result = await axios.post(
      `https://ainfluencer.com/api/v2/elastic/search`,
      {
        country_id: [],
        from: pagenumber,
        sorts: [
          {
            key: "followers",
            direction: "desc",
          },
        ],
        number_of_data: 202,
        language: [],
        min_follower: 1000,
        max_follower: 1000000,
      },
      {
        // withCredentials: true,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          // 'Accept-Encoding': 'gzip, deflate, br',
          Connection: "keep-alive",
          "Sec-Fetch-Site": "cross-site",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          DNT: "1",
          Pragma: "no-cache",
        //   Cookie:
        //     "XSRF-TOKEN=eyJpdiI6IldvczRHR29IWW5GbktJRWVtdmhTZmc9PSIsInZhbHVlIjoiUG9hY0JxblFwT1laNVJ2NVJGQnM1TzRvOVVvUmdDb3Y1M1FUelJ2K0pjNHkyOXR0VXBpUXQvSHVkVEdteklDbWt0QkRVVHF4OVlTaVRzNUcvTGwxRnRkdEdSMHlRUGU0L3pTVFBJUGxsUlh2NHJCaHlPMEptMlo3Qm4zbWdsQkgiLCJtYWMiOiI4YzE2ZTc3OTFkYjExMDA5MGNhOWM4NjAxZjMwNGJmOGIxZmIxYTcyNTcwOWYyMDVlOWY4ZmI2N2RlY2UyMDM2IiwidGFnIjoiIn0%3D; afluencer_session=eyJpdiI6IllnZGtKODZLQ1pLTHVpazZrNkpOMEE9PSIsInZhbHVlIjoiNUtyejU0Q21FMFAwazJVUHBCV01UU2k3Nkg2OVRxRVZ5VVRsd0JoTVk2d3JadW5uSVlEMFR5MXFjRjFVdjF0NzBsUzI0RzJQQ3V3R1RQRSsrY1REVHZQNXJ3UDBWQmI1ZlltdmRMQmdJdDZBY0doSlBWOUVHM0taWngyMGN4SjIiLCJtYWMiOiI1YzEwMGE3YjFhNDBiMGM5MWJmZjQwMTU2YWE0NGY1MDIwYmIxNWQ1NWY5M2I0M2M1YjQ2ZWRmYTAyODc0NDhlIiwidGFnIjoiIn0%3D; laravel_token=eyJpdiI6IkhKRy9qNFZXQ0NJYlFycjFDdmsxWnc9PSIsInZhbHVlIjoiRGJRK0lsSGVJakJka2o2ZGpLZWF5UkxnUDJwc0RvL0Vnbm1PanlUTTJFaXZlMSt1UmV4aFg4Y05UYlhXNmdrTWRUQlIwRjdWaVJoN3FIVUpGc1BSQXJId3JtMWNnQjByMmtrNUZXZGg2R2FGa05Ed3Y4ZERsWVNxblg4V1h4aXUvREpZVStrYnFTbFNETDcxL1NWdFFObnY0eVR1QXJCZVNkQkNDUHBPTCtIdVNNL1UzWDMyRitjNlhwU1lJT3RIbVFLNUZoSzIxNTNKTjVOVU8wSnFFamtOMXErZllVdlIzOGZ6K2NMVnZueFlNK2c4THhrR01nODFpUkJWbi9td3lqOVVWcnVFbGZhWjQ2SnFOa1pNanpXMVhkaUJSNEJzUFhOSENCYWd2R1Bydk0yMmNIdldMdXFadmtUK2JVRFEiLCJtYWMiOiI3NTQ0YTI5ZjVjYjZhY2M2ODI2YjRkNjc1ZmM5YWY0NjA2OGFmN2U0NzliZDMyZDEwNjQyZDk4YWZmOTE1YWM4IiwidGFnIjoiIn0%3D;",
          "Cache-Control": "no-cache",
          Referer: "https://app.afluencer.com/",
          Origin: "https://app.afluencer.com/",
          "authorization":'Bearer rafHHZ9ind8F0MjHw9rVvcuFrSlj6fAswZKQinKSnHAxw35pcr1YD8mhxkTrfgDvD3KedL4ZqQQsk4fOggzQCrIc1T9ODQ96Md5z5sYXlYTOVl5xS9KVsFTV'
        //   "x-xsrf-token":
        //     "eyJpdiI6IkFGamphYnlubGtEMGtyOWZwTkEzWFE9PSIsInZhbHVlIjoiZlYydS9iVVQxeVM2QWhKcUhZbThqeXlpVWFLSS9FN2NJQXVXUlQxdWEzVU1NQmxLcHVWa2dzZmhaRDNWVVBRU1A2MWxyL3dXWXlUbWRtdXc1cGRUVXhiS2pNQ3JxS2VYM0o5c0tuWWtmQkhQcXFra3p4Mk9EYjRtdW93VEhjZGgiLCJtYWMiOiJiYjFkMmVjZGRjN2NmMGQ1MmMyY2Y0YWI4YTRhZTQwYzRmMmMyMzBiYTI3NDAzYTExMTYxMTU0YjEwOTMxNjNkIiwidGFnIjoiIn0=",
          //   "x-requested-with": "XMLHttpRequest",
        },
      }
    );
    // const result = {
    //     data:'sfdsdf'
    // }

    const path_tosave = `../data_scraper/scraped_data/ainfluencer/listprofiles/data_${pagenumber}.json`;
    fs.writeFile(path_tosave, JSON.stringify(result?.data), (err) => {
      if (err) throw err;
      console.log(
        `${chalk.green(`🟢 Successfully Page ${pagenumber} of is saved!`)}`
      );
    });
    // console.log(result?.data,'-------')
    // console.log(result?.status,'*********')
  } catch (e) {
    console.log(
      `${chalk.redBright(`❌ Error: Page ${pagenumber} of is not saved!`)}`
    );
    console.log(e);
  }
};

// for loop to get all pages of each platform // total pages: 9733
(async () => {
  for (let i = 200; i <= 201; i++) {
    await fetch(i);
    // console.log(`Page ${i} is being fetched...`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
})();
// fetch(8,'instagram');

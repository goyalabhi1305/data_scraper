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
      `https://marketer.modash.io/api/discovery/search/instagram`,
      {
        filters: {
          influencer: {
            accountTypes: [],
            engagementRate: null,
            location: [304716],
            gender: null,
            language: null,
            followers: { min: "2000k", max: "3000k+" },
            hasYoutube: false,
            // hasContactDetails: [{ contactType: "email", filterAction: "must" }],
            hasContactDetails: [],
            relevance: { usernames: [], hashtags: [] },
            textTags: [],
            interests: [],
            lastposted: null,
            bio: "",
            keywords: "",
            growthRate: null,
          },
          audience: {
            location: [],
            language: null,
            gender: null,
            age: [],
            interests: [],
            brands: [],
            credibility: null,
          },
        },
        page: pagenumber,
        sort: {},
      },
      {
        withCredentials: true,
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
          Cookie: "modash.xsid2=s%3AyanIWSFu8LeMrb52DW4S919QOW4n-TeQ.4LuUK7cm1%2B4LxJge26GWL%2BFdJQotuyfE05ZEHnZC57k; Domain=marketer.modash.io; Path=/; Expires=Sun, 24 Jul 2022 09:15:40 GMT; HttpOnly; Secure; SameSite=None",
          "Cache-Control": "no-cache",
          Referer: "https://phlanx.com/influencer-directory",
          Origin: "https://phlanx.com/",
          "x-trace-id": "1-62d3d33c-0fab29e661aebbf40c73c362"
        },
      },
      
    );
    // const result = {
    //     data:'sfdsdf'
    // }

    const path_tosave = `../data_scraper/scraped_data/modash/listprofiles/data_${pagenumber}.json`;
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

// for (let i = 3; i <= 3; i++) {
//     fetch(i,'instagram');
// }
//     setTimeout(() => {
// }, 20000);

// for loop to get all pages of each platform // total pages: 9733
(async () => {
  for (let i = 0; i <= 66; i++) {
    await fetch(i);
    // console.log(`Page ${i} is being fetched...`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
})();
// fetch(8,'instagram');

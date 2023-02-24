// https://api.wobb.ai/api/dashboardv2/getuserprofile?userId=62482c4ff2719b53d6d8da76

const path = require('path');
const fs = require('fs');
const axios = require('axios');
const campaignsArr = [
    // '6204a176c67df407d2c91e92',
// '6200f5b7c27d9b553bfef1a3',
// '6200ee74c958e94ced036cd9',
// '61ea8cfd876358039ee9262f',
// '61d842080520175deca390f6',
// '61d7fde5f05dfe40dd1375f7',
// '61d7fd96f05dfe40dd1375e9',
// '61d7fd09f05dfe40dd1375e0',
    // '61d7fc9bf05dfe40dd1375d6',
    // '61d7c25087d9b30a7b21b6ed',
    // '61d5854477c869084c73e2d0',
    // '61d5851b77c869084c73e2c7',
    // '61d584f277c869084c73e2be',
    // '61c977756b35ee3c2ea009e0',
    // '61b33ac664b601f62d4aa54b',
    '61a0b7590951ba40a3abe670', //unablt to retrive
    '61a0b6450951ba40a3abe654', //unablt to retrive
    // "619f7befe8c8b8191eaae151",
    // "619ced2f82ffab8acf4f4925",
    // "619cdf1376c43282d47d0305",
    // "619b86cadc43ca69fadd225d",
    // "61915fb45ae61e26820194fe",
    "617fbb64c8680046c883964b", //unablt to retrive
    // "617c1c30cf4f2385cc065e3b",
    // "61767193687949146d0f7247",
    "61739564057990354b50f904", //unablt to retrive
    // "615dad42ed23a308176432da",
    // "61279a202d79956ae99f047f",
    // "610bdcac95991b26a01a9764",
    // "60ed80211f94ab15030d1cdc",
    // "60dc63eeae456f2dd4c51687"
]

// console.log(campaignsArr.length)

const fetch = async(campaignid) =>{
    // return false;
try{
    const result = await axios.get(`https://api.wobb.ai/api/dashboardv2/getcampaign?campaignId=${campaignid}`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            // 'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            // 'DNT': '1',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Referer': 'https://dashboard.wobb.ai/',
            'Origin': 'https://dashboard.wobb.ai',
            'Cookie':'connect.sid=s%3AV_lIrdk5uzSdWUDGBJ66v95CUBtq1Tl9.tenAxCVVfWOztIbb6KQ%2B8G7%2FokkqmETJY%2FPmzJ6Oo0c'
        },
    })
    // const result = {
    //     data:'sfdsdf'
    // }

    const path_tosave = `../data_scraper/scraped_data/wobb/campaigns/single_${campaignid}.json`
    fs.writeFile(path_tosave, JSON.stringify(result?.data), (err) => {
        if (err) throw err;
        console.log(`🔴 Campaign: ${campaignid}.json File has been created`);
    })
    console.log(result?.data,'-------')
    console.log(result?.status,'*********')
}

catch(e){
    console.log(e);
}
}

// ---------------------------------------------

const fetchAllData = async (res)=>{

    for (let i = 5; i < campaignsArr.length; i++) {
        const campaignid =campaignsArr[i]
            fetch(campaignid)
            // console.log('printing')
            // wait for 10 seconds without await
    
            
    
await new Promise(resolve => setTimeout(resolve, 10000));
    
    }
    res.status(200).json({ msg: 'good' })
}


fetchAllData()
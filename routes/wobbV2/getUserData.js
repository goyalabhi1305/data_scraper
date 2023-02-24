const fs = require('fs');
const axios = require('axios');

const headers = {
  'Cookie': 'connect.sid=s%3AV_lIrdk5uzSdWUDGBJ66v95CUBtq1Tl9.tenAxCVVfWOztIbb6KQ%2B8G7%2FokkqmETJY%2FPmzJ6Oo0c',
  'Content-Type': 'text/plain',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://wobb.ai',
  'Referer': 'https://wobb.ai/',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
};

const fetchData = async (req,res) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://prod.wobb.ai/api/discovery/?filter=undefined&pageNo=0&pageSize=30500',
      headers: headers
    });
    const data = response.data;

    fs.writeFile('finalresult.json', JSON.stringify(data), err => {
      if (err) throw err;
      console.log('Result saved in result.json');
    });
    res.status(200).json({ msg: 'good' });

    
  } catch (error) {
    console.error(error);
  }
};

module.exports= fetchData;

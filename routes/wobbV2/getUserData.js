const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');

const headers = {
  'Cookie': 'connect.sid=s%3APd5gsplx8ZhXKg4RvA6zm4jMvEce-wER.GOIt6hRrxKsDYKuHoAXI56BrgRUbUPHHw0Dspet0MyY	',
  'Content-Type': 'text/plain',
// 'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjViOGVlYjE5ZWJlMDAxM2Q4ZmRmMCIsIm5hbWUiOiJsYWtoYW4gc2hhcm1hIiwiaW1nVXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YnN2TUxETXR2Sldiby0ya1BDWWtpUzRUWVJ4R1dMZkdMd2FMM249czk2LWMiLCJpYXQiOjE2ODEyNzgxMDMsImV4cCI6MTcxMjgxNDEwM30.GUHkb0DzkHJ9nawRHInvEBVTUUpKPFR_YB-SsXfeLYw',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://wobb.ai',
  'Referer': 'https://wobb.ai/',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'

};

const fetchData = async (req, res) => {
  try {
    let total = 620;
    

    for (let i = 1; i <= total; i++) {
      const url = `https://prod.wobb.ai/api/discovery/?filter=undefined&pageNo=${i}&pageSize=50`;
      const response = await axios.post(url, { headers });
      
      const path_tosave = `../data_scraper/scraped_data/wobb/users/all_${i}.json`;

      // fs.writeFile(path_tosave, JSON.stringify(response.data)).then(() => {
      //   console.log(`🔴 UserId: ${i}.json File has been created`);
      // }).catch((err) => {
      //   console.log(err);
      // });
      fs.writeFile(path_tosave, JSON.stringify(response?.data?.doc), (err) => {
        if (err) throw err;
        console.log(
          `${chalk.green(
            `🟢 🔴 UserId: ${i}.json File has been created`
          )}`
        );
      });


      console.log(`Page ${i} has been fetched and saved successfully.`);
     

      //pasue it for 10 second
 
      
    }
    

    console.log(`All pages (${total}) have been fetched and saved successfully.`);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error' });
  }
};

fetchData()

module.exports = fetchData;

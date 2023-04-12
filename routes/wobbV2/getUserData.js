const fs = require('fs');
const axios = require('axios');

const headers = {
  // headers omitted for brevity
};

const fetchData = async (req, res) => {
  try {
    let total = 10;

    for (let i = 1; i <= total; i++) {
      const url = `https://prod.wobb.ai/api/discovery/?filter=undefined&pageNo=${i}&pageSize=50`;
      const response = await axios.post(url, { headers });
      const data = JSON.stringify(response.data);
      const path_tosave = `../data_scraper/scraped_data/wobb/campaigns/all_${i}.json`;

      await fs.promises.writeFile(path_tosave, data);
      console.log(`Page ${i} has been fetched and saved successfully.`);

      await new Promise(resolve => setTimeout(resolve, 10000));
    }

    console.log(`All pages (${total}) have been fetched and saved successfully.`);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error' });
  }
};

module.exports = fetchData;

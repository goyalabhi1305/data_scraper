const path = require('path');
const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');

const fetch = async (pagenumber) => {
	try {
		console.log(
			`${chalk.yellowBright(
				`⚫ Processing: Page ${pagenumber} is processing...`
			)}`
		);

		const result = await axios.get(
			`https://phlanx.com/api/phx_influencer_directory/v2/retrieve/influencer-directory-result?keyword=&page=${pagenumber}&influencer_type=[]&category=[]&location=[]&country=[]&brand_mentions=[]&hashtags=[]&total_reach=%7B%22min%22:%22%22,%22max%22:%22%22%7D&engagement_rate=%7B%22min%22:%22%22,%22max%22:%22%22%7D&verified=%7B%22instagram%22:false,%22phlanx%22:false%7D&records_per_page=%7B%22value%22:30,%22label%22:30%7D&sortby=%7B%22value%22:%22total-reach_high-low%22,%22label%22:%22Highest+reach%22%7D&is_filter=%7B%22favorites%22:false%7D&initial=true`,
			{
				headers: {
					'User-Agent':
						'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
					Accept: '*/*',
					'Accept-Language': 'en-US,en;q=0.9',
					// 'Accept-Encoding': 'gzip, deflate, br',
					Connection: 'keep-alive',
					'Sec-Fetch-Site': 'cross-site',
					'Sec-Fetch-Mode': 'cors',
					'Sec-Fetch-Dest': 'empty',
					DNT: '1',
					Pragma: 'no-cache',
					'Cache-Control': 'no-cache',
					Referer: 'https://phlanx.com/influencer-directory',
					Origin: 'https://phlanx.com/',
                },
			}
		);
		// const result = {
		//     data:'sfdsdf'
		// }

		const path_tosave = `../data_scraper/scraped_data/phlanx/listprofiles/data_${pagenumber}.json`;
		fs.writeFile(path_tosave, JSON.stringify(result?.data), (err) => {
			if (err) throw err;
			console.log(
				`${chalk.green(
					`🟢 Successfully Page ${pagenumber} of is saved!`
				)}`
			);
		});
		// console.log(result?.data,'-------')
		// console.log(result?.status,'*********')
	} catch (e) {
		console.log(
			`${chalk.redBright(
				`❌ Error: Page ${pagenumber} of is not saved!`
			)}`
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
	for (let i = 9496; i <= 9499; i++) {
		await fetch(i);
		// console.log(`Page ${i} is being fetched...`);
		await new Promise((resolve) => setTimeout(resolve, 5000));
	}
})();
// fetch(8,'instagram');

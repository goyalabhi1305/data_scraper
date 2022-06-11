const path = require('path');
const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');

const fetch = async (pagenumber, platform,categoryid) => {
	// return false;
	try {
		console.log(
			`${chalk.yellowBright(
				`⚫ Processing: Page ${pagenumber} of ${platform} is processing...`
			)}`
		);

		const result = await axios.get(
			`https://data.qoruz.com/api/v2/search?search_id=1653553912&platform=${platform}&categories[]=${categoryid}&location=83&page=${pagenumber}&sort_by=followers:desc`,
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
					Referer: 'https://app.qoruz.com/',
					Origin: 'https://app.qoruz.com',
					Authorization:
						'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk5MGJiZjg4YWYyZTQwYjRlYjAwN2ZkYzkyZTYyYjg2Nzc2NTQ0YjA3N2M0MTVmNDZmMzUzNThkNGZlZTM3ODEzNjNkNGQwNWE0ZTNjOTI0In0.eyJhdWQiOiIxMSIsImp0aSI6Ijk5MGJiZjg4YWYyZTQwYjRlYjAwN2ZkYzkyZTYyYjg2Nzc2NTQ0YjA3N2M0MTVmNDZmMzUzNThkNGZlZTM3ODEzNjNkNGQwNWE0ZTNjOTI0IiwiaWF0IjoxNjU0OTM5ODI1LCJuYmYiOjE2NTQ5Mzk4MjUsImV4cCI6MTY4NjQ3NTgyNSwic3ViIjoiMTExMjUiLCJzY29wZXMiOltdfQ.GNCn_xDWBC1uQrvQRYce9alqmoz2DSz9RFtbgK47KE3yuuSJjT34Ydxrum-d-qABUmZ9SYSRqG-pU_Qa7ixRGh61dAcCcIKzVbmCRP36B401x5pconHZihSO9_yVH_CiwsdYsLk7iH6MsCtyAgQQDerDCT9pzf26Ndq7bW9M6gcuBtNlmKKlJ_byTFyZ1DRHFfHH5gv-s8GFcoYFCPvOEje2gPqENoAG9wsWEFQYIK05NKdejGo52zJD4qPrpzGbaUIC5XsOVy_IGmjXlt11tdVjc1g6Y9B9PMqCHS9LrG_isDmbmuyAKY0LJx0xzp34O23um-0Q8tsgCM2ggDh7iBQtNynFm2F-Txas-gMue7xP72_8ndc7p1xysuhelbELzLOYEk9pEA0lqyRqYT6m78eo9InInQVNymrxY07jXMFz6OjGfv_hsTKqWdCnXga9oolLyGSIMJ_88ZGukQADOpZzf326O4hgyyBGxG_XIKybZg0inEmruG_RyQER8_2XCumSgQpLckfWgviNLOhbat6dQmSW0QyJLKJOBIRAVFbl6ocvNveZDjxEL4WmjacoQ7Ga2JgLWeWD_ESdvASOf_iOl7zYgfGBwC5_5dw6l62TREXiTxwH0uwNB_SufAR0bxfytNxcrVB5sos3LkKieEknB6TpjeKTqpZxoLGzc-A',
				},
			}
		);
		// const result = {
		//     data:'sfdsdf'
		// }

		const path_tosave = `../data_scraper/scraped_data/qoruz/listprofiles/cat_${categoryid}/cat_${categoryid}_${platform}_${pagenumber}.json`;
		fs.writeFile(path_tosave, JSON.stringify(result?.data), (err) => {
			if (err) throw err;
			console.log(
				`${chalk.green(
					`🟢 Successfully Page ${pagenumber} of ${platform} is saved!`
				)}`
			);
		});
		// console.log(result?.data,'-------')
		// console.log(result?.status,'*********')
	} catch (e) {
		console.log(
			`${chalk.redBright(
				`❌ Error: Page ${pagenumber} of ${platform} is not saved!`
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

// for loop to get all pages of each platform
(async () => {
	for (let i = 1; i <= 46; i++) {
		const categoryid = 3;
		await fetch(i, 'instagram',categoryid);
		await new Promise((resolve) => setTimeout(resolve, 2500));
	}
})();
// fetch(8,'instagram');

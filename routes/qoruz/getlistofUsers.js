const path = require('path');
const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');

const fetch = async (pagenumber, platform) => {
	// return false;
	try {
		console.log(
			`${chalk.yellowBright(
				`⚫ Processing: Page ${pagenumber} of ${platform} is processing...`
			)}`
		);

		const result = await axios.get(
			`https://data.qoruz.com/api/v2/search?search_id=1653553912&platform=${platform}&categories[]=1&location=83&page=${pagenumber}&sort_by=followers:desc`,
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
						'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY5ZmE4ZGExYWI3YmQxMDI2Y2EyODY1ZDczOTcwMTVhMzMzYWQ3YmNjYTYwYTNhZTI0YjhmM2E4ZDc5Njc1Mjg3ZWYwODkzMzAzMjZmNGEzIn0.eyJhdWQiOiIxMSIsImp0aSI6IjY5ZmE4ZGExYWI3YmQxMDI2Y2EyODY1ZDczOTcwMTVhMzMzYWQ3YmNjYTYwYTNhZTI0YjhmM2E4ZDc5Njc1Mjg3ZWYwODkzMzAzMjZmNGEzIiwiaWF0IjoxNjU0OTQwNTg3LCJuYmYiOjE2NTQ5NDA1ODcsImV4cCI6MTY4NjQ3NjU4Nywic3ViIjoiMTExMjkiLCJzY29wZXMiOltdfQ.hmAWuZE12Fvy9e6rJIsRHkeK9BrA6JBJ6KFG9iAaElBz5YjX3toM45EjAYM4K3Gv4OEvZo_cehzsNNvPtR34neaa0StAnnocLPgafja1-aSxPpCCMR2_p80Kx8aZi8Ca0_MKgmsUB6HCbeeBYWeG6KTbvTNOCWM5DUqoDNcBE9FXhjctx_WrKpSe1wuRwyzoaj5WpWS2EIl7Y04kbqh_sLg0htg102B_LveaO8KUlAZdBngwqWm1LpptjsrRS8jxQmYHFCN64DuzjKVZiCM74rlLkxohwx9aKX1iBxBjIxo0Mbv5TFtyK-t9JSU1TrvJ7DJuTZEIbczc8TYHiPM55zu3nLQ_KQ4J0Zs1sKMFcvzefjW8aOSeZawzdAx-szMcOP0fbfHgwWsRV7TPKxqGC3aYNPpsGIxPnJNsQATnlmOVBdhPRS_01GZsiDp7CyuRdVhdbYpaHzz74_ijUyfRGrE0l8zwOBlWcl5HuiHEPU2nPumepmWoVxKjevKWTtO1FZUB922dADBkJoCUzrPbQtcc-wQ1lWlm-JOIye6QVANeGS__rZdiVJ-jmq8jG_S6uZUwQGU-_QJHIw6ZKqFV9hu7UrfkDVNtc2_4cUUFOTUrt-AmIVa8oFRjubNSj7UnSxqcsv5qjtvKpE64QQWNRiOVFPYn4FzrpsgS7JQ3jUU',
				},
			}
		);
		// const result = {
		//     data:'sfdsdf'
		// }

		const path_tosave = `../data_scraper/scraped_data/qoruz/listprofiles/cat_1/cat_1_${platform}_${pagenumber}.json`;
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
	for (let i = 309; i <= 477; i++) {
		await fetch(i, 'instagram');
		// console.log(`Page ${i} is being fetched...`);
		await new Promise((resolve) => setTimeout(resolve, 20000));
	}
})();
// fetch(8,'instagram');

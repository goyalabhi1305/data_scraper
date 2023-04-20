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
						'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU2N2QxYmIxNjgxZDBkNjc3YWE2MDYzYzE0ODdlMzExMTZiNDJjM2QxYmJiOTY5ZmRmN2ZhMzdjMTE5OWI1NDAwOWRmNGE4ZmFiNWYxOWE0In0.eyJhdWQiOiIxMyIsImp0aSI6ImU2N2QxYmIxNjgxZDBkNjc3YWE2MDYzYzE0ODdlMzExMTZiNDJjM2QxYmJiOTY5ZmRmN2ZhMzdjMTE5OWI1NDAwOWRmNGE4ZmFiNWYxOWE0IiwiaWF0IjoxNjgxOTcxODM1LCJuYmYiOjE2ODE5NzE4MzUsImV4cCI6MTcxMzU5NDIzNSwic3ViIjoiMjI5MjYiLCJzY29wZXMiOltdfQ.kM1BH2bCVw5Da5HUV0JWZjydWZtevmmng440HTp7ZOTiIz5-Imt6IZRO0iaKPQyOmK21NOmLOo3mrVwp_WYnlALITRmRUR627gn85V2JpZXYKdrlYYWtOYB-m4XFEKwDn_YYrrhJ66yMLd11WkO8o9TaW7a5W484Bt0mvOWjP373ZJfFMpIstn-viFQnDX0JPVJmGTtu76UjG_FZqBvp1BlkbJrGDXsBosQNHtqxyQ6DQtRgpTe0s74JJ16SjTpcR9wIGhJHbNXEabMUf_EFk0nY9sIkUQbNMXcOaSPoDHuGdc3-PKR7UNJWIMkqI6HFl4gowIoVTVv77xg3Gi62f18kSHzOysIY9p_j1ywMf26v_ocs1vRZ1RwWyUBxMyDmCQ_wdqBk-9e6ZxWIgu4IDNC0f60izgSxe2oP0Do5FdBGJEVIO5XejczwoP_7mCOqn-txlxXZpmgE1rIJfthQJbWyFwcd_sGbUZ6XpP6ZTH1hZ5bJCY5NRekUGi971ojAHVip6LxbxALypXUESW6tZkyb0NYfQgLJQl2WHhpio62lvC99Lhw6RSmrbuZY0sRWzusqgqIwx_tkm3QeLgsFTjGKxYByotED43cMsXfwQDBtZmUjtEvKvOHGItQVDufMPg1pq4hTpLAv0k4oaWaMsnAmkoW7vcHdT5acyhoYBzU'
			}
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
fetch(8,'instagram');

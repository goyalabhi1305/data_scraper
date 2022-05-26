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
			`https://data.qoruz.com/api/v2/search?search_id=1653553912&platform=${platform}&location=83&page=${pagenumber}&sort_by=followers:desc`,
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
						'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU4MDg3N2JlNGJhZjdmNWMyOTBmMjhlNGUwNzIzNTE1MWI0ZTEwNmViMGE4MGI4ZTZkMzQ4NjA2NDAxM2RmNmIzOGQ4Y2Y4MDNjOGUxNDY2In0.eyJhdWQiOiIxMSIsImp0aSI6IjU4MDg3N2JlNGJhZjdmNWMyOTBmMjhlNGUwNzIzNTE1MWI0ZTEwNmViMGE4MGI4ZTZkMzQ4NjA2NDAxM2RmNmIzOGQ4Y2Y4MDNjOGUxNDY2IiwiaWF0IjoxNjUzMzkzODM5LCJuYmYiOjE2NTMzOTM4MzksImV4cCI6MTY4NDkyOTgzOSwic3ViIjoiMTAzNTkiLCJzY29wZXMiOltdfQ.G7HmrukWzXYAijWvljAu5ZOrkQB1wf2fH88UeXIVA9isbpJiXE_azvI6M3ulsga9SX4BusZMKLA1ZnTvIsC46keXheqikr0lRnOepg-vR6jYi2cZkmFM3lzU9wfGM4fxy8dxsOWdo2ju3eLGP_jaPu0LJ7iWyBc-LTszz5_IQCGhAn-X0qP4bOxfprblknO3h-KJp1jONwHeXK3ddSnUnA_J1AtgkGqh83QRMInRXLavG5z7cvqi0S4Ehc7kJTEZ9mSvrW069cg1g33xJa3EAchhvU3loJBJFLeeSJ6oZtYIAHxrWRdDTidydFXyiOvtVi-oNvV9BL9w841x389dPMVS4XhG-muPnRCwLKDJMusy1p0D9kcgFmNFYW-Dp2miPugIp4f7A2PnTal6SuwZ0nhHvOhvVg86lpDmYPHE65E9MwfpQLQk_yMos3bMjlTX-PGr1uW6LZiGBzRCQmkA0_fDqWNuu0nEeYaAygwoVkFqAHocH_7y0BJ1JNwv6lp1-T_7t6nWWShfsOHy1LBg09VvVHWxs5XdCfITOqXkEuHY_kPLSL_xEk1KJIPyjrot1vdXtJWGMVagREB6fDmgxITvwFN1EQPFK5gdK_4fWGiIOCkWGvA8atKFqqKE2QnFN9GH3o0jSD7-Fm3sZglQ0mmUtPRFEMgIGi8z8qqvqQc',
				},
			}
		);
		// const result = {
		//     data:'sfdsdf'
		// }

		const path_tosave = `../data_scraper/scraped_data/qoruz/listprofiles/${platform}_${pagenumber}.json`;
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
		// console.log(e);
	}
};

// for (let i = 3; i <= 3; i++) {
//     fetch(i,'instagram');
// }
//     setTimeout(() => {
// }, 20000);

// for loop to get all pages of each platform
(async () => {
	for (let i = 11; i <= 5075; i++) {
		await fetch(i, 'instagram');
		await new Promise((resolve) => setTimeout(resolve, 2500));
	}
})();
// fetch(8,'instagram');

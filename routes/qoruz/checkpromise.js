// const axios = require('axios');
// const fetch = async (pagenumber, platform) => {
// 	console.log(`Fetching page ${pagenumber}`);
// 	return new Promise((resolve, reject) => {
// 		const result = axios
// 			.get(
// 				`https://data.qoruz.com/api/v2/search?search_id=1653553912&platform=${platform}&location=83&page=${pagenumber}&sort_by=followers:desc`,
// 				{
// 					headers: {
// 						'User-Agent':
// 							'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
// 						Accept: '*/*',
// 						'Accept-Language': 'en-US,en;q=0.9',
// 						// 'Accept-Encoding': 'gzip, deflate, br',
// 						Connection: 'keep-alive',
// 						'Sec-Fetch-Site': 'cross-site',
// 						'Sec-Fetch-Mode': 'cors',
// 						'Sec-Fetch-Dest': 'empty',
// 						DNT: '1',
// 						Pragma: 'no-cache',
// 						'Cache-Control': 'no-cache',
// 						Referer: 'https://app.qoruz.com/',
// 						Origin: 'https://app.qoruz.com',
// 						Authorization:
// 							'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg0M2U3OTMwNGU4OGVhM2ZhNjBmYjc4ZGIxYjc0MzkzOWZlMTU0MzViNzYwNzQyNjg1MTM3YWVmNzk5MWNmODFjNjM5M2U2Njg4OWRkNjAwIn0.eyJhdWQiOiIxMSIsImp0aSI6Ijg0M2U3OTMwNGU4OGVhM2ZhNjBmYjc4ZGIxYjc0MzkzOWZlMTU0MzViNzYwNzQyNjg1MTM3YWVmNzk5MWNmODFjNjM5M2U2Njg4OWRkNjAwIiwiaWF0IjoxNjUzNTUzOTA5LCJuYmYiOjE2NTM1NTM5MDksImV4cCI6MTY4NTA4OTkwOSwic3ViIjoiMTA1MDIiLCJzY29wZXMiOltdfQ.M5kZLI2Nq9BbpK-XqgzPcoOtNG7emE3nFGkiANd63hg3G-3aDu8vsQ-Qt3eGiT740F71BRLfHP3ezjdQLjA-dkr5JftpsZ3YX6A3zR3fUQ4lgsZlMJ2ZBV_RkrLlCxRMUFE_MsBqYFznyRLdbMv8V9V-l9JfesgOwazhOzfikRYXNwlDbsbbwzIe_IaknloV6yEulgYqoz_a26QWwskruGgGGc6YqYi-76HXINW7juxOjMV2dRxhCrU5zKleDMs6r3ODeonLzZ3QocnRqTuVHlWQCnZmq9OOLzIs1NNwhh3wbZTHrYfOmmu9HJfqaDEJpv9qOXeNwsCGG4rvcMmXpnEitS4O84x0e4ej6BpBa-zoIS2abd6DsBK6StU0dOQg591hT3gPS8LklKn3u4VeWh-MGPZH0dPAKnfz9UDyE1A5p2QGsZlFYkWrfDDRGOoKFCr3abLEWKGWSZzY36V_-EXuylFDADBc4uY9h7M4KyUeMRdmuBiwA-gGyTLJ4QWzaUI6zK-UBszL7-qb__N61cIa23k8OpOGoEfde9Uu6LIrdv7vnR5VoCSx7xX18m7sf4PTfxCcQxVhHtPC_NkzWQ0z6SwkDR56GAERfsKExc5eKeaxam_zYe7YUWskDyHoHyzPEf8Te82EjI4F2ZD0YDPFJAPJbwjeDBFBp5A2pLI',
// 					},
// 				}
// 			)
// 			.then((res) => {
// 				resolve(res.data);
// 			})
// 			.catch((err) => {
// 				reject(err);
// 			});
// 	});
// };

// for (let i = 0; i < 10; i++) {
// 	fetch(1, 'instagram');
// }

const chalk = require('chalk');

console.log(chalk.yellowBright('Starting...'));
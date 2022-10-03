const path = require('path');
const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');

const fetch = async (pagenumber) => {
	try {
		console.log(
			`${chalk.yellowBright(
				`🟡 Processing: From ${pagenumber} - ${
					pagenumber + 50
				} is processing...`
			)}`
		);

        const content_length = 1861+pagenumber.toString().length;

        // console.log(content_length)

        // return false;
		const result = await axios.post(
			`https://gateway.goodcreator.co/graphql`,
			{
				operationName: 'searchInfluencers',
				variables: {
					after: `${pagenumber}`,
					size: 50,
					query: {
						filters: [
							{ field: 'platform', filterType: 'EQ', value: 'INSTAGRAM' },
							{ field: 'followers', filterType: 'GTE', value: '0' },
							{ field: 'followers', filterType: 'LTE', value: '307535441' },
						],
						orderBy: null,
						orderDirection: null,
					},
				},
				query:
					'query searchInfluencers($before: String, $after: String, $size: Int, $query: SearchQuery) {\n  searchInfluencers(before: $before, after: $after, size: $size, query: $query) {\n    pageInfo {\n      total\n      totalFiltered\n      hasNextPage\n      __typename\n    }\n    edges {\n      node {\n        id\n        onGcc\n        instaVerified\n        isBlackListed\n        name\n        email\n        socialHandles {\n          id\n          platform\n          handle\n          url\n          metrics {\n            followers\n            following\n            avgEngagement\n            avgLikes\n            avgComments\n            numOfPosts\n            avgVideoViews\n            subscribers\n            totalVideos\n            avgReach\n            totalViews\n            __typename\n          }\n          __typename\n        }\n        gender\n        contentCategories {\n          id\n          name\n          __typename\n        }\n        label\n        languages\n        country\n        state\n        city\n        bio\n        dob\n        barterAllowed\n        isPlixxoUser\n        profileImage {\n          url\n          __typename\n        }\n        whatsappNumber\n        whatsappOptin\n        creatorPrograms {\n          id\n          tag\n          level\n          __typename\n        }\n        phone\n        comment\n        commercials {\n          id\n          price\n          format\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}',
			},
			{
				withCredentials: true,
				headers: {
					accept: 'application/json',
					'Accept-Encoding': 'gzip, deflate, br',
					'Accept-Language': 'en-US,en;q=0.9',
					Authorization:
						'Bearer eyJ0eXBlIjoiYXQiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMTlkODFmMS0zMzJjLTQ3ZGMtYWQwMy1jYzYwOTk1ZGUwMWIiLCJ3aW5rbEF1dGgiOiJJVUxhUm1oeWdQNXpNbWxPcSIsImlzcyI6IkJ1bGJ1bC50diIsImlzQWRtaW4iOmZhbHNlLCJkZXZpY2VJZCI6IjE5Yjk3YTk3MTM0ZTFmNmEwNjg3MDQ5Y2FjNWNlN2UyIiwic2lkIjoiYzMwMzAyZjAtMDU1NS00NWU1LWExZWItMWRhNjM1YTAyMzFlIiwidWlkIjo0NTA1Mzg4LCJjaWR4IjoibndudlF4Rng4aUt2NUJ3ekhVS3MiLCJhdHlwZSI6IkJSQU5EIiwic2NvcGUiOiJhcGkiLCJicmFuZElkIjoiNTY4NyIsInVzZXJBY2NvdW50SWQiOjQ0NzIxNzksImFub255bW91cyI6ZmFsc2UsImV4cCI6MTY2NTQ5MTU3OCwiaWF0IjoxNjYyODk5NTc4fQ.keHyIcvAd-V_mHLrKtLl-Sh7hgxKIJXQhPnsOP5OTiU',
					'Cache-Control': 'no-cache',
					Connection: 'keep-alive',
					'Content-Length': `${content_length}`,
					'content-type': 'application/json',
					Host: 'gateway.goodcreator.co',
					Origin: 'https://campaignmanager.goodcreator.co',
					Pragma: 'no-cache',
					Referer: 'https://campaignmanager.goodcreator.co/',
					'Sec-Fetch-Dest': 'empty',
					'Sec-Fetch-Mode': 'cors',
					'Sec-Fetch-Site': 'same-site',
					'Sec-GPC': '1',
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
					'x-apollo-operation-name': 'searchInfluencers',
					'x-bb-channelid': 'ERP',
					'x-bb-clientid': 'nwnvQxFx8iKv5BwzHUKs',
					'x-bb-deviceid': 'a8989109a524ff5ca7ef77d0a9d86dfe',
				},
			}
		);

		const path_tosave = `../data_scraper/scraped_data/gcc/listinsta/data_${pagenumber}_${pagenumber+50}.json`;
		fs.writeFile(path_tosave, JSON.stringify(result?.data), (err) => {
			if (err) throw err;
			console.log(
				`${chalk.green(`🟢 Successfully Page ${pagenumber} to ${pagenumber+50} is saved!`)}`
			);
		});
		// console.log(result?.data,'-------')
		// console.log(result?.status,'*********')
	} catch (e) {
		console.log(
			`${chalk.redBright(`❌ Error: Page ${pagenumber} of is not saved!`)}`
		);
		console.log(e);
	}
};

// for loop to get all pages of each platform // total pages: 9733
(async () => {
	for (let i = 20000; i <= 31020; i++) {
		const skip = i * 50 + 1;
		console.log(chalk.bgYellowBright(`🟡 Page ${i} is being scraped...`));
		await fetch(skip);
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
})();
// fetch(8,'instagram');

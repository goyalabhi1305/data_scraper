// read all data from files
require('../../../db/db');
const Influencer = require('../models/influencers');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const categories_list = require('./staticContent');

const dataProcessor = (data, index) => {
	console.log(chalk.green(`🟢 Processing data for ${data.id}`));
	const categoryMap = (cat_data) => {
		// console.log(cat_data, 'cats');
		let list = [];
		for (let i = 0; i < cat_data.length; i++) {
			const catid = parseInt(cat_data[i].id);
			for (let j = 0; j < categories_list.length; j++) {
				const catlistid = parseInt(categories_list[j].id);
				if (catid === catlistid) {
					list = [
						...list,
						{
							id: categories_list[j].textid,
							name: categories_list[j].category,
						},
					];
				}
			}
		}
		return list;
	};

	// console.log(data)
	// return;
	// console.log( data['dfgid']['dfgdfg'])
	return {
		userid: data?.id,
		profileimg: data?.profileImage?.url,
		ranking: null,
		creator_type: null,
		price: {
			insta_post: {
				max: null,
				min: null,
			},
			insta_story: {
				max: null,
				min: null,
			},
			insta_video: {
				max: null,
				min: null,
			},
			// new fields
			insta_reel: {
				min: null,
				max: null,
			},
		},
		categories: categoryMap(data?.contentCategories),
		barter: null,
		score: null,
		metrics: {
			avg_likes: data?.socialHandles[index]?.metrics?.avgLikes,
			avg_comments: data?.socialHandles[index]?.metrics?.avgComments,
			engagement: data?.socialHandles[index]?.metrics?.avgEngagement,
			avg_reach_post: data?.socialHandles[index]?.metrics?.avgReach, //
			post_reach_percent: null,
			// new fields
			following: data?.socialHandles[index]?.metrics?.following,
			numOfPosts: data?.socialHandles[index]?.metrics?.numOfPosts,
			// new fields end
		},
		profile_display_name: data?.socialHandles[index]?.handle,
		followers: data?.socialHandles[index]?.metrics?.followers,
		display_posts: null,
		platform: data?.socialHandles[index]?.platform,
		platform_meta: {
			insta_access_token: null,
			insta_id: null,
		},
		timestamp: Date.now(),
		lastupdate: Date.now(),
		report: null,

		// new scraped fields
		isRegistered: false,
		isInstagramVerified: data?.instaVerified,
		location: {
			address: null,
			city: data?.city,
			state: data?.state,
			country: data?.country,
		},

		gender: data?.gender,
		language: data?.languages,
		dateOfBirth: data?.dob ? Date(data?.dob) : null,
		bioSection: data?.bio,
		contactInfo: {
			emails: [
				{
					type: 'general',
					number: data?.email,
				},
			],
			phones: [
				{
					type: 'general',
					number: data?.phone,
				},
				{
					type: 'whatsapp',
					number: data?.whatsappNumber,
				},
			],
		},
		fullName: data?.name,
	};
	// await new Promise((resolve) => setTimeout(resolve, 1000));
};

const processingData = async (data) => {
	await data.socialHandles.map(async (value, index) => {
		const newdata = dataProcessor(data, index);

		// console.log(newdata.profile_display_name);

		// check if influencer exists
		const influencerExists = await Influencer.findOne({
			profile_display_name: newdata.profile_display_name,
		});

		if (influencerExists) {
			// console.log(influencerExists._id, newdata.profile_display_name);
			// update influencer
			const updatedInfluencer = await Influencer.findOneAndUpdate(
				{ profile_display_name: newdata.profile_display_name },
				{ $set: newdata },
				{ upsert: true, new: true }
			);
			if (updatedInfluencer) {
				if (updatedInfluencer) {
					console.log(chalk.green('🟢 Data Update into DB'));
				}
			}
		} else {
			// create influencer
			const newInfluencer = await new Influencer(newdata).save();
			if (newInfluencer) {
				console.log(chalk.green('🟢 Data inserted into DB'));
			}
		}

		// const insert = new Influencer(newdata);
		// await insert.save();
		// const update = Influencer.findOneAndUpdate(
		// 	{profile_display_name:newdata.profile_display_name},
		// 	{$set:newdata},
		// 	{ upsert: true, setDefaultsOnInsert: true }
		//  )
	});

	// await new Promise((resolve) => setTimeout(resolve, 1000));
};

const insertIntoDB = async (data) => {
	// console.log(data.id,iiii);
	// console.log(chalk.green('Data inserted into DB'));
	// return false;

	try {
		// insert into db

		// console.log(data.socialHandles.length)
		await processingData(data);
	} catch (err) {
		console.log(`🔴 ${err}`);
	}
};

// reading files
(async () => {
	for (let i = 14369; i <= 31000; i++) {
		try {
			const name_file = `data_${i * 50 + 1}_${i * 50 + 51}`;
			console.log(chalk.yellowBright(`🟡 [${i}]: Processing ${name_file}...`));
			// return;
			const data_single_file = fs.readFileSync(
				path.join(
					__dirname,
					`../../../scraped_data/gcc/listinsta/${name_file}.json`
				),
				'utf8'
			);
			if (data_single_file) {
				const parsed_data = JSON.parse(data_single_file);
				const list_infl = parsed_data['data']['searchInfluencers']['edges'];
				for (let j = 0; j < list_infl.length; j++) {
					// const details_name = list_infl[j]['node']['name'];
					const details = list_infl[j]['node'];
					await insertIntoDB(details);
					// console.log(details_name);
				}
			}
		} catch (err) {
			console.log(chalk.red(`🔴## | Error: ${err.message}`));
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
})();

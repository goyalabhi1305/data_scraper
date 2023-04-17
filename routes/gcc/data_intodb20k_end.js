require('../../db/db');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Influencer = require('../../models/influencers');

// read file

const insertIntoDB = async (data) => {
	// console.log(data)
	// return;
	try {
		// insert into db
		const insert = new Influencer(data);
		await insert.save();

		// console.log(insert);
		// console.log(insert);
		console.log(chalk.green('🟢 Data inserted into DB'));
	} catch (err) {
		console.log(`🔴 ${err}`);
	}
};

(async () => {
	for (let i = 20000; i <= 32000; i++) {
		try {
			const name_file = `data_${i * 50 + 1}_${i * 50 + 51}`;
			console.log(chalk.yellowBright(`🟡 [${i}]: Processing ${name_file}...`));
			// return;
			const data_single_file = fs.readFileSync(
				path.join(
					__dirname,
					`../../scraped_data/gcc/listinsta/${name_file}.json`
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
	}
})();

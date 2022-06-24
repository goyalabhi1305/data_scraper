const fs = require('fs');
const chalk = require('chalk');

const checkfile = (path, pno) => {
	fs.access(path, fs.F_OK, (err) => {
		if (err) {
			console.log(`${chalk.redBright(pno)}`);
			return;
		}
		// console.log('file exists');
	});
};

for (let i = 1; i <= 9733; i++) {
	checkfile(
		`../data_scraper/scraped_data/phlanx/listprofiles/data_${i}.json`,
		i
	);
}
// const path = `../data_scraper/scraped_data/phlanx/listprofiles/data_2.json`;

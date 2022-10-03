// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require('axios');
const cheerio = require('cheerio');
// require('../../../db/db.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// URL of the page we want to scrape

// Async function which scrapes the data
async function scrapeData(page_no) {
	const url = `https://www.zaubacorp.com/company-list/p-${page_no}-company.html`;
	try {
		// Fetch HTML of the page we want to scrape
		const { data } = await axios.get(url);
		// Load HTML we fetched in the previous line
		const $ = cheerio.load(data);

		const single_row_comp = $('table#table tbody tr');
		const single_row_comp_length = $('table#table tbody tr').length;

		const main_company_list = [];
		single_row_comp.each((idx, el) => {
			cin = $(el).children('td:nth-child(1)').text();
			company_legal_name = $(el).children('td:nth-child(2)').text();
			details_link = $(el)
				.children('td:nth-child(2)')
				.children('a')
				.attr('href');
			roc = $(el).children('td:nth-child(3)').text();
			company_status = $(el).children('td:nth-child(4)').text();
			// console.log(details_link)
			const company_detail = {
				cin: cin,
				company_legal_name: company_legal_name,
				details_link: details_link,
				roc: roc,
				status: company_status,
			};
			main_company_list.push(company_detail);
		});

		// append data to a file in json format
		fs.appendFile(
			path.join(
				__dirname,
				`../../../scraped_data/zaubacorp/page_${page_no}.json`
			),
			JSON.stringify(main_company_list, null, 2),
			(err) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log(
					`${chalk.green(`🟢 Successfully Page ${page_no} of is saved!`)}`
				);
			}
		);
	} catch (err) {
		console.error(err);
	}
}
// Invoke the above function

(async () => {
	for (let i = 503; i < 13334; i++) {
		await scrapeData(i);
		// wait for 20 seconds
        // const randomtime = Math.floor(Math.random() * 10000) + 5000;
		// await new Promise((resolve) => setTimeout(resolve, randomtime));
	}
})();

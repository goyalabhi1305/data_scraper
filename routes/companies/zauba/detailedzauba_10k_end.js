const axios = require('axios');
const cheerio = require('cheerio');
require('../../../db/db.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Company = require('../../../models/companies');

const selectors_data = {
	cin: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > thead > tr > td:nth-child(2) > p > a`,
	company_legal_name: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(2) > p`,
	roc_v2: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2) > p`,
	status: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > p > span`,
	registration_no: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2) > p`,
	company_category: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(5) > td:nth-child(2) > p`,
	company_sub_category: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(2) > p`,
	class_of_company: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(7) > td:nth-child(2) > p`,
	date_of_incorporation: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(8) > td:nth-child(2) > p`,
	age_of_company: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(9) > td:nth-child(2) > p`,
	activity_details: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(10) > td:nth-child(2) > p:nth-child(1)`,
	activity_code: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(10) > td:nth-child(2) > p:nth-child(2) > a`,
	number_of_members: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(11) > td:nth-child(2) > p`,
	authorized_capital: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(4) > table > tbody > tr:nth-child(1) > td:nth-child(2) > p`,
	paid_up_capital: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(4) > table > tbody > tr:nth-child(2) > td:nth-child(2) > p`,
	number_of_employees: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(4) > table > tbody > tr:nth-child(3) > td:nth-child(2) > p`,
	listing_status: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(5) > table > thead > tr > td:nth-child(2) > p`,
	date_last_agm: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(5) > table > tbody > tr:nth-child(1) > td:nth-child(2) > p`,
	date_balance_sheet: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(5) > table > tbody > tr:nth-child(2) > td:nth-child(2) > p`,
	email: `div[class='col-12'] div p:nth-child(1)`,
	address: `div[class='col-12'] div div:nth-child(1) p:nth-child(4)`,
	// website:``,
	// directors:``,
	zauba_updated_date: `div[class='hidden-xs'] div b`,
};

async function scrapeData(main_com_data) {
	const link = main_com_data['details_link'];
	// console.log(link)
	try {
		const { data } = await axios.get(link);
		const $ = cheerio.load(data);
		// return false

		const extractEmails = (text) => {
			if (text) {
				return (
					text.match(
						/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
					) || ['-']
				);
			} else {
				return ['-'];
			}
		};

		const extractDate = (text) => {
			if (text) {
				return (
					text.match(/([a-zA-Z]{1,12}[ ]\d{1,2}[, ][ ]\d{1,4})/gi) || ['-']
				);
			} else {
				return ['-'];
			}
		};

		const extractActivityCode = (text) => {
			if (text) {
				return text.match(/([0-9]{1,})/gi) || ['-'];
			} else {
				return ['-'];
			}
		};

		let company_detail = {};

		for (const [key, value] of Object.entries(selectors_data)) {
			const data = {
				[key]: $(value).text(),
			};
			if (key === 'email') {
				const email = extractEmails($(value).text());
				data[key] = email[0];
			}

			if (key === 'zauba_updated_date') {
				const date = extractDate($(value).text());
				data[key] = new Date(date[0]);
			}

			if (key === 'activity_code') {
				const code = extractActivityCode($(value).attr('href'));
				data[key] = code[0];
			}

			company_detail = { ...company_detail, ...data };
		}

		const company = await Company.findOneAndUpdate(
			{ cin: main_com_data['cin'] },
			{
				cin: main_com_data['cin'],
				company_legal_name: main_com_data['company_legal_name'],
				details_link: main_com_data['details_link'],
				roc: main_com_data['roc'],
				roc_v2: company_detail['roc_v2'],
				status: company_detail['status'],
				registration_no: company_detail['registration_no'],
				company_category: company_detail['company_category'],
				company_sub_category: company_detail['company_sub_category'],
				class_of_company: company_detail['class_of_company'],
				date_of_incorporation: company_detail['date_of_incorporation'],
				age_of_company: company_detail['age_of_company'],
				activity: company_detail['activity_details'],
				activity_code: company_detail['activity_code'],
				number_of_members: company_detail['number_of_members'],
				authorized_capital: company_detail['authorized_capital'],
				paid_up_capital: company_detail['paid_up_capital'],
				number_of_employees: company_detail['number_of_employees'],
				listing_compliances: {
					listing_status: company_detail['listing_status'],
					date_last_agm: company_detail['date_last_agm'],
					date_balance_sheet: company_detail['date_balance_sheet'],
				},
				contact_details: {
					email: company_detail['email'],
					phone: '0000000000',
					website: 'null.com',
					address: company_detail['address'],
				},
				z_updated_at: company_detail['zauba_updated_date'],
			},
			{ upsert: true, new: true, setDefaultsOnInsert: true }
		);

		console.log(chalk.green(`🟢## Company Data Saved | CIN: ${company.cin}`));
	} catch (err) {
		console.error(
			chalk.red(`🔴## | CIN: ${main_com_data['cin']}, Error: ${err.message}`)
		);
	}
}
// Invoke the above function

// read file sync

// not found pages
/*
6313
6314

*/

(async () => {
	for (let i = 11591; i < 13333; i++) {
		try {
			const files_list = fs.readFileSync(
				path.join(__dirname, `../../../scraped_data/zaubacorp/page_${i}.json`),
				'utf8'
			);
			const parsed_data = JSON.parse(files_list);
			for (let j = 0; j < parsed_data.length; j++) {
				await scrapeData(parsed_data[j]);
				// await new Promise((resolve) => setTimeout(resolve, 1000));
				console.log(chalk.yellowBright(`🟡## | Page: ${i}, Index: ${j}`));
			}
		} catch (err) {
			console.error(chalk.red(`🔴## | Page: ${i}, Error: ${err.message}`));
		}
	}
})();

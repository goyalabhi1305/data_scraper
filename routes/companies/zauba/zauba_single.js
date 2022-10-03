const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
var xpath = require('xpath');

const selectors_data = {
	cin: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > thead > tr > td:nth-child(2) > p > a`,
	company_legal_name: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(2) > p`,
	roc: `#block-system-main > div.contaier > div.container.information > div:nth-child(11) > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2) > p`,
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

async function scrapeData() {
	const url = `https://www.zaubacorp.com/company/RAZAS-FOOD-PRODUCTS-PRIVATE-LIMITED/U15100KL2020PTC062947`;
	try {
		const { data } = await axios.get(url);
		const $ = cheerio.load(data);

		const extractEmails = (text) => {
			return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
		};

		const extractDate = (text) => {
			return text.match(/([a-zA-Z]{1,12}[ ]\d{1,2}[, ][ ]\d{1,4})/gi);
		};

		const extractActivityCode = (text) => {
			return text.match(/([0-9]{1,})/gi);
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
			// console.log({ ...data });
		}
		console.log(company_detail);

	} catch (err) {
		console.error(err, 'sdfsdf');
	}
}
scrapeData();
// Invoke the above function

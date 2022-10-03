// company model
const mongoose = require('mongoose');
const companySchema = mongoose.Schema({
	cin: {
		type: String,
		required: true,
	},
	company_legal_name: {
		type: String,
		required: true,
	},
	details_link: {
		type: String,
		required: true,
	},
	roc: {
		type: String,
		required: true,
	},
	roc_v2: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	registration_no: {
		type: String,
		required: true,
	},
	company_category: {
		type: String,
		required: true,
	},
	company_sub_category: {
		type: String,
		required: true,
	},
	class_of_company: {
		type: String,
		required: true,
	},
	date_of_incorporation: {
		type: String,
		required: true,
	},
	age_of_company: {
		type: String,
		required: true,
	},
	activity: {
		type: String,
		required: true,
	},
	activity_code: {
		type: String,
		required: true,
	},
	number_of_members: {
		type: String,
		required: true,
	},
	authorized_capital: {
		type: String,
		required: true,
	},
	paid_up_capital: {
		type: String,
		required: true,
	},
	number_of_employees: {
		type: String,
		required: true,
	},
	listing_compliances: {
		listing_status: {
			type: String,
			required: true,
		},
		date_last_agm: {
			type: String,
			required: true,
		},
		date_balance_sheet: {
			type: String,
			required: true,
		},
	},
	contact_details: {
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		website: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
	},

	date_added: {
		type: Date,
		default: Date.now,
	},
	z_updated_at: {
		type: Date,
	},
});
const Company = mongoose.model('companies', companySchema);
module.exports = Company;

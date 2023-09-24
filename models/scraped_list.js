// Influencer model
const mongoose = require('mongoose');
const ScrapedPagesSchema = mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	all_data_single_user: {
		type: String,
		required: true,
	},
	status: {
		// enum with values: PROCESSING, FAILED, SUCCESS
		type: String,
		required: true,
		enum: ['PROCESSING', 'FAILED', 'SUCCESS'],
	},
});

// create index
// ScrapedPagesSchema.index({ id: 1 }, { unique: true });
const Influencer = mongoose.model('scrapped_pages', ScrapedPagesSchema);

module.exports = Influencer;

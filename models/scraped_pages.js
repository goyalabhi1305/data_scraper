// Influencer model
const mongoose = require('mongoose');
const ScrapedPagesSchema = mongoose.Schema({
	page_number: {
		type: Number,
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

// Influencer model
const mongoose = require('mongoose');
const ScrapedPagesSchema = mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	all_data: {
		type: String,
		required: true,
	},
	last_updated: {
		type: Date,
		default: Date.now,
	},
});

// create index
// ScrapedPagesSchema.index({ id: 1 }, { unique: true });
const Influencer = mongoose.model('scrapped_pages', ScrapedPagesSchema);

module.exports = Influencer;

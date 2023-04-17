// new mongoose model
const mongoose = require('mongoose');

const InfluencerSchema = mongoose.Schema({
	userid: {
		type: String,
	},
	profileimg: {
		type: String,
	},
	ranking: {
		type: String,
	},
	creator_type: {
		type: String,
	},
	price: {
		insta_post: {
			max: {
				type: Number,
			},
			min: {
				type: Number,
			},
		},
		insta_story: {
			max: {
				type: Number,
			},
			min: {
				type: Number,
			},
		},
		insta_video: {
			max: {
				type: Number,
			},
			min: {
				type: Number,
			},
		},
		insta_reel: {
			max: {
				type: Number,
			},
		},
	},
	categories: [
		{
			name: {
				type: String,
			},
			id: {
				type: String,
			},
		},
	],
	barter: {
		type: Boolean,
	},
	score: {
		type: String,
	},
	metrics: {
		avg_likes: {
			type: Number,
		},
		avg_comments: {
			type: Number,
		},
		engagement: {
			type: Number,
		},
		avg_reach_post: {
			type: Number,
		},
		post_reach_percent: {
			type: Number,
		},
		// new fields
		following: {
			type: Number,
		},
		numPosts: {
			type: Number,
		},
		// new fields end
	},
	profile_display_name: {
		type: String,
	},
	followers: {
		type: Number,
	},
	display_posts: [
		{
			media_type: {
				type: String,
			},
			content_src: {
				type: String,
			},
			likes: {
				type: Number,
			},
			comments: {
				type: Number,
			},
			views: {
				type: Number,
			},
			reach: {
				type: Number,
			},
			engagement: {
				type: Number,
			},
			impressions: {
				type: Number,
			},
		},
	],
	platform: {
		type: String,
	},
	platform_meta: {
		insta_access_token: {
			type: String,
		},
		insta_id: {
			type: String,
		},
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
	lastupdate: {
		type: Date,
		default: Date.now,
	},
	report: [
		{
			userid: {
				type: String,
			},
			timestamp: {
				type: Date,
				default: Date.now(),
			},
			reason: {
				type: String,
			},
		},
	],

	// new scraped fields
	isRegistered: {
		type: Boolean,
	},
	isInstagramVerified: {
		type: Boolean,
	},
	location: {
		address: {
			type: String,
		},
		city: {
			type: Object,
		},
		state: {
			type: Object,
		},
		country: {
			type: Object,
		},
	},

	gender: {
		type: String,
	},
	language: [{ type: String }],
	dateOfBirth: {
		type: Date,
		default: null,
	},
	bioSection: {
		type: String,
	},
	contactInfo: {
		emails: [
			{
				type: {
					type: String,
					default: 'general',
				},
				number: {
					type: String,
				},
			},
		],
		phones: [
			{
				type: {
					type: String,
					default: 'general',
				},
				number: {
					type: String,
				},
			},
		],
	},
	fullName: {
		type: String,
	},
});

// InfluencerSchema.ensureIndex( { "profile_display_name": 1 }, { unique: true } )

module.exports = mongoose.model('influencers', InfluencerSchema);

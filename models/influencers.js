// Influencer model
const mongoose = require('mongoose');
const InfluencerSchema = mongoose.Schema({
        id: {
            type: String,
            required: true,
        },
        onGcc: {
            type: Boolean,
            required: true,
        },
        instaVerified: {
            type: Boolean,
        },
        isBlackListed: {
            type: Boolean,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        socialHandles: [
          {
            id: {
                type: String,
            },
            platform: {
                type: String,
            },
            handle: {
                type: String,
            },
            url: {
                type: String,
            },
            metrics: {
                type: Object,
            },
          }
        ],
        gender: {
            type: String,
        },
        contentCategories: {
            type: Array,
        },
        label:{
            type: String,
        },
        languages: {
            type: Array,
        },
        country: {
            type: String,
        },
        state: {
            type: String,
        },
        city: {
            type: String,
        },
        bio: {
            type: String,
        },
        dob: {
            type: Date,
        },
        barterAllowed: {
            type: Boolean,
        },
        isPlixxoUser: {
            type: Boolean,
        },
        profileImage: {
          url: {
            type: String,
          },
        },
        whatsappNumber: {
            type: String,
        },
        whatsappOptin: {
            type: Boolean,
        },
        creatorPrograms: [
          {
            id: {
                type: String,
            },
            tag: {
                type: String,
            },
            level: {
                type: String,
            },
          }
        ],
        phone: {
            type: String,   
        },
        comment: {
            type: String,
        },
        commercials: {
            type: Array,
        }
});

// create index
// InfluencerSchema.index({ id: 1 }, { unique: true });
const Influencer = mongoose.model('influencers', InfluencerSchema);

module.exports = Influencer;

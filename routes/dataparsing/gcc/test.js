const categories_list = require('./staticContent');
const data = {
	id: 'IG_233745',
	onGcc: true,
	instaVerified: false,
	isBlackListed: false,
	name: 'Justin Bieber',
	email: '',
	socialHandles: [
		{
			id: 'IG_233745',
			platform: 'INSTAGRAM',
			handle: 'justinbieber',
			url: 'https://www.instagram.com/justinbieber',
			metrics: {
				followers: 255100685,
				following: 721,
				avgEngagement: 0.38,
				avgLikes: 921035.13,
				avgComments: 5569.88,
				numOfPosts: 7356,
				avgVideoViews: null,
				subscribers: null,
				totalVideos: null,
				avgReach: 7051781,
				totalViews: null,
				__typename: 'Metrics',
			},
			__typename: 'SocialAccount',
		},
	],
	gender: null,
	contentCategories: [],
	label: 'CELEB',
	languages: [],
	country: '',
	state: '',
	city: '',
	bio: '',
	dob: '',
	barterAllowed: false,
	isPlixxoUser: false,
	profileImage: {
		url: 'https://cdn.vidooly.com/images/instagram/profiles/normal/6860189.jpeg',
		__typename: 'Asset',
	},
	whatsappNumber: '',
	whatsappOptin: false,
	creatorPrograms: [
		{
			id: '3',
			tag: 'GOOD_LIFE',
			level: 'CREATOR',
			__typename: 'CreatorProgram',
		},
	],
	phone: '',
	comment: '',
	commercials: [],
	__typename: 'Influencer',
};

const set = [
	{ id: '5', name: 'Travel', __typename: 'ContentCategory' },
	{ id: '14', name: 'Entertainment', __typename: 'ContentCategory' },
	{ id: '17', name: 'Luxury', __typename: 'ContentCategory' },
];

const categoryMap = (cat_data) => {
	// console.log(cat_data, 'cats');
	let list = [];
	for (let i = 0; i < cat_data.length; i++) {
		const catid = parseInt(cat_data[i].id);
		for (let j = 0; j < categories_list.length; j++) {
			const catlistid = parseInt(categories_list[j].id);
			if (catid === catlistid) {
				list = [
					...list,
					{
						id: categories_list[j].textid,
						name: categories_list[j].category,
					},
				];
			}
		}
	}
	return list;
};

console.log(categoryMap(set));

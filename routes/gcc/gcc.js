
// Language: javascript
// Path: routes\gcc\gcc.js
// optimise the query variable
const object = {
	operationName: 'searchInfluencers',
	variables: {
		after: null,
		size: 50,
		query: {
			filters: [
				{ field: 'platform', filterType: 'EQ', value: 'INSTAGRAM' },
				    field: 'followers', filterType: 'GTE', value: '0' },
				{ field: 'followers', filterType: 'LTE', value: '307535441' },
			],
			orderBy: null,
			orderDirection: null,
		},
	},
	query:'dfg'
};

const object2  = query searchInfluencers(
    $before: String,
     $after: String,
      $size: Int, 
      $query: SearchQuery) 
      {
  searchInfluencers(before: $before, after: $after, size: $size, query: $query) {
    pageInfo {
      total
      totalFiltered
      hasNextPage
      __typename
    }
    edges {
      node {
        id
        onGcc
        instaVerified
        isBlackListed
        name
        email
        socialHandles {
          id
          platform
          handle
          url
          metrics {
            followers
            following
            avgEngagement
            avgLikes
            avgComments
            numOfPosts
            avgVideoViews
            subscribers
            totalVideos
            avgReach
            totalViews
            __typename
          }
          __typename
        }
        gender
        contentCategories {
          id
          name
          __typename
        }
        label
        languages
        country
        state
        city
        bio
        dob
        barterAllowed
        isPlixxoUser
        profileImage {
          url
          __typename
        }
        whatsappNumber
        whatsappOptin
        creatorPrograms {
          id
          tag
          level
          __typename
        }
        phone
        comment
        commercials {
          id
          price
          format
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}

const sdff= {"operationName":"searchInfluencers","variables":{"after":null,"size":50,"query":{"filters":[{"field":"platform","filterType":"EQ","value":"INSTAGRAM"},{"field":"followers","filterType":"GTE","value":"0"},{"field":"followers","filterType":"LTE","value":"307535441"}],"orderBy":null,"orderDirection":null}},"query":"query searchInfluencers($before: String, $after: String, $size: Int, $query: SearchQuery) {\n  searchInfluencers(before: $before, after: $after, size: $size, query: $query) {\n    pageInfo {\n      total\n      totalFiltered\n      hasNextPage\n      __typename\n    }\n    edges {\n      node {\n        id\n        onGcc\n        instaVerified\n        isBlackListed\n        name\n        email\n        socialHandles {\n          id\n          platform\n          handle\n          url\n          metrics {\n            followers\n            following\n            avgEngagement\n            avgLikes\n            avgComments\n            numOfPosts\n            avgVideoViews\n            subscribers\n            totalVideos\n            avgReach\n            totalViews\n            __typename\n          }\n          __typename\n        }\n        gender\n        contentCategories {\n          id\n          name\n          __typename\n        }\n        label\n        languages\n        country\n        state\n        city\n        bio\n        dob\n        barterAllowed\n        isPlixxoUser\n        profileImage {\n          url\n          __typename\n        }\n        whatsappNumber\n        whatsappOptin\n        creatorPrograms {\n          id\n          tag\n          level\n          __typename\n        }\n        phone\n        comment\n        commercials {\n          id\n          price\n          format\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}"}
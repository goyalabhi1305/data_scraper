const fs = require('fs');
const csv = require('csv-parser');

const csvToJson = (csvFilePath, jsonFilePath) => {
  try {
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        const user = {
          userid: "",
          profileimg: data.profileImage,
          ranking: "",
          creator_type: "cnt_creator",
          bio: data.bio,
          price: {
            insta_post: {
              max: null,
              min: null,
            },
            insta_story: {
              max: null,
              min: null,
            },
            insta_video: {
              max: null,
              min: null,
            },
          },
          categories: [{
            name: null,
            id: null,
          }],
          barter: true,
          score: null,
          metrics: {
            avg_likes: Number(data.avgLikes),
            avg_comments: Number(data.avgComments),
            engagement: Number(data.avgEngagement),
            avg_reach_post: Number(data.avgReach),
            post_reach_percent: null,
            media_count: Number(data.numOfPosts),
            following_count: Number(data.following),
            avg_impressions: null,
            avg_views: Number(data.avgVideoViews),
          },
          website: null,
          profile_display_name: data.handle,
          followers: Number(data.followers),
          display_posts: [{
            media_type: null,
            content_src: null,
            likes: null,
            comments: null,
            views: null,
            reach: null,
            engagement: null,
            impressions: null,
          }],
          platform: data.platform,
          platform_meta: {
            insta_basic_display_token: null,
            insta_access_token: null,
            insta_id: null,
          },
          timestamp: new Date(data.timestamp),
          lastupdate: new Date(data.lastupdate),
          ac_type: data.ac_type,
          profile_complete_status: {
            insta_connected: null,
            ac_type_not_personal: null,
            insta_graph_connected: null,
          },
          report: [{
            userid: null,
            timestamp: null,
            reason: null,
          }],
        };

        results.push(user);
      })
      .on('end', () => {
        fs.writeFileSync(jsonFilePath, JSON.stringify(results));
        console.log('CSV file successfully converted to JSON');
      });
  } catch (err) {
    console.log(err);
  }
};

// Call the function with the appropriate file paths
csvToJson('../data_scraper/scraped_data/gcc/all/LastImport.csv', '../data_scraper/scraped_data/gcc/all');

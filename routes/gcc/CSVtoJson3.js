const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const chalk = require('chalk');
const { ObjectId } = require('bson');


class User {
  constructor({
    userid = userid,
    profileimg,
    ranking = "",
    creator_type = "influencers",
    bio,
    price = {
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
    categories = [{
      name: null,
      id: null,
    }],
    barter = true,
    score = null,
    metrics = {
      avg_likes: null,
      avg_comments: null,
      engagement: null,
      avg_reach_post: null,
      post_reach_percent: null,
      media_count: null,
      following_count: null,
      avg_impressions: null,
      avg_views: null,
    },
    website = null,
    profile_display_name,
    followers = null,
    display_posts = [{
      media_type: null,
      content_src: null,
      likes: null,
      comments: null,
      views: null,
      reach: null,
      engagement: null,
      impressions: null,
    }],
    platform,
    platform_meta = {
      insta_basic_display_token: null,
      insta_access_token: null,
      insta_id: null,
    },
    //use the below timestamp for the first 16,000
    timestamp = timestamp,
    lastupdate  =timestamp,
    ac_type,
    profile_complete_status = {
      insta_connected: null,
      ac_type_not_personal: null,
      insta_graph_connected: null,
      //extra field
      insta_graph_conn:false,
    },
    report = [{
      userid: null,
      timestamp: null,
      reason: null,
    }],
    
    email =email,
    whatsappNumber = whatsappNumber,
    phone = phone,

  }) {
    this.userid = userid;
    this.profileimg = profileimg;
    this.ranking = ranking;
    this.creator_type = creator_type;
    this.bio = bio;
    this.price = price;
    this.categories = categories;
    this.barter = barter;
    this.score = score;
    this.metrics = metrics;
    this.website = website;
    this.profile_display_name = profile_display_name;
    this.followers = followers;
    this.display_posts = display_posts;
    this.platform = platform;
    this.platform_meta = platform_meta;
    this.timestamp = timestamp;
    this.lastupdate = timestamp;
    this.ac_type = ac_type;
    this.profile_complete_status = profile_complete_status;
    this.report = report;
    
    this.email = email;
    this.whatsappNumber = whatsappNumber;
    this.phone = phone;
    this.userid =userid;
 
  }
}

const csvToJson = async (inputFolder, outputFolder) => {
    try {
        // Get a list of all CSV files in the input folder
        const files = fs.readdirSync(inputFolder).filter(file => file.endsWith('.csv'));
       let   count = 0;
        let timestamp = 1654401943000;

        // Loop through each file
        for (let i = 0; i < files.length; i++) {
           
            const inputFile = path.join(inputFolder, files[i]);
            const outputFile = path.join(outputFolder, files[i].replace('.csv', '.json'));
            console.log(chalk.yellowBright(`🟡 [${i+1}/${files.length}]: Converting ${inputFile} to ${outputFile}...`));
            //for every length = 16,000, create incerese a timestamp for one day
            
           


            // Read the CSV file
            const users = [];
            

            fs.createReadStream(inputFile)
              .pipe(csv())
              .on('data', (data) => {
                timestamp = timestamp + 473364;
                const myObjectId = new ObjectId();
                console.log(myObjectId)
                // console.log(count)
                console.log(timestamp)
                const user = new User({
                  userid : myObjectId,
                  profileimg: data.profileImage,
                  bio: data.bio,
                  price: {
                    insta_post: {
                      max: null,
                      min: null,
                    },
                    insta_story: {
                      max:
                        data.storyPriceMax === "N/A"
                            ? null
                            : Number(data.storyPriceMax),
                        min:
                        data.storyPriceMin === "N/A"

                            ? null
                            : Number(data.storyPriceMin),
                    },
                    insta_video: {
                        max:
                            data.videoPriceMax === "N/A"
                                ? null
                                : Number(data.videoPriceMax),
                            min:
                            data.videoPriceMin === "N/A"
    
                                ? null
                                : Number(data.videoPriceMin),
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
                    timestamp:new Date(timestamp),
                    lastupdate:new Date(timestamp),
                    ac_type: data.ac_type,
                    profile_complete_status: {
                        insta_connected: null,
                        ac_type_not_personal: null,
                        insta_graph_connected: null,
                        insta_graph_conn:false,
                    },
                    report: [{
                        userid: null,
                        timestamp: null,
                        reason: null,
                    }],
                   
                    email: data.email,
                    whatsappNumber: data.whatsappNumber,
                    phone: data.phone,
                });
                //if users length is 16,000, then increase the timestamp by 1 day
                if(user){
                    count++;
                }
               

                users.push(user);

                })
                .on('end', () => {
                    // Write the JSON data to the output file
                    fs.writeFileSync(outputFile, JSON.stringify(users), 'utf8');
                    console.log(chalk.green('🟢 Data written to JSON file'));
                }
                );
        }
    } catch (err) {
        console.log(chalk.red(`🔴 ${err.message}`));
    }
};
const directorypath = path.join(__dirname, '');
csvToJson(`${directorypath}`, directorypath);

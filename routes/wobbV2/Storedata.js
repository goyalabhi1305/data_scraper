//store data in db

const db = require('../db');
const influncers = require('../../models/influencers');

const  data_db = async (req, res) => {
    try{
        let total = 620;
        for (let i = 1; i <= total; i++) {
            const path_tosave = `../data_scraper/scraped_data/wobb/users/all_${i}.json`;
            const data = require(path_tosave);
            console.log(data);
            const user = new influncers({
                name: data.name,
                username: data.username,
                email: data.profile.address.email,
                phone: data.phone,
                whatsappNumber: data.whatsappNumber,
                languages: data.languages,
                'profileImage.url': data.accountDetails.profile_pic,
                bio:data.accountDetails.biography,
                contentCategories:data.categories,
                

            });
            await user.save();
    
        

    }
}

    catch(err){
        console.log(err);
    }

}

data_db();
    
// const axios = require('axios');
const fs = require('fs');


let allIds = [];
// let userNUllIds = [];
try{

    // create a loop that reads json file from folders
    for (let i = 0; i < 41; i++) {
        const skip = i * 1000
        console.log(`🚀${i}--- ${skip}---${skip+1000} : Reading file`);
        fs.readFile(`./scraped_data/all_data/${skip}_data_${skip + 1000}.json`, (err, data) => {
            if (err) throw err;
            console.log(`🟢${skip}_data_${skip + 1000}.json File has been Read!`);
            // console.log('⚫',data);
            const jsonData = JSON.parse(data);
            console.log(`Users length: ${jsonData?.campaign_profiles?.length}`);
           const newonlyId =  jsonData?.campaign_profiles?.map(user => user.id)

           const withoutFilter =  jsonData?.campaign_profiles?.map(user => user.id)
           

           console.log(`Difference, Total: ${withoutFilter?.length} ,After Removing NUll ${newonlyId?.length}`);


        //    const userIdnull = jsonData?.campaign_profiles?.filter(user=>user.id === null);

        //    console.log(userIdnull)

        //    NullallIds = [...userNUllIds, ...userIdnull];

            // console.log('🥺',newonlyId);
            allIds = [...allIds, ...newonlyId];
            // console.log(jsonData.campaign_profiles);
            // console.log(jsonData.campaign_profiles.length);
            // console.log(jsonData.campaign_profiles[0]);
            // console.log(jsonData.campaign_profiles[0].id);
            // console.log(jsonData.campaign_profiles[0].id);
            // console.log(jsonData.campaign_profiles[0].id);
                 fs.appendFile("./scraped_data/alluserIds.json", JSON.stringify(newonlyId) , function (err) {
                         if (err) throw err;
                         console.log(`🔴User Ids appended to file`);
                      });
        });
    }

    // console.log('❤️',allIds)
        // creating new series files of data
        // fs.writeFile(`./scraped_data/alluserIds.json`, JSON.stringify(allIds), (err) => {
        //     if (err) throw err;
        //     console.log('🔴File has been created');
        // });

    }
    catch(err){
        console.log(`⚠️: An error occurred :${err}`);
    }
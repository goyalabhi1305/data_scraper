const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const json2csv = require('json2csv').parse;
const chalk = require('chalk');

const jsonToCsv = async (inputFile, outputFolder) => {
    try {
        // Get the name of the input file
        const inputFileName = path.basename(inputFile);

        // Read the JSON file
        const data = fs.readFileSync(inputFile, 'utf8');
        const jsonData = JSON.parse(data);

        // Extract the data from the JSON object
        const influencerList = jsonData['data']['searchInfluencers']['edges'];
        const csvData = [];

        // Loop through each influencer and extract the required data
        influencerList.forEach(influencer => {
            const node = influencer['node'];
            const metrics = node['socialHandles'][0]['metrics'];

            const influencerData = {
                id: node['id'],
                name: node['name'],
                handle: node['socialHandles'][0]['handle'],
                email: node['email'],
                whatsappNumber: node['whatsappNumber'],
                phone: node['phone'],
                platform: node['socialHandles'][0]['platform'],
                followers: metrics['followers'],
                following: metrics['following'],
                avgEngagement: metrics['avgEngagement'],
                avgLikes: metrics['avgLikes'],
                avgComments: metrics['avgComments'],
                numOfPosts: metrics['numOfPosts'],
                avgVideoViews: metrics['avgVideoViews'],
                avgReach: metrics['avgReach'],
                url: node['socialHandles'][0]['url'],
                country: node['country'],
                state: node['state'],
                city: node['city'],
                bio: node['bio'],
                dob: node['dob'],
                profileImage: node['profileImage']['url'],
            };
            csvData.push(influencerData);
        });

        // Convert the data to CSV format
        const csvString = json2csv(csvData);

        // Write the CSV data to the output file
        const outputFile = path.join(outputFolder, inputFileName.replace('.json', '.csv'));
        fs.writeFileSync(outputFile, csvString, 'utf8');
        console.log(chalk.green('🟢 Data written to CSV file:', outputFile));
        //create timout for 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
        console.log(chalk.red(`🔴 ${err.message}`));
    }
};

// Call the jsonToCsv function
const inputFolder = path.join(__dirname, '../../scraped_data/gcc/listinsta');
const outputFolder = path.join(__dirname, '../../scraped_data/gcc/csv');

fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.log(chalk.red(`🔴 ${err.message}`));
        return;
    }

    // Loop through each file and call the jsonToCsv function
    files.filter(file => file.endsWith('.json')).forEach(file => {
        const inputFile = path.join(inputFolder, file);
        jsonToCsv(inputFile, outputFolder);
    });
});

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const chalk = require('chalk');

const csvToJson = async (inputFolder, outputFolder) => {
    try {
        // Get a list of all CSV files in the input folder
        const files = fs.readdirSync(inputFolder).filter(file => file.endsWith('.csv'));

        // Loop through each file
        for (let i = 0; i < files.length; i++) {
            const inputFile = path.join(inputFolder, files[i]);
            const outputFile = path.join(outputFolder, files[i].replace('.csv', '.json'));
            console.log(chalk.yellowBright(`🟡 [${i+1}/${files.length}]: Converting ${inputFile} to ${outputFile}...`));


            // Read the CSV file
            const jsonArray = [];
            fs.createReadStream(inputFile)
              .pipe(csv())
              .on('data', (data) => jsonArray.push(data))
              .on('end', () => {
                  // Write the JSON data to the output file
                  fs.writeFileSync(outputFile, JSON.stringify(jsonArray), 'utf8');
                  console.log(chalk.green('🟢 Data written to JSON file'));
              });
        }
    } catch (err) {
        console.log(chalk.red(`🔴 ${err.message}`));
    }
};

// Call the csvToJson function
const inputFolder = path.join(__dirname, '../../scraped_data/gcc/all');
const outputFolder = path.join(__dirname, '../../scraped_data/gcc/all');
csvToJson(inputFolder, outputFolder);

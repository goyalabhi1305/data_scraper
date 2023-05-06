const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const json2csv = require('json2csv').parse;
const chalk = require('chalk');

const combineCsv = async (inputFolder) => {
    try {
        // Get a list of all CSV files in the input folder
        const files = fs.readdirSync(inputFolder).filter(file => file.endsWith('.csv'));

        // Combine all CSV files
        let csvData = [];
        for (let i = 0; i < files.length; i++) {
            const inputFile = path.join(inputFolder, files[i]);
            console.log(chalk.yellowBright(`🟡 [${i+1}/${files.length}]: Reading ${inputFile}...`));
            const data = fs.readFileSync(inputFile, 'utf8');
            csvData.push(data);
        }

        // Write the combined data to a single CSV file
        const outputFile = path.join(inputFolder, 'combined.csv');
        fs.writeFileSync(outputFile, csvData.join('\n'), 'utf8');
        console.log(chalk.green('🟢 All CSV files combined successfully!'));
    } catch (err) {
        console.log(chalk.red(`🔴 ${err.message}`));
    }
};

// Call the combineCsv function
const inputFolder = path.join(__dirname, '../../scraped_data/gcc/csv');
combineCsv(inputFolder);

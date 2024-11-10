const { parse } = require('csv-parse');

/**
 * Convert CSV data (file buffer) to JSON format
 * @param {Buffer} buffer The CSV file data in memory (from multer)
 * @returns {Promise<Object[]>} The parsed JSON array from the CSV data
 */
function csvToJson(buffer) {
    return new Promise((resolve, reject) => {
        const results = [];
        const parser = parse(buffer, {
            columns: true, // Use the first line as column names
            skip_empty_lines: true
        });

        parser.on('data', (row) => {
            results.push(row); // Collect each row of data
        });

        parser.on('end', () => {
            resolve(results); // Return the parsed JSON
        });

        parser.on('error', (error) => {
            reject(error); // Handle any parsing errors
        });
    });
}

module.exports = { csvToJson };


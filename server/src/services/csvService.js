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
            // Filter error columns with value '1'
            const errors = Object.keys(row).filter(key => row[key] === '1' && key !== 'ID' && key !== 'File/Image Name' && key !== 'File Type' && key !== 'Score' && key !== 'Deleted' && key !== 'Library Reference' && key !== 'URL' && key !== 'Date Accessed');
            if (errors.length > 0) {
                results.push({
                    Name: row['File/Image Name'],
                    FileType: row['File Type'],
                    Id: row['ID'],
                    Url: row['URL'],
                    Errors: errors
                });
            }
        });

        parser.on('end', () => {
            resolve(results); // Return the parsed JSON
        });

        parser.on('error', (error) => {
            reject(error); // Handle any parsing errors
        });

        parser.write(buffer);
        parser.end();
    });
}

module.exports = { csvToJson };
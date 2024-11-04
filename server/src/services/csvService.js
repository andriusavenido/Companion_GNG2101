import { readFile } from 'fs';
/**
 * 
 * @param {*} filePath 
 */

function csvToJson(filePath) {
    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const rows = data.trim().split('\n');
        const headers = rows[0].split(',');

        const jsonArray = rows.slice(1).map(row => {
            const values = row.split(',');
            const jsonObject = {};
            headers.forEach((header, index) => {
                jsonObject[header.trim()] = values[index].trim();
            });
            return jsonObject;
        });
        
        return jsonArray;
    });
}

module.exports = {csvToJson};

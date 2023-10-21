const ExcelJS = require('exceljs');
const fs = require('fs');
const axios = require('axios');

const AZURE_MAPS_KEY = '87l8PLUb0h_i7r_ae9USFAj_NjMk1AfjXKXVw_HhbrU'; // Replace with your Azure Maps subscription key
const BASE_URL = 'https://atlas.microsoft.com/search/address/json';

async function getLatLng(address) {
    const url = `${BASE_URL}?api-version=1.0&subscription-key=${AZURE_MAPS_KEY}&query=${encodeURIComponent(address)}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.results && data.results.length > 0) {
        const position = data.results[0].position;
        return {
            latitude: position.lat,
            longitude: position.lon
        };
    } else {
        throw new Error('No results found');
    }
}

async function extractEmployeeData(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);
    const employees = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber !== 1) {
            const employee = {
                EMPID: row.getCell(1).value,
                TeamID: row.getCell(2).value,
                EMPNAME: row.getCell(3).value,
                AD1: row.getCell(4).value,
                AD2: row.getCell(5).value,
                AD3: row.getCell(6).value
            };
            employees.push(employee);
        }
    });

    return employees;
}

async function writeToJsonFile(data, outputPath) {
    return new Promise((resolve, reject) => {
        fs.writeFile(outputPath, JSON.stringify(data, null, 4), 'utf8', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

const inputPath = './List_of_employees__address.xlsx';
const outputPath = './output.json';

extractEmployeeData(inputPath)
    .then(async employees => {
        for (const employee of employees) {
            const address = `${employee.AD1}, ${employee.AD2}, ${employee.AD3}`;
            try {
                const coords = await getLatLng(address);
                console.log(coords)
                employee.latitude = coords.latitude;
                employee.longitude = coords.longitude;
            } catch (error) {
                console.error(`Failed to get coordinates for ${address}: ${error.message}`);
            }
        }
        return employees;
    })
    .then(data => writeToJsonFile(data, outputPath))
    .then(() => console.log(`Data written to ${outputPath}`))
    .catch(error => console.error(`Error: ${error.message}`));


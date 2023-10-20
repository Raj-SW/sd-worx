const fs = require('fs');

function transformData(inputPath, outputPath) {
    // Read the data from the input JSON file
    const rawData = fs.readFileSync(inputPath, 'utf8');
    const employees = JSON.parse(rawData);

    // Transform the data
    const transformed = employees.map(employee => ({
        id: employee.EMPID.result,
        name: employee.EMPNAME,
        address: `${employee.AD1}, ${employee.AD2}, ${employee.AD3}`,
        location: {
            lat: employee.latitude,
            long: employee.longitude
        }
    }));

   
    fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 4), 'utf8');
}

const inputPath = './output.json';
const outputPath = '.mapped_output.json';  

transformData(inputPath, outputPath);
console.log(`Transformed data written to ${outputPath}`);

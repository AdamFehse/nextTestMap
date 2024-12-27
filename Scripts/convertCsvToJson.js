const fs = require('fs');
const Papa = require('papaparse');
const path = require('path');

// Path to your CSV file
const csvFilePath = path.join(__dirname, '../public/storymapdata.csv');

// Read and parse the CSV file
fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading CSV file:', err);
    return;
  }

  // Parse CSV to JSON
  const parsedData = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  });

  // Write the JSON data to a file in the 'out' directory
  const jsonFilePath = path.join(__dirname, '../out/storymapdata.json');
  fs.writeFile(jsonFilePath, JSON.stringify(parsedData.data, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('CSV converted to JSON and saved to out/storymapdata.json');
    }
  });
});

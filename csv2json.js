const path = require('path')
const fs = require('fs')
const csvtojson = require('csvtojson')

const read = (callback) => {
  let csv = path.join(__dirname, 'data', 'customer-data.csv')
  let buffer = {};
  let i = 0

  csvtojson()
    .fromFile(csv)
    .on('end_parsed', (json) => {
      callback(json)
    })
    .on('error', (error) => {
        console.log(`error on read json file: ${error}`)
    })
}

const save = (json) => {
  let file = path.join(__dirname, 'data', 'customer-data.json')
  //json = JSON.stringify(json)

  console.log(json);

  fs.writeFile(file, JSON.stringify(json, null, 4), (error) => {
    if (error)
      console.log(`error on write file: ${error}`)
  })
}

read((data) => {
  save(data);
})

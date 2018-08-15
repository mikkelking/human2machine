const fs = require('fs')
const XL = require('xlsx')

const debug = require('debug')('dde:table')

const doFile = (inputFile) => {
  debug(`Reading file: ${inputFile}`)

  const wb = XL.readFile(inputFile)
  const data = {}
  wb.SheetNames.forEach(sheet => {
    data[sheet] = XL.utils.sheet_to_json(wb.Sheets[sheet])
  })
  return data
}

Meteor.methods({
  import_dd() {
    try {
      const inputFile = `/Users/triton/racv/racv-data/schema-parse/michelle.accessdb/EDW Data Dictionary.xlsx`
      const data = doFile(inputFile)
      console.log("Read in "+Object.keys(data).join())
    } catch(err) {
      console.error(err)
    }  
  },

  import_anon() {
    try {
      const inputFile = `/Users/triton/racv/racv-data/schema-parse/anonymise/ANONYMISE_THESE.xlsx`
      const data = doFile(inputFile)
      console.log("Read in "+Object.keys(data).join())
    } catch(err) {
      console.error(err)
    }  
  },
})





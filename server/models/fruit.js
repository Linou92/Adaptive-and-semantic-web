const mongoose = require('mongoose')

const fruitSchema = new mongoose.Schema({
  fruit: {
    type: [Object],

  }
})

const tempwebapps = mongoose.model('tempwebapps', fruitSchema)

module.exports.tempwebapps = tempwebapps
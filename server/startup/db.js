const mongoose = require('mongoose')

module.exports = function(){
    mongoose.connect('mongodb+srv://rm222cm:12345@cluster0-nz6eu.mongodb.net/StorageRoom?retryWrites=true&w=majority',{ useNewUrlParser: true, useCreateIndex: true })
            .then(() => console.log('Conneced to Mongodb'))
            .catch(() => console.log('Connection Failed to Mongodb'))
}
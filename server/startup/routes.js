const foodTemp = require('../routes/foodTemp')
const express = require('express')

module.exports = function(app){

    app.use(express.json())
    app.use('/foodTemp', foodTemp)
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
        });
}
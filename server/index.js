const express = require("express")
var app = express()
const {tempwebapps }= require('./models/fruit')

require('./startup/routes')(app)
require('./startup/db')()

        
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });
        let port = process.env.PORT || 4000
  
app.listen(port, () => console.log(`Listening on ${port}`))

async function asd(){
  
    const fruits = await tempwebapps.find()
}
asd()
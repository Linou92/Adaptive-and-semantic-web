const PORT = process.env.PORT || 3000
var express = require('express')
var expressValidator = require('express-validator')
var bodyParser = require('body-parser')
const https = require('https')
var fs = require('fs')
var cookieParser = require('cookie-parser')
const session = require('express-session')

var app = express()
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

// set up view engine
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.static('views'))
app.use(cookieParser())

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// set up session cookies
app.use(session({
  secret: 'abc',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))


// set up https
app.use(function (req, res, next) {
    next()
})

// chart route
app.get('/chart', (req, res) => {
  res.render('chart.ejs',  { user: req.user })
})
// route for the homepage
app.get('/', (req, res) => {
  res.render('home', { user: req.user })
})

const http = require('http');


let port = process.env.PORT || 3000
  
app.listen(port, () => console.log(`Listening on ${port}`))


/*
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(PORT, () => {
  console.log('App server running on port %s', PORT)
})
https.createServer(app).listen(8080)
*/
//app.listen(3000, () => console.log('started'));

module.exports = app

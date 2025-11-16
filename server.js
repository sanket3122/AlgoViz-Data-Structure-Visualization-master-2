// var express = require('express');
// var env = require('dotenv').config()
// var ejs = require('ejs');
// var path = require('path');
// var app = express();
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);

// mongoose.connect('mongodb://localhost:27017/sanket', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }, (err) => {
//   if (!err) {
//     console.log('MongoDB Connection Succeeded.');
//   } else {
//     console.log('Error in DB connection : ' + err);
//   }
// });

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
// });

// app.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false,
//   store: new MongoStore({
//     mongooseConnection: db
//   })
// }));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');	

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(__dirname + '/views'));

// var index = require('./routes/index');
// app.use('/', index);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('File Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// // define as the last app.use callback
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.send(err.message);
// });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, function () {
//   console.log('Server is started on http://127.0.0.1:'+PORT);
// });


var express = require('express');
var env = require('dotenv').config()
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

//  Mongo + connect-mongo removed for dev
// var mongoose = require('mongoose');
// var MongoStore = require('connect-mongo')(session);

// --- SESSION (memory store, dev only) ---
app.use(session({
  secret: 'work hard',
  resave: false,
  saveUninitialized: false
}));

// --- DEV ONLY: BYPASS LOGIN ---
app.use((req, res, next) => {
  // pretend user is always logged in
  req.session.user = {
    _id: 'dev-user',
    username: 'sanket',
    email: 'sanketbendale25@gmail.com'
  };
  req.session.userId = 'dev-user';   // in case routes check userId
  next();
});

// --- VIEWS / STATIC / BODY PARSER ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));

// --- ROUTES ---
var index = require('./routes/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:' + PORT);
});

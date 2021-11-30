const express = require('express');
const hbs = require('express-handlebars');
//const routes = require('./public/js/routes');
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const router = require('./routes')
const initializePassport = require('./passport-config')
const Mongoose = require('./mongoose/Connect')
const User = require('./models/User')
// connecting to database at the start

Mongoose.connect()
const app = express();

app.use(express.urlencoded({extended: false}))


initializePassport(passport)


app.use(flash())
app.use(session({
    secret: 'SECRET_KEY_MY',
    resave: false,
    saveUninitialized: false
}))


app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'layout',
}));

app.use(express.static('views/images'));

const port = 3000;


// Catch 404 Errors
app.use(function (req, res, next) {
    var err = new Error('Error 404 - Page Not Found');
    err.status = 404;
    console.log(req.method + ": " + req.url)
    next(err);
    // console.log("\nERROR 404... REDIRECTING TO HOME PAGE\nSee app.js to uncomment full error report\n")
    // res.redirect("/");
});


app.listen(port, function (req, res) {
    console.log('Server listening on port', port);
});
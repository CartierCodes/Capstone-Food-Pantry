const express = require('express');
const hbs = require('express-handlebars');
const routes = require('./public/js/routes');


const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  defaultLayout: 'layout',          
}));

app.use(express.static('views/images'));

const port = 3000;

app.use('/', routes);

// Catch 404 Errors
app.use(function(req, res, next) {
  var err = new Error('Error 404 - Page Not Found');
  err.status = 404;
  next(err);
  // console.log("\nERROR 404... REDIRECTING TO HOME PAGE\nSee app.js to uncomment full error report\n")
  // res.redirect("/");
});

app.listen(port, function (req, res) {
    console.log('Server listening on port', port);
});
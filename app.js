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

const port = 3000;

app.use('/', routes);
app.get('/', (req, res) => {
  res.sendFile('website.html')
})

// Catch 404 Errors
app.use(function(req, res, next) {
  var err = new Error('Error 404 - Page Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, function (req, res) {
    console.log('Server listening on port', port);
});
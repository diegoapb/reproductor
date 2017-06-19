//Requiring the dependencies
var express = require('express');
var app = express();
var path = require('path');
var dust = require('dustjs-helpers');
var bodyParser = require('body-parser');
var cons = require('consolidate');



//Create a template engine middleware for Express.
//select dust as default template engine
app.engine('dust', cons.dust);
app.set('view engine', 'dust');

//select the views directory for the layouts
app.set('views', __dirname + '/views');
app.set('music', __dirname + '/music');

//select the public directory as static so we can access the files
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//middlewares

app.use(require('./controllers'));


app.listen(8000, function() {
    console.log('Example app listening on port 8080!')
});
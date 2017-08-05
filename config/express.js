var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.set('secret', 'Plac3sCryptoKe1'); 
app.use(express.static('./public'));
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

consign({cwd: 'app'})
    .include('models')
    .then('api')
    // .then('routes/auth.js')
    .then('routes')
    .into(app);

module.exports = app;

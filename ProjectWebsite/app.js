var express = require('express');
var app = express();
require('dotenv').config();

app.use(express.static('public'));
app.use(express.static(__dirname + '/dist/projectWebsite'));

app.get('*', function (req, res) {
   res.sendFile(__dirname + '/dist/projectWebsite/index.html'); // load our index.html file
 });

app.listen(process.env.PORT);
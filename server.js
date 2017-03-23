var express = require('express');

//variable app equals the express server
var app = express();

//serves static content from public directory
app.use(express.static(__dirname + '/public'));

// listens on PORT 3000
app.listen(3000);

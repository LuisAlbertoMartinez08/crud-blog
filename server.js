var express = require('express');

//variable app equals the express server
var app = express();

//with this ex[ress can parse different types of data
var bodyParser = require('body-parser');

// for parsing application/json
app.use(bodyParser.json());

//getting mongo ready
var mongoose = require('mongoose');

//connecting to the mongo database
mongoose.connect('mongodb://localhost/blogSpring2016');

var PostSchema = mongoose.Schema({
	title:{type: String, required: true}
	body: String,
	tag:{type: String, enum: ['POLITICS', 'ECONOMY','EDUCATION','TECHNOLOGY']},//If using a tag this are the options
	posted: {type: Date, default: Date.now}
});

// for parsing application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true })); 

//serves static content from public directory
app.use(express.static(__dirname + '/public'));

//server listening for new post on this route
app.post("/api/blogpost", createPost);

function createPost(req,res){
	var post = req.body;
	console.log(post);
	res.json(post);
}

// listens on PORT 3000
app.listen(3000);

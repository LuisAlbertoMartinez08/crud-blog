var express = require('express');

//variable app equals the express server
var app = express();

//with this ex[ress can parse different types of data
var bodyParser = require('body-parser');


//getting mongo ready
var mongoose = require('mongoose');

//connecting to the mongo database
mongoose.connect('mongodb://localhost/blogSpring2016');

var PostSchema = mongoose.Schema({
	title:{type: String, required: true},
	body: String,
	tag:{type: String, enum: ['POLITICS', 'ECONOMY','EDUCATION','TECHNOLOGY']},//If using a tag this are the options
	posted: {type: Date, default: Date.now}
});

//this will allow the user to create, find, remove or update instances
var PostModel = mongoose.model("PostModel", PostSchema);//declaring PostModel and implement it based on the PostSchema
														//makes sure to validate against PostSchema
//serves static content from public directory
app.use(express.static(__dirname + '/public'));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true })); 

//server listening for new post on this route
app.post("/api/blogpost", createPost);

function createPost(req,res){
	var post = req.body;
	console.log(post);
	PostModel.create(post); // inserts created post object coming from "var post" to the database
	res.json(post);
}

// listens on PORT 3000
app.listen(3000);

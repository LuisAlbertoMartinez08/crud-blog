var express = require('express');

//variable app equals the express server
var app = express();

//with this ex[ress can parse different types of data
var bodyParser = require('body-parser');


//getting mongo ready
var mongoose = require('mongoose');

mongoose.Promise = Promise

//connecting to the mongo database
mongoose.connect('mongodb://localhost/blogSpring2016');

// var Promise = require("bluebird");

var PostSchema = mongoose.Schema({
	title:{type: String, required: true},
	body: String,
	tag:{type: String, enum: ['HEALTH', 'ECONOMY','EDUCATION','TECHNOLOGY']},//If using a tag this are the options
	posted: {type: Date, default: Date.now}
},{collection: 'post'}); /* Mongoose automaticaly 
							names and pluralizes 
							the collection name. 
							Here we overwrite that. */

/* This will allow the user to create, find, remove or update instances.
   Declaring PostModel and implement it based on the PostSchema.
   Makes sure to validate against PostSchema. */
var PostModel = mongoose.model("PostModel", PostSchema);	

//serves static content from public directory
app.use(express.static(__dirname + '/public'));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true })); 

//server listening for new post on this route
app.post("/api/blogpost", createPost);

//server listens for request to gather all posts
app.get("/api/blogpost", getAllPosts);

//grabs post by Id to edit it 
app.get("/api/blogpost/:id",getPostById);

//server listens for a delete request
app.delete("/api/blogpost/:id", deletePost);

//server listens for a update request
app.put("/api/blogpost/:id",updatePost);


function updatePost(req,res){
	var postId = req.params.id;
	var post = req.body;
	PostModel
	.update({_id: postId},{
		title:post.title,
		body:post.body
	})
	.then(
		function(status){
			res.sendStatus(200);
		},
		function(err){
			res.sendStatus(400);
	});
}


function getPostById(req,res){
	var postId = req.params.id;
	PostModel
			.findById(postId)
			.then(
				function(post){
				  res.json(post);
			},
			function(err){
				res.sendStatus(400);
			});
}

function deletePost (req,res){
	var postId = req.params.id;
	PostModel
			.remove({_id: postId})
			.then(
				function(status){
					res.sendStatus(200);
				},
				function(){
					res.sendStatus(400);
				});
}

function getAllPosts(req,res){
	PostModel
			.find()
			.then(
				function(posts){
					res.json(posts);
				},
				function(err){
					res.sendStatus(400);
				});
}

function createPost(req,res){
	var post = req.body;
	console.log(post);
	PostModel
	.create(post)// inserts created post object coming from "var post" to the database 
	.then(
		function(postObj){
			res.json(200);
		}, 

		function(err){
			res.sendStatus(400);
		}); 
	}

// listens on PORT 3000
app.listen(3000);

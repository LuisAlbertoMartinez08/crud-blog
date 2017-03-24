(function(){
	//module that drives <html ng-app="BlogApp"> 
	angular
		.module("BlogApp",[])
		.controller("BlogController", BlogController);

	function BlogController($scope, $http){
		
		// listeners
		$scope.createPost = createPost;
		$scope.deletePost = deletePost;
		$scope.editPost = editPost;

	function init(){
		getAllPosts();
	}
	
	init();

	function editPost (postId){
		$http.get("/api/blogpost/"+postId);
	}

	function deletePost(postId){
		$http.delete("/api/blogpost/"+postId)
		.success(getAllPosts);
	}
	
	function getAllPosts (){
		$http
			.get("/api/blogpost")
			.success(function(posts){
				$scope.posts = posts;
			});
	}


	function createPost(post){
		console.log(post);
		$http
			.post("/api/blogpost", post)
			.success(getAllPosts);
		}
	}
})();
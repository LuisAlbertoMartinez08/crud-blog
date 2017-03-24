(function(){
	//module that drives <html ng-app="BlogApp"> 
	angular
		.module("BlogApp",[])
		.controller("BlogController", BlogController);

	function BlogController($scope, $http){
		// listens to the createPost handler on the ng-click sent from the submit button
		$scope.createPost = createPost;

		$scope.deletePost = deletePost;

	function init(){
		getAllPosts();
	}
	
	init();

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
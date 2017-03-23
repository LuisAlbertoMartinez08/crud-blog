(function(){
	//module that drives <html ng-app="BlogApp"> 
	angular
		.module("BlogApp",[])
		.controller("BlogController", BlogController);

	function BlogController($scope, $http){
		// listens to the createPost handler on the ng-click sent from th UI
		$scope.createPost = createPost;

	function createPost(post){
		console.log(post);
		$http.post("/api/blogpost", post);
		}
	}
})();
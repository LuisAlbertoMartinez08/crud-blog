(function(){
	//module that drives <html ng-app="BlogApp"> 
	angular
		.module("BlogApp",[])
		.controller("BlogController", BlogController);

	function BlogController($scope){
		// listens to the createPost handler on the ng-click sent from th UI
		$scope.createPost = createPost;

	function createPost(){
		console.log("createPost!!!");
		}
	}
})();
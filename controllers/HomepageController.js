function HomepageController($scope, $location) {
	$scope.goToSearch = function(){
		$location.path("/search");
	}
}

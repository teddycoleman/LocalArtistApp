  function SearchController ($scope, $http, $location) {
	$scope.data = [];

	$http({
    method: 'GET',
    url: 'https://local-artist-api.herokuapp.com/profiles/'
  }).success(function (profiles){
  	angular.forEach(profiles, function(profile){
      $scope.data.push(profile);
    });
  }).error(function(error) {
    console.log(error);
  });
 
	$http({
    method: 'GET',
    url: 'https://local-artist-api.herokuapp.com/showings/'
  }).success(function (data){
  	angular.forEach(data, function(element){
  		$scope.data.push(element);
  	});
  }).error(function(error) {
    console.log(error);
  });

  $scope.goToProfile = function(profileId){
    $location.path("/profiles/" + profileId);
  }

  $scope.goToShowing = function(showingId){
    $location.path("/showings/" + showingId);
  }
}

function ProfileController ($scope, $http, $location) {
	console.log("OK");
	var profileId = $location.path().split('/')[2];
  $scope.images = [];

	$http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/' + profileId + "/photos"
  }).success(function (photos){
    angular.forEach(photos, function(photo){
      $scope.images.push({
        url : 'http://localhost:3000' + photo[1]
      });
    });
  }).error(function(error) {
    console.log(error);
  });

	$http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/' + profileId
  }).success(function (profile){
  	$scope.profile = profile[0];
    $scope.photo_url = profile[1];
  }).error(function(error) {
    console.log(error);
  });

  $http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/' + profileId + "/showings"
  }).success(function (showings){
  	$scope.showings = showings;
  }).error(function(error) {
    console.log(error);
  });

  $scope.goToCreateShowing = function () {
    $location.path("/create_showing/" + profileId );
  }

}

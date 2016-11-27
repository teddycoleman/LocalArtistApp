function ProfileController ($scope, $http, $location) {

	var profileId = $location.path().split('/')[2];

	$http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/' + profileId + "/photos"
  }).success(function (photos){
    angular.forEach(photos, function(photo){
      $scope.images.push({
        url : 'http://localhost:3000' + photo[1]
      });
    });
    $scope.methods.next();
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

  $scope.goToCreateShowing = function() {
    $location.path("/create_showing/" + profileId );
  }

  $scope.goToShowing = function(showingId) {
    $location.path("/showings/" + showingId );
  }

}

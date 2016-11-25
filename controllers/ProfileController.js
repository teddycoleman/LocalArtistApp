function ProfileController ($scope, $http, $location) {
	console.log("OK");
	var profileId = $location.path().split('/')[2];

	$http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/' + profileId + "/photos"
  }).success(function (photos){
  	$scope.photos = photos;
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

	(function() { 
          Galleria.loadTheme('https://cdnjs.cloudflare.com/ajax/libs/galleria/1.4.5/themes/classic/galleria.classic.min.js');
          Galleria.configure({
					    imageCrop: false	,
					    transition: 'fade'
					});
          Galleria.run('.galleria');
      }());

  $scope.goToCreateShowing = function () {
    $location.path("/create_showing/" + profileId );
  }

}

function ProfileController ($scope, $http, $location) {

  var profileId = $location.path().split('/')[2];
	$scope.user_id = parseInt(sessionStorage.getItem('user_id'));
  $scope.editMode = false; 

	$http({
    method: 'GET',
    url: 'https://local-artist-api.herokuapp.com/profiles/' + profileId + "/photos"
  }).success(function (photos){
    angular.forEach(photos, function(photo){
      $scope.images.push({
        url : photo[1]
      });
    });
    $scope.methods.next();
  }).error(function(error) {
    console.log(error);
  });

	$http({
    method: 'GET',
    url: 'https://local-artist-api.herokuapp.com/profiles/' + profileId
  }).success(function (profile){
  	$scope.profile = profile[0];
    $scope.photo_url = profile[1];
    console.log($scope.profile);
  }).error(function(error) {
    console.log(error);
  });

  $http({
    method: 'GET',
    url: 'https://local-artist-api.herokuapp.com/profiles/' + profileId + "/showings"
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

  $scope.edit = function(){
    $scope.editMode = !$scope.editMode;
  }

  $scope.addToGallery = function(){
    $location.path("/" + profileId + "/add_photos/" );
  }

  $scope.saveProfile = function() {
    $http({
      method: "PUT", 
      url: 'https://local-artist-api.herokuapp.com/profiles/' + profileId + '.json',
      data: { profile: $scope.profile },
      headers: {
          Authorization: "Token token=" + sessionStorage.getItem("auth_token")
      }
    }).success(function (profile){
      $scope.profile = profile;
      $scope.edit();
    }).error(function(error) {
      console.log(error);
    });
  } 

  $scope.isShowingsEmpty = function (){
    return angular.equals($scope.showings, {})
  }

}

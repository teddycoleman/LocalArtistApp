function CreateShowingController ($scope, $http, $location) {

  var profileId = $location.path().split('/')[2];

  $scope.data = {
    selectedProfile: null,
    selectedPhoto: null,
    description: null
  }

  $http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/' 
  }).success(function (profiles){
    $scope.profiles = profiles
    console.log(profiles);
  }).error(function(error) {
    console.log(error);
  });

  $http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/' + profileId + '/photos'
  }).success(function (photos){
    $scope.photos = photos
    console.log(photos);
  }).error(function(error) {
    console.log(error);
  });

  $scope.create_showing = function(){

    var data = {
      artist_id: profileId,
      gallery_id: $scope.selectedProfile,
      photo_id: $scope.selectedPhoto,
      description: $scope.description
    };

    $http({
      method: 'POST',
      url: 'http://localhost:3000/profiles/' + profileId + '/showings',
      data: data,
      headers: {
        Authorization: "Token token=" + sessionStorage.getItem("auth_token")
      }
    }).success(function (showing){
      $scope.showing = showing;
      console.log(showing);
    }).error(function(error) {
      console.log(error);
    });
  }

};
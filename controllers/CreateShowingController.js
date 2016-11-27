function CreateShowingController ($scope, $http, $location) {

  $scope.profileId = $location.path().split('/')[2];
  console.log($scope.profileId);

  $scope.data = {
    selectedProfile: null,
    selectedImages: [],
    description: null
  }

  $http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/' + $scope.profileId
  }).success(function (main_profile){
    $scope.main_profile = main_profile;
  }).error(function(error) {
    console.log(error);
  });

  $http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/' 
  }).success(function (profiles){
    $scope.profiles = profiles;
  }).error(function(error) {
    console.log(error);
  });

  $http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/' + $scope.profileId + '/photos'
  }).success(function (photos){
    $scope.photos = photos
  }).error(function(error) {
    console.log(error);
  });

  $scope.create_showing = function(){
    
    var data = {
      artist_id: $scope.isArtist($scope.main_profile) ? $scope.profileId : $scope.selectedProfile, 
      gallery_id: $scope.isArtist($scope.main_profile) ? $scope.selectedProfile : $scope.profileId,
      description: $scope.description
    }

    $http({
      method: 'POST',
      url: 'http://localhost:3000/profiles/' + $scope.profileId + '/showings',
      data: data,
      headers: {
        Authorization: "Token token=" + sessionStorage.getItem("auth_token")
      }
    }).success(function (showing){
      angular.forEach($scope.selectedImages, function(photo){
        var url = 'http://localhost:3000/photos/' + photo[0].id;
        $http({
          method: 'PUT',
          url: url,
          data: {
            photo: {
              showing_id: showing.id
            }
          },
          headers: {  
            Authorization: "Token token=" + sessionStorage.getItem("auth_token")          }
        })
        .success(function (photo){
          console.log(photo)
        }).error(function(error) {
          console.log(error);
        }); 
      });
      $location.path("/showings/" + showing.id)
    }).error(function(error) {
      console.log(error);
    }); 
  }

  $scope.isArtist = function(profile){
    var bool = profile[0].profile_type === 'artist' ? true : false;
    return bool;
  }
};

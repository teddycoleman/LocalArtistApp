function CreateShowingController ($scope, $http, $location) {

  var profileId = $location.path().split('/')[2];

  $scope.data = {
    selectedProfile: null,
    selectedImages: [],
    description: null
  }

  $http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/' 
  }).success(function (profiles){
    $scope.profiles = profiles
  }).error(function(error) {
    console.log(error);
  });

  $http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/' + profileId + '/photos'
  }).success(function (photos){
    $scope.photos = photos
  }).error(function(error) {
    console.log(error);
  });

  $scope.create_showing = function(){
    
    var data = {
      artist_id: profileId,
      gallery_id: $scope.selectedProfile,
      // photo_id: photo[0].id,
      description: $scope.description
    }

    $http({
      method: 'POST',
      url: 'http://localhost:3000/profiles/' + profileId + '/showings',
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
};

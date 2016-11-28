function CreateShowingController ($scope, $http, $location, $q) {

  $scope.profileId = $location.path().split('/')[2];
  $scope.filterId = null;

  $scope.data = {
    selectedProfile: null,
    selectedImages: [],
    description: null
  }

  $scope.getMainProfile = function() {
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: 'https://local-artist-api.herokuapp.com/profiles/' + $scope.profileId
    }).success(function (main_profile){
      $scope.main_profile = main_profile;
      if(main_profile[0].profile_type === 'artist') {
        $scope.filterId = $scope.profileId;
      }
      deferred.resolve(main_profile);
    }).error(function(error) {
      console.log(error);
    });

    return deferred.promise;
  }

  $scope.getAllProfiles = function() {
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: 'https://local-artist-api.herokuapp.com/profiles/' 
    }).success(function (profiles){
      $scope.profiles = profiles;
      deferred.resolve(profiles);
    }).error(function(error) {
      console.log(error);
    });

    return deferred.promise;
  }

  $scope.populatePhotos = function() { 
    console.log($scope.photos);
    if($scope.main_profile[0].profile_type === 'artist'){
      console.log("getting own photos")
      $http({
        method: 'GET',
        url: 'https://local-artist-api.herokuapp.com/profiles/' + $scope.profileId + '/photos'
      }).success(function (photos){
        $scope.photos = photos
      }).error(function(error) {
        console.log(error);
      });
    }
    else {
      console.log("getting other photos");
      $http({
        method: 'GET',
        url: 'https://local-artist-api.herokuapp.com/photos'
      }).success(function (photos){
        $scope.photos = photos
        console.log(photos);
      }).error(function(error) {
        console.log(error);
      });
    }
  }

  $q.all([
    $scope.getMainProfile(),
    $scope.getAllProfiles()
  ]).then(function(data) {
      $scope.populatePhotos();
    }
  );

  $scope.create_showing = function(){
    
    var data = {
      artist_id: $scope.isArtist($scope.main_profile) ? $scope.profileId : $scope.selectedProfile, 
      gallery_id: $scope.isArtist($scope.main_profile) ? $scope.selectedProfile : $scope.profileId,
      description: $scope.description
    }

    $http({
      method: 'POST',
      url: 'https://local-artist-api.herokuapp.com/profiles/' + $scope.profileId + '/showings',
      data: data,
      headers: {
        Authorization: "Token token=" + sessionStorage.getItem("auth_token")
      }
    }).success(function (showing){
      angular.forEach($scope.selectedImages, function(photo){
        var url = 'http://local-artist-api.herokuapp.com/photos/' + photo[0].id;
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

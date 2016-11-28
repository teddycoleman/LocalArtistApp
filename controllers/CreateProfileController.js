function PhotoUploadService(Upload, $location) {
  this.upload = function(profile) {
    Upload.upload({
      url: 'http://localhost:3000/profiles.json',
      data: {
        profile: {
          profile_pic: profile.profile_pic,
          name: profile.name,
          style: profile.style,
          profile_type: profile.profile_type,
          description: profile.description,
          user_id: sessionStorage.getItem("user_id")
        }
      },
      headers: {
        Authorization: "Token token=" + sessionStorage.getItem("auth_token")
      }
    })
    .then(function (profile){
      $location.path("/" + profile.data.id + "/add_photos");
    }, function(resp) {
      console.log(resp);
    });
  }
}

function CreateProfileController ($scope, $http, $location, PhotoUploadService) {
  console.log("here");
  $scope.create_profile = function (){
    console.log("also here");
    PhotoUploadService.upload($scope.profile);
  }
  
  $scope.cancel = function() {
    $location.path("/");
  }
};

function AddPhotosController ($scope, $http, $location, Upload) {
  var profileId = $location.path().split("/")[1];
  $scope.images = [{url:"https://files.graphiq.com/2307/media/images/White_430113_i0.png"}];
  var imageLoaded = false;

  $scope.uploadFiles = function(files, errFiles) {
    $scope.file = files;
    $scope.errFiles = errFiles;

    Upload.upload({
      url: 'https://local-artist-api.herokuapp.com/profiles/' + profileId + '/photos.json',
      data: {
        photo: files
      },
      headers: {
        Authorization: "Token token=" + sessionStorage.getItem("auth_token")
      }
    })
    .then(function (photo){
      if(!imageLoaded){
        imageLoaded = true;
        $scope.images = [];
      }
      $scope.images.push({
        url: 'http://local-artist-api.herokuapp.com' + photo.data[1]
      });
      $scope.methods.next();
    }, function(resp) {
      console.log(resp);
    });
  }

  $scope.cancel = function() {
    $location.path("/");
  }

  $scope.goToProfile = function() {
    $location.path("/profiles/" + profileId);
  }
};

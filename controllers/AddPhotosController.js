function AddPhotosController ($scope, $http, $location, Upload) {
    var profileId = $location.path().split("/")[1];

    $scope.uploadFiles = function(files, errFiles) {
        $scope.file = files;
        $scope.errFiles = errFiles;

        Upload.upload({
            url: 'http://localhost:3000/profiles/' + profileId + '/photos.json',
            data: {
                photo: files
            },
            headers: {
                Authorization: "Token token=" + sessionStorage.getItem("auth_token")
            }
        })
        .then(function (photo){
            console.log(photo);
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

function AddPhotosController ($scope, $http, $location, Upload) {
    var profileId = $location.path().split("/")[1];
    $scope.images = [];

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
            $scope.images.push({
                url: 'http://localhost:3000' + photo.data[1]
            });
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

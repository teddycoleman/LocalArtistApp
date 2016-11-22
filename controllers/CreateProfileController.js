function PhotoUploadService(Upload) {
    this.upload = function(profileId, file) {
        Upload.upload({
            url: 'http://localhost:3000/profiles/' + profileId + '/photos.json',
            data: {
                photo: file
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
}

function CreateProfileController ($scope, $http, $location, PhotoUploadService) {
    $scope.create_profile = function (){
        $http({
            method: 'POST',
            url: 'http://localhost:3000/profiles.json',
            data: { profile: $scope.profile },
            headers: {
                Authorization: "Token token=" + sessionStorage.getItem("auth_token")
            }
        }).success(function (profile){
            PhotoUploadService.upload(profile.id, $scope.profile.photo);
        }).error(function(error) {
            console.log(error);
        });
    }

    $scope.cancel = function() {
        $location.path("/");
    }
};

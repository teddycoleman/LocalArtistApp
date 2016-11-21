angular
  .module('localArtist')
  .controller('CreateProfileController', CreateProfileController);

function CreateProfileController ($scope, $http, $location, Upload) {
	console.log("OK");

	$scope.create_profile = function (){
		console.log($scope.profile);
		console.log($scope.profile.photo)
    $http({
      method: 'POST',
      url: 'http://localhost:3000/profiles.json',
      data: {profile: {
      		profile_type: $scope.profile.profile_type,
      		name: $scope.profile.name,
      		style: $scope.profile.style,
      		description: $scope.profile.description
      	}
      },
      headers: {Authorization: "Token token=" + sessionStorage.getItem("auth_token")}
    }).success(function (profile){
    	console.log(profile);
    	console.log("profile uploaded properly")
    	console.log($scope.profile.photo);
    	$scope.profile.photo.upload = Upload.upload({
        url: 'http://localhost:3000/profiles/' + profile.id + '/photos.json', 
        photo: $scope.profile.photo,
	      headers: {
	      	Authorization: "Token token=" + sessionStorage.getItem("auth_token")
	      }
      })
      .then(function (photo){
      	console.log(photo);
      }, function(resp) {
      	console.log(resp);
      });
    }).error(function(error) {
      alert(error);
    });
	}
	$scope.cancel = function() {
		$location.path("/");
	}
};

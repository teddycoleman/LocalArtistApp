angular
  .module('localArtist')
  .controller('CreateProfileController', CreateProfileController);

function CreateProfileController ($scope, $http, $location, Upload) {
	console.log("OK");

	$scope.create_profile = function (){
		console.log($scope.profile);
		console.log($scope.profile.photo)
		console.log($scope.profile.photo.$valid);
    $http({
      method: 'POST',
      url: 'http://localhost:3000/profiles.json',
      data: { profile: {
      		profile_type: $scope.profile.profile_type,
      		name: $scope.profile.name,
      		style: $scope.profile.style,
      		description: $scope.profile.description
      	}
      },
      headers: {
      	Authorization: "Token token=" + sessionStorage.getItem("auth_token")
      }
    }).success(function (profile){
    	console.log(profile);
    	console.log("profile uploaded properly")
    	console.log($scope.profile.photo);
    	$scope.upload($scope.profile.photo, profile);
    }).error(function(error) {
      console.log(error);
    });
	}
	$scope.cancel = function() {
		$location.path("/");
	}

  $scope.upload = function(file, profile){
  	console.log("type: " + $scope.profile.photo.type);
  	Upload.upload({
      url: 'http://localhost:3000/profiles/' + profile.id + '/photos.json', 
      photo: file,
      headers: {
      	Authorization: "Token token=" + sessionStorage.getItem("auth_token"),
      	'Content-Type': $scope.profile.photo.type
      }
    })
    .then(function (photo){
    	console.log(photo);
    }, function(resp) {
    	console.log(resp);
    });
  }
};

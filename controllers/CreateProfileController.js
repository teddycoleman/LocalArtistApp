angular
  .module('localArtist')
  .controller('CreateProfileController', CreateProfileController);

function CreateProfileController ($scope, $http, $location) {

	$scope.create_profile = function (){
		console.log($scope.profile);
    $http({
      method: 'POST',
      url: 'http://localhost:3000/profiles.json',
      data: {profile: $scope.profile},
      headers: {Authorization: "Token token=" + sessionStorage.getItem("auth_token")}
    }).success(function (profile){
      console.log(profile);
    }).error(function(error) {
      alert(error);
    });
	}
	$scope.cancel = function() {
		$location.path("/");
	}
};

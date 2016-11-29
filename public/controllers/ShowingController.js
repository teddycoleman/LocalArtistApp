function ShowingController ($scope, $http, $location) {
  $scope.images = [];

  $http({
    method: 'GET',
    url: 'https://local-artist-api.herokuapp.com/showings/' + $location.path().split('/')[2]
  }).success(function (showing){
  	$scope.showing = showing
    angular.forEach(showing.photos, function(photo){
      $scope.images.push({
        url : photo[1]
      });
    });
    $scope.methods.next();
  }).error(function(error) {
    console.log(error);
  });

  $scope.goToProfile = function(profileId){
    $location.path("/profiles/" + profileId);
  }
};

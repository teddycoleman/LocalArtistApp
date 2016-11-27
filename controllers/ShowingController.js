function ShowingController ($scope, $http, $location) {
  $scope.images = [];

  $http({
    method: 'GET',
    url: 'http://localhost:3000/showings/' + $location.path().split('/')[2]
  }).success(function (showing){
  	$scope.showing = showing
    angular.forEach(showing.photos, function(photo){
      $scope.images.push({
        url : 'http://localhost:3000' + photo[1]
      });
    });
  }).error(function(error) {
    console.log(error);
  });

  $scope.goToProfile = function(profileId){
    $location.path("/profiles/" + profileId);
  }
};

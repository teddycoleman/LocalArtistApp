function ShowingController ($scope, $http, $location) {

  console.log($location.path().split('/')[2]);

  $http({
    method: 'GET',
    url: 'http://localhost:3000/showings/' + $location.path().split('/')[2]
  }).success(function (showing){
  	$scope.showing = showing
    console.log(showing);
  }).error(function(error) {
    console.log(error);
  });

};

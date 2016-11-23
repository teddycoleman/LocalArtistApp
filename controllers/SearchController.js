function SearchController ($scope, $http, $location) {
	console.log("OK");
	$scope.data = [];

	$http({
    method: 'GET',
    url: 'http://localhost:3000/profiles/'
  }).success(function (data){
  	angular.forEach(data, function(element){
      $scope.data.push(element);
    });
    console.log($scope.data)
  }).error(function(error) {
    console.log(error);
  });
 
	$http({
    method: 'GET',
    url: 'http://localhost:3000/showings/'
  }).success(function (data){
  	angular.forEach(data, function(element){
  		$scope.data.push(element);
  	});
  }).error(function(error) {
    console.log(error);
  });

}

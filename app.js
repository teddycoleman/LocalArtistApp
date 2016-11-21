var app = angular.module("localArtist", ['ngRoute','ngAnimate','ngTouch','ui.bootstrap']); 

app.config(function($routeProvider) {
	$routeProvider
    .when("/create_profile", {
      templateUrl: "templates/create_profile.html",
      controller: "CreateProfileController",
      controllerAs: "createProfileCtrl"
    })
		.when("/", {
			templateUrl: "templates/homepage.html",
			controller: "HomepageController",
			controllerAs: "homepageCtrl"
		})
		.otherwise({
			redirectTo: "/"
		});
});

app.controller("HomepageController", function () {

});

app.controller("NavBarController", function ($scope, $uibModal, $log, $http, $location) {

  $scope.openSignUp = function () {

    var modalInstance = $uibModal.open({
      templateUrl: 'templates/signup_modal.html',
      controller: 'ModalInstanceCtrl',
      scope: $scope,
      resolve: {
        user: function () {
          return $scope.user;
        }
      }
    });

    modalInstance.result.then(
      function (user) {
        $http({
          method: 'POST',
          url: 'http://localhost:3000/users.json',
          data: {user: user}
        }).success(function (user){
          sessionStorage.setItem("auth_token", user.auth_token);
        }).error(function(error) {
          Alert("Error creating user!");
        });
      }
    );
  };

  $scope.openLogin = function () {

    var modalInstance = $uibModal.open({
      templateUrl: 'templates/login_modal.html',
      controller: 'ModalInstanceCtrl',
      scope: $scope,
      resolve: {
        user: function () {
          return $scope.user;
        }
      }
    });

    modalInstance.result.then(
      function (user) {
        $http({
          method: 'POST',
          url: 'http://localhost:3000/users/sign_in.json',
          data: {user: user}
        }).success(function (user){
          sessionStorage.setItem("auth_token", user.auth_token);
        }).error(function(error) {
          Alert("Error creating user!");
        });
      }
    );
  };

  $scope.logout = function(){
    sessionStorage.removeItem("auth_token");
  }

  $scope.goToCreateProfile = function(){
    $location.path("/create_profile");
  } 

  $scope.isSignedIn = function(){
    return sessionStorage.getItem("auth_token") ? true : false;
  }

});

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, user) {

  $scope.ok = function () {
    $uibModalInstance.close($scope.user);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('CreateProfileController', function () {

});



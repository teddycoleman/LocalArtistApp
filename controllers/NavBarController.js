function NavBarController ($scope, $uibModal, $log, $http, $location) {

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

};

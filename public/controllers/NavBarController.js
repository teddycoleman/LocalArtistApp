function NavBarController ($scope, $uibModal, $log, $http, $location, $route) {

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
          url: 'https://local-artist-api.herokuapp.com/users.json',
          data: {user: user}
        }).success(function (user){
          sessionStorage.setItem("auth_token", user.auth_token);
          sessionStorage.setItem("user_id", user.id);
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
          url: 'https://local-artist-api.herokuapp.com/users/sign_in.json',
          data: {user: user}
        }).success(function (user){
          sessionStorage.setItem("auth_token", user.auth_token);
          sessionStorage.setItem("user_id", user.id);
          $route.reload();
        }).error(function(error) {
          Alert("Error creating user!");
        });
      }
    );
  };

  $scope.logout = function(){
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("user_id");
    $route.reload();
  }

  $scope.goToCreateProfile = function(){
    $location.path("/create_profile");
  }

  $scope.goToSearch = function(){
    $location.path("/search");
  }

  $scope.isSignedIn = function(){
    return sessionStorage.getItem("auth_token") ? true : false;
  }

};

function ModalInstanceCtrl ($scope, $uibModalInstance, user) {

  $scope.ok = function () {
    $uibModalInstance.close($scope.user);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};

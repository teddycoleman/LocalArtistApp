var app = angular.module('localArtist', ['ngRoute','ngAnimate','ngTouch','ui.bootstrap','ngFileUpload'])
	.controller('CreateProfileController', CreateProfileController)
	.controller('HomepageController', HomepageController)
	.controller('NavBarController', NavBarController)
	.controller('ModalInstanceCtrl', ModalInstanceCtrl)
	.service('PhotoUploadService', PhotoUploadService);

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

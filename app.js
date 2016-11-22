var app = angular.module('localArtist', ['ngRoute','ngAnimate','ngTouch','ui.bootstrap','ngFileUpload']); 

app.config(function($routeProvider) {
	$routeProvider
    .when("/create_profile", {
      templateUrl: "templates/create_profile.html",
      controller: "CreateProfileController",
      controllerAs: "createProfileCtrl"
    })
    .when("/profiles/:id", {
      templateUrl: "templates/profile.html",
      controller: "ProfileController",
      controllerAs: "profileCtrl"
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


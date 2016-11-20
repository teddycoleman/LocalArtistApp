var app = angular.module("userApp", ["ngRoute"])

app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "templates/homepage.html",
			controller: "HomepageController",
			controllerAs: "homepageCtrl"
		})
		.otherwise({
			redirectTo: "/"
		});
});



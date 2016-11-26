var app = angular.module('localArtist', ['ngRoute','ngAnimate','ngTouch','ui.bootstrap','ngFileUpload','thatisuday.ng-image-gallery'])
	.controller('CreateProfileController', CreateProfileController)
	.controller('HomepageController', HomepageController)
	.controller('NavBarController', NavBarController)
  .controller('ModalInstanceCtrl', ModalInstanceCtrl)
	.controller('ProfileController', ProfileController)
  .controller('AddPhotosController', AddPhotosController)
  .controller('ShowingController', ShowingController)
  .controller('CreateShowingController', CreateShowingController)
  .controller('SearchController', SearchController)
	.service('PhotoUploadService', PhotoUploadService);

app.config(function($routeProvider) {
	$routeProvider
    .when("/create_showing/:id", {
      templateUrl: "templates/create_showing.html",
      controller: "CreateShowingController",
      controllerAs: "createShowingCtrl"
    })
    .when("/showings/:id", {
      templateUrl: "templates/showing.html",
      controller: "ShowingController",
      controllerAs: "showingCtrl"
    })
    .when("/search", {
      templateUrl: "templates/search.html",
      controller: "SearchController",
      controllerAs: "searchCtrl"
    })
    .when("/create_profile", {
      templateUrl: "templates/create_profile.html",
      controller: "CreateProfileController",
      controllerAs: "createProfileCtrl"
    })
    .when("/:profile_id/add_photos", {
      templateUrl: "templates/add_photos.html",
      controller: "AddPhotosController",
      controllerAs: "addPhotosCtrl"
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

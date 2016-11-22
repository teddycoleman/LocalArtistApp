angular
  .module('localArtist')
  .controller('ProfileController', ProfileController);

function ProfileController ($scope, $http, $location) {
	console.log("OK");

	(function() { 
          Galleria.loadTheme('https://cdnjs.cloudflare.com/ajax/libs/galleria/1.4.5/themes/classic/galleria.classic.min.js');
          Galleria.run('.galleria');
      }());
}

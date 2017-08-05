/**
 * SVG Iconsets for Angular Material Design 
 * by https://github.com/nkoterba/material-design-iconsets
 */

angular.module('placeApp', ['ngAnimate', 'ngRoute', 'ngResource', 'placesServices', 'ngMaterial', 'ngMessages', 'geolocation', 'lfNgMdFileInput'])

.config(function($mdIconProvider) {
  $mdIconProvider
    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
})
	.config(function($routeProvider, $locationProvider, $httpProvider) {

		// $httpProvider.interceptors.push('tokenInterceptor');
		
		$routeProvider.when('/places', {
			templateUrl: 'partials/places-list.html',
			controller:	'PlacesController'        
		});		
		
		$routeProvider.when('/places/new', {
			templateUrl: 'partials/places-save.html',
			controller: 'PlaceController'
		});	
		
		$routeProvider.when('/places/query', {
			templateUrl: 'partials/places-query.html',
			controller: 'PlaceQueryController'
		});				
		
		$routeProvider.otherwise({redirectTo: '/places/query'});

	});
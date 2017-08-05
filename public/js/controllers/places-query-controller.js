angular.module('placeApp')
	.controller('PlaceQueryController', function($scope, $http, $timeout, geolocation, placeResource, $routeParams, PersistePlaces) {

		$scope.places = [];
		$scope.mensagem = '';
		$scope.formQuery = {};
		
		var queryBody = {};

		// GET Geolocation using HTML5 API
		geolocation.getLocation().then(function(data){
			coords = {lat:data.coords.latitude, long:data.coords.longitude};
			
			$scope.formQuery.longitude = parseFloat(coords.long).toFixed(3);
			$scope.formQuery.latitude = parseFloat(coords.lat).toFixed(3);
		});
					
		// SUBMIT QUERY
		$scope.submitForm = function() {			
			console.log($scope.formQuery);		

			queryBody = {
				longitude: parseFloat($scope.formQuery.longitude),
				latitude: parseFloat($scope.formQuery.latitude),
				distance: parseFloat($scope.formQuery.distance),
				locationName: $scope.formQuery.locationName,
				city: $scope.formQuery.city
			};			

			console.log(queryBody);

			$http.post('/v1/places/query', queryBody)
			.then(function(result) {				
				console.log(JSON.stringify(result.data));
				
				$scope.places = result.data;

			}, function(error) {	
				console.log('Error'); 			
				$scope.mensagem = error;
			});								

		};
	});
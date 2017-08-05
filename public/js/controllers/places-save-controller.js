angular.module('placeApp')
	.controller('PlaceController', function($scope, $http, $timeout, placeResource, $routeParams, PersistePlaces) {

		$scope.place = {};
		$scope.mensagem = '';
		$scope.latitude = '';
		$scope.longitude = '';
	
		
		if($routeParams.placeId) {
			placeResource.get({placeId: $routeParams.placeId}, function(place) {
				$scope.place = place; 
			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter a place'
			});
		}

		// SENDING FORM TO SERVER
		$scope.submitForm = function() {
			console.log('SUMBMETER');
			console.log($scope.place);

		if ($scope.placeForm.$valid) {
			$scope.place.coordinates = [$scope.latitude, $scope.longitude];

			PersistePlaces.cadastrar($scope.place)
			.then(function(dados) {
				$scope.mensagem = dados.mensagem;
				if (dados.inclusao) $scope.place = {};
			})
			.catch(function(erro) {
				$scope.mensagem = erro.mensagem;
			});
		}
						

		// UPLOAD FILE
		$scope.$watch('files.length',function(newVal,oldVal){
            console.log($scope.files);
		});	
					
/**		
			var formData = new FormData();			
			angular.forEach($scope.files,function(obj){
				if(!obj.isRemote){
					formData.append('files[]', obj.lfFile);	
				}
			});

			$http.post('/v1/places/upload', formData, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			}).then(function(result){
				// TODO		

			},function(err){				
				console.log(err);
				$scope.mensagem = err;
			});
**/			

		};
	});
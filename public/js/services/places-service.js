angular.module('placesServices', ['ngResource'])
	.factory('placeResource', function($resource) {

		return $resource('/v1/places/:placeId', null, {
			'update' : { 
				method: 'PUT'
			}
		});
	})
	.factory("PersistePlaces", function(placeResource, $q) {
		var service = {};
		service.cadastrar = function(place) {
			return $q(function(resolve, reject) {

				if(place._id) {
					placeResource.update({placeId: place._id}, place, function() {
						resolve({
							mensagem: 'PLACE ' + place.locationName + ' atualizada com sucesso',
							inclusao: false
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Não foi possível atualizar a place ' + place.locationName
						});
					});

				} else {
					placeResource.save(place, function() {
						resolve({
							mensagem: 'PLACE ' + place.locationName + ' incluída com sucesso',
							inclusao: true
						});
					}, function(erro) {
						alert(erro);
						reject({
							mensagem: erro
						});
					});
				}
			});
		};
		return service;
    });
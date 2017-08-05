module.exports = function(app) {
	
	var api = app.api.place;

	app.route('/v1/places')
		.get(api.lista)
		.post(api.adiciona);

	app.route('/v1/places/query')		
		.post(api.consultaDetalhada);		

	app.route('/v1/places/:id')
		.get(api.buscaPorId)
		.delete(api.removePorId)
		.put(api.atualiza);

	app.route('/v1/places/upload')		
		.post(api.upload);		

};
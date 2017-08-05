var mongoose = require('mongoose');

var formidable = require('formidable');

module.exports = function(app) {

	var api = {};

	var model = mongoose.model('Place');

	api.lista = function(req, res) {

		model.find()
		.then(function(place) {
			res.json(place);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});
	};

	api.buscaPorId = function(req, res) {

		model.findById(req.params.id)
		.then(function(place) {
			if (!place) throw new Error('place não encontrada');
			res.json(place);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});
	};

	api.removePorId = function(req, res) {

		model.remove({'_id' : req.params.id})
		.then(function() {
			res.sendStatus(200);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});

	};

	api.adiciona = function(req, res) {

		model.create(req.body)
		.then(function(place) {
			res.json(place);
		}, function(error) {			
			console.log(error);
			// res.sendStatus(500);
			res.status(500).send(error);			
		});
	};

	api.atualiza = function(req, res) {

		model.findByIdAndUpdate(req.params.id, req.body)
		.then(function(place) {
			res.json(place);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		})
	};
	
	api.consultaDetalhada = function(req, res){
						
		var distance        = req.body.distance;
		var locationName    = req.body.locationName;
		var city            = req.body.city;

        var lat             = req.body.latitude;
        var long            = req.body.longitude;              
		
        var queryPlace = model.find({});
        
        if(distance){   

            queryPlace = queryPlace.where('coordinates').near({ center: {type: 'Point', coordinates: [long, lat]},                
                maxDistance: distance * 1609.34, spherical: true});

        }
        
        if(locationName){
            queryPlace = queryPlace.where('locationName').equals(locationName);
		}
		
        if(city){
            queryPlace = queryPlace.where('city').equals(city);
        }
        		                
        queryPlace.exec(function(err, places){
            if(err)
                res.send(err);
            else                
                res.json(places);
        });		
	};
	

	api.upload = function(req, res) {
		console.log('##### api.upload - req.body ####');
		console.log(req.body);

		var form = new formidable.IncomingForm();
        form.uploadDir = __dirname +'/public/uploads';
        //file upload path
        form.parse(req, function(err, fields, files) {
            //you can get fields here
        });
        form.on ('fileBegin', function(name, file){
            file.path = form.uploadDir + "/" + file.name;
            //modify file path
        });
        form.on ('end', function(){
            res.sendStatus(200);
            //when finish all process    
        });					
	};	

	return api;
};


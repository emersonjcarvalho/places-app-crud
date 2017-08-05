var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var PlaceSchema = new Schema({
	locationName: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	photos: {
		type: [String],
		required: false
	},	
	zipCode: {
		type: String,
		required: false
	},
	province: {
		type: String,
		required: false
	},	
	country: {
		type: String,
		required: false
	},
	city: {
		type: String,
		required: false
	},
	address: {
		type: String,
		required: false
	},
	coordinates: {
		type: [Number],
		required: false
	}
});

PlaceSchema.index({coordinates: '2dsphere'});

mongoose.model('Place', PlaceSchema);



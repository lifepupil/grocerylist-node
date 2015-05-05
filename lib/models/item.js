'use strict';

var Mongoose = require('mongoose');

var itemSchema = Mongoose.Schema({
	name: {type: String, required: true},
	quantity: {type: Number, required: true},
	aisle: {type:String},
	pickedUp: {type: Boolean, required: true, default: false},
	priority: {type: String},
	photo: {type: String},
	createdAt: {type: Date, required: true, default: Date.now},
	userId: {type: Mongoose.Schema.ObjectId, ref: 'User', required: true}
});

var Item = Mongoose.model('Item', itemSchema);
module.exports = Item;

'use strict';

var Item = require('../../models/item');
var Joi = require('joi');

exports.register = function(server, options, next) {
	server.route({
		method: 'PUT',
		path: '/items/{itemId}',
		config: {
			description: 'Edit item in grocery list',
			// validate: {
			// 	params: {
			// 		itemId: Joi.string().length(24)
			// 	}
			// },
			handler: function(request, reply) {
				// console.log('item ID', request.params.itemId);
				console.log('qty', request.payload.quantity);
				Item.findOne({_id: request.params.itemId, userId: request.auth.credentials._id}, function(err, item){

					if(err){
						return reply().code(400);
					}
					item.name = request.payload.name;
					item.quantity = request.payload.quantity;
					item.aisle = request.payload.aisle;
					item.priority = request.payload.priority;
					item.pickedUp = request.payload.pickedUp;
					item.createdAt = request.payload.createdAt;
					item.photo = request.payload.photo;

					item.save(function(){
						return reply(item);
					})
				});
			}
		}
	});

	return next();

};

exports.register.attributes = {
	name: 'items.edit'
};

'use strict';

var Item = require('../../models/item');
var Joi = require('joi');

exports.register = function(server, options, next) {
	server.route({
		method: 'POST',
		path: '/items',
		config: {
			description: 'Add items to grocery list',
			// validate: {
			// 	payload: {
			// 		name: Joi.string().min(3),
			// 		quantity: Joi.number().required().min(3),
			// 		aisle: Joi.string(),
			// 		pickedUp: Joi.boolean(),
			// 		priority: Joi.string(),
			// 		photo: Joi.string(),
			// 		createdAt: Joi.date()
			// 	}
			// },
			handler: function(request, reply) {
				var item = new Item(request.payload);
				item.userId = request.auth.credentials._id;
				// console.log('this is the error function');
				item.save(function(err){
					return reply(item);
				});

			}
		}

	});

	return next();

};

exports.register.attributes = {
	name: 'items.create'
};

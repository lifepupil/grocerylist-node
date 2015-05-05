'use strict';

var Item = require('../../models/item');
var Joi = require('joi');

exports.register = function(server, options, next) {
	server.route({
		method: 'PUT',
		path: '/items/{itemId}',
		config: {
			description: 'Edit item in grocery list',
			validate: {
				params: {
					itemId: Joi.string().length(24)
				}
			},
			handler: function(request, reply) {
				// console.log('item ID', request.params.itemId);
				console.log('request payload', request.payload);
				Item.findByIdAndUpdate(request.params.itemId, request.payload, function(err, item){
					if(err){
						return reply(JSON.stringify(err)).code(400);
					}else{
						return reply(item);
					}
				});
			}
		}
	});

	return next();

};

exports.register.attributes = {
	name: 'items.edit'
};

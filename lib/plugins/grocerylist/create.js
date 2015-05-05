'use strict';

var Item = require('../../models/item');
// var Joi = require('joi');

exports.register = function(server, options, next) {
	server.route({
		method: 'POST',
		path: '/items',
		config: {
			description: 'Add items to grocery list',
			// validate shit goes here
			handler: function(request, reply) {
				var item = new Item(request.payload);
				item.userId = request.auth.credentials._id;
				item.save(function(){
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

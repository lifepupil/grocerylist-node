'use strict';

var Item = require('../../models/item');

exports.register = function(server, options, next) {
	server.route ({
		method: 'GET',
		path: '/items',
		config: {
			description: 'Retrieve grocery list items',
			handler: function(request, reply) {
				console.log('Credentials: ', request.auth.credentials);
				Item.find({userId: request.auth.credentials._id}, function(err, items) {
					return reply({items: items});
				});
			}
		}
	});
	return next();
};

exports.register.attributes =  {
	name: 'items.index'
}

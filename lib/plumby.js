
/**
 * Module dependencies.
 * @api private
 */

var Plumby = require('./app');


/**
 * Plumby types.
 * @type {Object}
 * @api private
 */

var types = {};


/**
 * Expose 'Plumby'.
 */

exports = module.exports = function(type) {
	if(type) {
		var app = new Plumby();

	}
	return new Plumby();
};

//inject to extend app with some 'uses'


exports.inject = function(type, mixin) {
	types[type] = [mixin];
};

function mixin() {
	
}
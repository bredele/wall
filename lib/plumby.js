
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
	var app = new Plumby();
	var from = types[type];
	if(from) {
		mixin(app, from[0]);
	}
	return app;
};

//inject to extend app with some 'uses'


exports.inject = function(type, mixin) {
	types[type] = [mixin];
};


/**
 * mixin.
 * @api private
 */

function mixin(to, from) {
  for (var key in from) {
    if (from.hasOwnProperty(key)) {
      to[key] = from[key];
    }
  }
  return to;
}
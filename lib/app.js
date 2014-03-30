
/**
 * Module dependencies.
 * @api private
 */

var Emitter = require('component-emitter');


/**
 * Expose 'Plumby'
 */

module.exports = Plumby;


/**
 * Plumby constructor.
 * @api public
 */

function Plumby() {
	this.route = '';
}


//inherits from emitter

Emitter(Plumby.prototype);


Plumby.prototype.use = function() {
	
};

Plumby.prototype.config = function() {
	
};

Plumby.prototype.pipe = function() {
	
};
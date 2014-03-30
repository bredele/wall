
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
	this.route = '/';
}


//inherits from emitter

Emitter(Plumby.prototype);


Plumby.prototype.use = function(name, app) {
	if(app) {
		var path = (this.route === '/') ? '' : '/';
		app.route = this.route + path + name;
	} else {
		name.route = this.route;
	}
};

Plumby.prototype.config = function() {
	
};

Plumby.prototype.pipe = function() {
	
};
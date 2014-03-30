
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


/**
 * Plumb apps together and
 * set routes.
 * example:
 *
 *   .use(child);
 *   .use('name', child);
 *   
 * @param  {String | Plumby} name 
 * @param  {Plumby} app 
 * @return {this}
 * @api public
 */

Plumby.prototype.use = function(name, app) {
	if(app) {
		var path = (this.route === '/') ? '' : '/';
		app.route = this.route + path + name;
		this.emit('mount', app, name);
		this.emit('mount ' + name, app);
	} else {
		name.route = this.route;
		this.emit('mount', name);
	}
	return this;
};

Plumby.prototype.config = function() {
	
};

Plumby.prototype.pipe = function() {
	
};
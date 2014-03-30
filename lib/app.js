
/**
 * Module dependencies.
 * @api private
 */

var Emitter = require('component-emitter');
var Store = require('store-component');


/**
 * Expose 'Plumby'
 */

module.exports = Plumby;


/**
 * Plumby constructor.
 * @api public
 */

function Plumby() {
	this.sandbox = new Store();
	this.route = '/';
}


//inherits from emitter

Emitter(Plumby.prototype);


/**
 * Plumb apps together or
 * use middlware.
 * example:
 *
 *   .use(fn);
 *   .use(child);
 *   .use('name', child);
 *   
 * @param  {String | Plumby} name 
 * @param  {Plumby} app 
 * @return {this}
 * @api public
 */

Plumby.prototype.use = function(name, app, options) {
	if(typeof name !== 'function') {
		return this.mount(name, app, options);
	}
	name(this, app);
	return this;
};

/**
 * Mount apps together and
 * set routes.
 * example:
 *
 *   .use(child);
 *   .use('name', child);
 *   
 * @param  {String | Plumby} name 
 * @param  {Plumby} app 
 * @return {this}
 * @api private
 */

Plumby.prototype.mount = function(name, app) {
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

Plumby.prototype.config = function(attr, value) {
	//we could save the config in localstore
	if(!attr) return this.sandbox.data;
	if(typeof attr === 'object') {
		this.sandbox.reset(attr);
		return;
	}
	if(!value) return this.sandbox.get(attr);
	this.sandbox.set(attr, value);
};

Plumby.prototype.pipe = function() {
	
};
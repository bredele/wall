
/**
 * Module dependencies.
 * @api private
 */

var Emitter = require('component-emitter');
var Queue = require('emitter-queue');
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
Queue(Plumby.prototype);


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

Plumby.prototype.mount = function(name, app, options) {
  if(app instanceof Plumby) {
    var path = (this.route === '/') ? '' : '/';
    app.route = this.route + path + name;
    app.config(options);
    this.emit('mount', app, name);
    this.emit('mount ' + name, app);
  } else {
    name.route = this.route;
    name.config(app);
    this.emit('mount', name);
  }
  return this;
};


/**
 * Assigns setting name to value.
 * 
 * @param {String} name
 * @param {Amy} value
 * @return {this}
 * @api public
 */

Plumby.prototype.set = function(name, value) {
  this.sandbox.set(name, value);
  return this;
};


/**
 * Get setting name value.
 * @param  {String} name
 * @return {value}
 * @api public. 
 */

Plumby.prototype.get = function(name) {
  return this.sandbox.get(name);
};


/**
 * Set setting name to true.
 * 
 * @param  {String} name 
 * @return {this}
 * @api public
 */

Plumby.prototype.enable = function(name) {
  return this.set(name, true);
};


/**
 * Set setting name to false.
 * 
 * @param  {String} name 
 * @return {this}
 * @api public
 */

Plumby.prototype.disable = function(name) {
  return this.set(name, false);
};


/**
 * Configuration handler (setter/getter).
 *
 * Example:
 *
 *     app.config(); //return config data
 *     app.config({type:'app'}); //update config data
 *     app.config('type', 'worker'); //set config prop
 *     app.config('type'); //get config prop
 *
 * @param {String | Object | undefined} attr
 * @param {Any} value
 * @api public
 */

Plumby.prototype.config = function(attr, value) {
  //we could save the config in localstore
  if(!attr) return this.sandbox.data;
  if(typeof attr === 'object') {
    this.sandbox.set(attr);
    return;
  }
  if(!value) return this.sandbox.get(attr);
  this.sandbox.set(attr, value);
};


//event middleware, we could pass the channel regexp
//in order to set permission, transform output
//etc
// Plumby.prototype.pipe = function() {
  
// };
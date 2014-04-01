
/**
 * Module dependencies.
 * @api private
 */

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
  var states = this._states = {};
  this.sandbox = new Store();
  this._route = '/';
  this.sandbox.on('change env', function(name) {
    var cb = states[name];
    cb && cb();
  });
}


//override prototype

Plumby.prototype = require('./bus').prototype;


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
    var path = (this._route === '/') ? '' : '/';
    app._route = this._route + path + name;
    app.store(options);
    this.sandbox.emit('mount', app, name);
    this.sandbox.emit('mount ' + name, app);
    app.sandbox.emit('mounted');
  } else {
    name._route = this._route;
    name.store(app);
    this.sandbox.emit('mount', name);
    name.sandbox.emit('mounted');
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
 * Check if setting name is enabled.
 *
 * @param {String} name
 * @return {Boolean} true if enables
 * @api public
 */

Plumby.prototype.enabled = function(name) {
  return this.get(name) ? true : false;
};


/**
 * Check if setting name is disabled.
 *
 * @param {String} name
 * @return {Boolean} true if enables
 * @api public
 */

Plumby.prototype.disabled = function(name) {
  return !this.enabled(name);
};


/**
 * Conditionnaly invoke callback when attribute
 * env changes. Perfect to add states to your app.
 * example:
 *
 *   //all
 *   app.configure(function(){});
 *   
 *   //on super
 *   app.configure('super', function() {
 *     app.enable('admin');
 *   });
 *   app.set('env', 'super');
 *
 * 
 * @param  {String}   name 
 * @param  {Function} cb 
 * @return {this}
 * @api public
 */

Plumby.prototype.configure = function(name, cb) {
  if(typeof name === 'function') name();
  else this._states[name] = cb;
  return this;
};


/**
 * Store handler (setter/getter).
 *
 * Example:
 *
 *     app.store(); //return config data
 *     app.store({type:'app'}); //update config data
 *     app.store('type', 'worker'); //set config prop
 *     app.store('type'); //get config prop
 *
 * @param {String | Object | undefined} attr
 * @param {Any} value
 * @api public
 */

Plumby.prototype.store = function(attr, value) {
  //we could save the config in localstore
  if(!attr) return this.sandbox.data;
  if(!value && typeof attr !== 'object') return this.get(attr);
  return this.set(attr, value);
};


//event middleware, we could pass the channel regexp
//in order to set permission, transform output
//etc
// Plumby.prototype.pipe = function() {
  
// };
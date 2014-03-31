
/**
 * Module dependencies.
 * @api private
 */

var Emitter = require('component-emitter');
//var Queue = require('emitter-queue');
var Store = require('store-component');
var arr = ['on', 'once', 'off'];
var emitter = new Emitter();


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


for(var l = arr.length; l--;) {
  var method = arr[l];
  Plumby.prototype[method] = function() {
    emitter[method].apply(emitter, arguments);
    return this;
  };
}


/**
 * Emit message on communication bus.
 * 
 * @param  {String} topic
 * @return {this}
 * @api public
 */

Plumby.prototype.emit = function(topic) {
  var args = [].slice.call(arguments);
  emitter.emit.apply(emitter, [this._route].concat(args));
  emitter.emit.apply(emitter, [this._route + ' ' + topic].concat(args.splice(1)));
  return this;
};


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
  } else {
    name._route = this._route;
    name.store(app);
    this.sandbox.emit('mount', name);
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
 * @param  {[type]}   name [description]
 * @param  {Function} cb   [description]
 * @return {[type]}        [description]
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
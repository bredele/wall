
/**
 * Module dependencies.
 * @api private
 */

var Emitter = require('component-emitter');
var methods = ['once', 'on', 'off'];
require('emitter-queue')(Emitter.prototype);


var emitter = new Emitter();


/**
 * Bus constructor.
 * @api public
 */

module.exports = Bus;


/**
 * Bus constructor.
 * @api public
 */

function Bus() {}


//bind (should we do a util)

for(var l = methods.length; l--;) {
  var method = methods[l];
  Bus.prototype[method] = function() {
    emitter[method].apply(emitter, arguments);
    return this;
  };
}


/**
 * Dispatch message on communication bus.
 * 
 * @param  {String} topic
 * @return {this}
 * @api public
 */

Bus.prototype.dispatch = function() {
  emitter.emit.apply(emitter, arguments);
};


/**
 * Emit message on communication bus
 * prefixed by app route.
 * 
 * @param  {String} topic
 * @return {this}
 * @api public
 */

Bus.prototype.emit = function(topic) {
  var args = [].slice.call(arguments);
  emitter.emit.apply(emitter, [this._route].concat(args));
  emitter.emit.apply(emitter, [this._route + ' ' + topic].concat(args.splice(1)));
  return this;
};

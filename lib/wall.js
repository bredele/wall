
/**
 * Module dependencies.
 * @api private
 */

var Wall = require('./app');


/**
 * Wall types
 * @type {Object}
 * @api private
 */

var types = {};


/**
 * Expose 'Wall'.
 * @api public
 */

exports = module.exports = function(type) {
  var app = new Wall();
  var from = types[type];
  if(from) {
    var plugs = from.plugs;
    mixin(app, from.mixin);
    for(var i = 0, l = plugs.length; i < l; i++) {
      var plug = plugs[i];
      app.use(plug[0], plug[1]);
    }
  }
  return app;
};


/**
 * App injector. Merge and extend
 * basic wall app.
 * example:
 *
 *   wall.inject('foo', {
 *     custom:function(){
 *       //do something
 *     }
 *   }).use(function(ctx) {
 *     //do something when app is created
 *   });
 *
 *   var app = wall('foo');
 * 
 * @param  {String} type 
 * @param  {Object} mixin [optional]
 * @api public
 */

exports.inject = function(type, obj) {
  var to = types[type] = {};
  to.mixin = obj;
  to.plugs = [];
  return {
    use : function(fn, opts) {
      //is it better to encapsulate opts in a function?
      to.plugs.push([fn, opts]);
      return this;
    }
  };
};

//wait component fix
exports.Emitter = require('component-emitter');
exports.Store = require('datastore');



/**
 * mixin.
 * @api private
 */

function mixin(to, from) {
  for (var key in from) {
    if (from.hasOwnProperty(key) && !to[key]) {
      to[key] = from[key];
    }
  }
  return to;
}
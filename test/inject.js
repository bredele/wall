var wall = require('..');
var assert = require('assert');

describe('Inject > ', function() {

  it('has inject handler', function() {
    assert.equal(typeof wall.inject, 'function');
  });

  describe('Mixin > ', function() {

    it('injects an object with an app ', function(done) {
      wall.inject('foo', {
        custom: done,
        name: 'olivier'
      });

      var app = wall('foo');
      assert(app.custom);
      assert.equal(app.name, 'olivier');
      app.custom();
    });

    it("doesn't overridw wall app handlers", function(done) {
      var used = false;
      wall.inject('bar', {
        custom: done,
        use: function() {
          used = true;
        }
      });
      var app = wall('bar');
      app.use(function() {
        if(!used) done();
      });
    });
    
  });

  describe('Plugins', function() {

    it('injects an app with plugins', function() {
      wall
        .inject('hello')
        .use(function(ctx) {
          ctx.hello = 'hello';
        })
        .use(function(ctx) {
          ctx.hello = ctx.hello + ' world!';
        });

      var app = wall('hello');
      assert.equal(app.hello, 'hello world!');
    });

    it('injects an app with configurable plugin', function() {
      wall
        .inject('name')
        .use(function(ctx, opts) {
          ctx.hello = 'hello ' + opts.name;
        }, {
          name: 'olivier'
        })

      var app = wall('name');
      assert.equal(app.hello, 'hello olivier');
    });
    
  });

});
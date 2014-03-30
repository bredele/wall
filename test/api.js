var plumby = require('..');
var assert = require('assert');

describe('General', function() {

	var app;
	beforeEach(function() {
		app = plumby();
	});

	it('has config handler', function() {
		assert.equal(typeof app.config, 'function');
	});

	it('has get handler', function() {
		assert.equal(typeof app.get, 'function');
	});

	it('has set handler', function() {
		assert.equal(typeof app.set, 'function');
	});

	it('has enable handler', function() {
		assert.equal(typeof app.enable, 'function');
	});

	it('has disable handler', function() {
		assert.equal(typeof app.disable, 'function');
	});

	it('has use handler', function() {
		assert.equal(typeof app.use, 'function');
	});
	
	// it('has pipe handler', function() {
	// 	assert.equal(typeof app.pipe, 'function');
	// });

	it('has route property', function() {
		assert.equal(app.route, '/');
	});
	
});

describe('Emitter', function() {
	
	var app;
	beforeEach(function() {
		app = plumby();
	});

	it('emit', function() {
		assert.equal(typeof app.emit, 'function');
	});

	it('on', function() {
		assert.equal(typeof app.on, 'function');
	});

	it('once', function() {
		assert.equal(typeof app.once, 'function');
	});

	it('off', function() {
		assert.equal(typeof app.off, 'function');
	});

	it('queue', function() {
		assert.equal(typeof app.queue, 'function');
	});

});
var plumby = require('..');
var assert = require('assert');

describe('General', function() {

	var app;
	beforeEach(function() {
		app = plumby();
	});

	it('config handler', function() {
		assert.equal(typeof app.config, 'function');
	});

	it('use handler', function() {
		assert.equal(typeof app.use, 'function');
	});
	
	it('pipe handler', function() {
		assert.equal(typeof app.pipe, 'function');
	});

	it('route property', function() {
		assert(app.route);
	});
	
});

describe('Emitter', function() {
	
	var app;
	beforeEach(function() {
		app = plumby();
	});

	it('emit', function() {
		
	});

	it('on', function() {
		
	});

	it('once', function() {
		
	});

	it('off', function() {
		
	});

});
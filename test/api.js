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

	it('has use handler', function() {
		assert.equal(typeof app.use, 'function');
	});
	
	it('has pipe handler', function() {
		assert.equal(typeof app.pipe, 'function');
	});

	it('has route property', function() {
		assert.equal(typeof app.route, 'string');
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
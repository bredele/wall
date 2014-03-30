var plumby = require('..');
var assert = require('assert');

describe('Mount', function() {

	var app;
	beforeEach(function() {
		app = plumby();
	});

	describe('Routes', function() {

		var child;
		beforeEach(function() {
			child = plumby();
		});

		it('mounts on same route', function() {
			app.use(child);
			assert.equal(child.route, '/');
		});

		it('mounts on same route as parent', function() {
			//route is private
			app.route = '/test';
			app.use(child);
			assert.equal(child.route, '/test');			
		});

		it('mounts with name', function() {
			app.use('child', child);
			assert.equal(child.route, '/child');
		});


	});
	
});
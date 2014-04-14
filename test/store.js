var wall = require('..');
var assert = require('assert');


describe('Store > ', function() {

	var app;
	beforeEach(function() {
		app = wall();
	});

	it('set config', function() {
		app.store({
			name: 'olivier'
		});
		assert.equal(app.store('name'), 'olivier');
	});

	it('set config attribute', function() {
		app.store('project', 'wall');
		assert.equal(app.store('project'), 'wall');
	});

	it('updates config', function() {
		app.store({
			name: 'olivier'
		});
		app.store({
			project: 'wall',
			github: 'bredele'
		});
		assert.equal(app.store('name'), 'olivier');
		assert.equal(app.store('project'), 'wall');
		assert.equal(app.store('github'), 'bredele');
	});

	it('returns config', function() {
		var obj = {
			name: 'olivier'
		};
		app.store(obj);
		assert.deepEqual(app.store(), obj);
	});
	
	it('checks if setting name is enabled', function() {
		assert.equal(app.enabled('hello'), false);
		app.enable('hello');
		assert.equal(app.enabled('hello'), true);
	});
	
});
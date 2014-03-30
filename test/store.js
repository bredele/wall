var plumby = require('..');
var assert = require('assert');


describe('Store > ', function() {

	var app;
	beforeEach(function() {
		app = plumby();
	});

	it('set config', function() {
		app.store({
			name: 'olivier'
		});
		assert.equal(app.store('name'), 'olivier');
	});

	it('set config attribute', function() {
		app.store('project', 'plumby');
		assert.equal(app.store('project'), 'plumby');
	});

	it('updates config', function() {
		app.store({
			name: 'olivier'
		});
		app.store({
			project: 'plumby',
			github: 'bredele'
		});
		assert.equal(app.store('name'), 'olivier');
		assert.equal(app.store('project'), 'plumby');
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
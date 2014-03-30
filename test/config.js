var plumby = require('..');
var assert = require('assert');


describe('Config > ', function() {

	var app;
	beforeEach(function() {
		app = plumby();
	});

	it('set config', function() {
		app.config({
			name: 'olivier'
		});
		assert.equal(app.config('name'), 'olivier');
	});

	it('set config attribute', function() {
		app.config('project', 'plumby');
		assert.equal(app.config('project'), 'plumby');
	});

	it('updates config', function() {
		app.config({
			name: 'olivier'
		});
		app.config({
			project: 'plumby',
			github: 'bredele'
		});
		assert.equal(app.config('name'), 'olivier');
		assert.equal(app.config('project'), 'plumby');
		assert.equal(app.config('github'), 'bredele');
	});

	it('returns config', function() {
		var obj = {
			name: 'olivier'
		};
		app.config(obj);
		assert.deepEqual(app.config(), obj);
	});
	
	
});
var wall = require('..');
var assert = require('assert');


describe('Configure > ', function() {

	var app;
	beforeEach(function() {
		app = wall();
	});

	it('configures app on env', function() {
		app.configure('super', function() {
			app.enable('admin');
		});
		assert(app.disabled('admin'));
		app.set('env', 'super');
		assert(app.enabled('admin'));
	});

	it('configures app on all env', function() {
		app.configure(function() {
			app.enable('chat');
		});
		assert(app.enabled('chat'));
	});
	

});
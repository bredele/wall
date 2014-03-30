var plumby = require('..');
var assert = require('assert');


describe('Configure > ', function() {

	var app;
	beforeEach(function() {
		app = plumby();
	});

	it('configure app on env', function() {
		app.configure('super', function() {
			app.enable('admin');
		});
		assert(app.disabled('admin'));
		app.set('env', 'super');
		assert(app.enabled('admin'));
	});
	

});
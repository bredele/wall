var plumby = require('..');
var assert = require('assert');

describe('Hooks', function() {

	var app, mail;
	beforeEach(function() {
		app = plumby();
		mail = plumby();		
	});

	it('emits mounted on use', function(done) {
		mail.sandbox.on('mounted', done);
		app.use(mail);
	});

	//froze
	it('emits start');
	it('emits stop');

	//asynchronous mode
	it('emits ready');

	//it should be chainable
	it('emits destroy');

});
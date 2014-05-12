
/**
 * Test dependencies.
 */

var wall = require('..');
var assert = require('assert');


describe('Events > ', function() {

	var app, chat, mail, admin;
	beforeEach(function() {
		app = wall();
		chat = wall();
		mail = wall();
		admin = wall();
		app.use(admin);
		app.use('chat', chat);
		app.use('mail', mail);
	});

	describe('dispatch > ', function() {

		it('dispatches message among apps', function() {
			var called = 0;
			chat.on('mail.new', function() {
				called++;
			});
			mail.dispatch('mail.new');
			mail.dispatch('mail.new');
			assert.equal(called, 2);
		});

	});

	describe('emit > ', function() {

		it('emits message prefixed by app route', function(done) {
			chat.once('/mail new', function() {
				console.log('called');
				done();
			});
			mail.emit('new');
		});

		//QUESTION: from admin it'll be / new ...we could clean that up
		it('emits message from a route', function(done) {
			chat.once('/mail', function(msg) {
				if(msg === 'new') done();
			});
			mail.emit('new');
		});

	});

	it('queue events');
	it('get events from');
	it('emit events to');
	it('pipes events');	

});

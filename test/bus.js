var plumby = require('..');
var assert = require('assert');

describe('Events', function() {

	var app, chat, mail, admin;
	beforeEach(function() {
		app = plumby();
		chat = plumby();
		mail = plumby();
		admin = plumby();
		app.use(admin);
		app.use('chat', chat);
		app.use('mail', mail);
	});

	describe('dispatch', function() {

		it('dispatches message among apps', function(done) {
			chat.on('mail.new', function() {
				done();
			});
			mail.dispatch('mail.new');
		});

	});

	describe('emit', function() {

		it('emits message prefixed by app route', function(done) {
			chat.on('/mail new', function() {
				done();
			});
			mail.emit('new');
		});

		//QUESTION: from admin it'll be / new ...we could clean that up
		it('emits message from a route', function(done) {
			chat.on('/mail', function(msg) {
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

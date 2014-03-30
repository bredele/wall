var plumby = require('..');
var assert = require('assert');

describe('Mount', function() {

	var app;
	beforeEach(function() {
		app = plumby();
	});

	describe('Routes', function() {

		var mail;
		beforeEach(function() {
			mail = plumby();
		});

		it('mounts app on same route', function() {
			app.use(mail);
			assert.equal(mail.route, '/');
		});

		it('mounts app on same route as parent app', function() {
			//route is private
			app.route = '/test';
			app.use(mail);
			assert.equal(mail.route, '/test');			
		});

		it('mounts app with name', function() {
			app.use('mail', mail);
			assert.equal(mail.route, '/mail');
		});

		describe('nested', function() {

			var chat;
			beforeEach(function() {
				chat = plumby();
			});

			it('mount nested apps', function() {
				app.use('mail', mail);
				mail.use('chat', chat);
				assert.equal(chat.route, '/mail/chat');
			});
			


		});

	});
	
});
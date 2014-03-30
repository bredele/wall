var plumby = require('..');
var assert = require('assert');

describe('Mount > ', function() {

	var app;
	beforeEach(function() {
		app = plumby();
	});

	describe('Routes >', function() {

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

			var chat, admin;
			beforeEach(function() {
				chat = plumby();
				admin = plumby();
			});

			it('mount nested apps', function() {
				app.use('mail', mail);
				mail.use('chat', chat);
				mail.use('admin', admin);
				assert.equal(chat.route, '/mail/chat');
				assert.equal(admin.route, '/mail/admin');				
			});

		});

	});

	describe('Events > ', function() {

		var plugin;
		beforeEach(function() {
			plugin = plumby();
		});

		it('emits mount event', function(done) {
			app.on('mount', function(ref) {
				if(ref === plugin) done();
			});
			app.use(plugin);
		});

		it('emits mount event with name', function(done) {
			app.on('mount', function(ref, name) {
				if(name === 'plugin') done();
			});
			app.use('plugin',plugin);
		});

	});
	
});
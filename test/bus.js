var plumby = require('..');
var assert = require('assert');

describe('Events', function() {

	var app, chat, mail;
	beforeEach(function() {
		app = plumby();
		chat = plumby();
		mail = plumby();
		app.use('chat', chat);
		app.use('mail', mail);
	});

	//NOTE: should initialize bus only on start
	it('emits and listen messages', function(done) {
		mail.on('/chat', function(msg) {
			if(msg === 'hello') done();
		});
		chat.emit('hello');
	});

	// it('qq', function(done) {
	// 	mail.from('chat').on('haha', function() {
	// 		done();
	// 	});
	// 	chat.to('mail').emit('haha');
	// });
	

});

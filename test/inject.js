var plumby = require('..');
var assert = require('assert');

describe('Inject > ', function() {

	it('has inject handler', function() {
		assert.equal(typeof plumby.inject, 'function');
	});

	describe('Mixin > ', function() {

		it('injects an object with an app ', function(done) {
			plumby.inject('foo', {
				custom: done,
				name: 'olivier'
			});

			var app = plumby('foo');
			assert(app.custom);
			assert.equal(app.name, 'olivier');
			app.custom();
		});
		
	});
	
});
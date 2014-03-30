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

		it("doesn't overrid plumby app handlers", function(done) {
			var used = false;
			plumby.inject('bar', {
				custom: done,
				use: function() {
					used = true;
				}
			});
			var app = plumby('bar');
			app.use(function() {
				if(!used) done();
			});
		});
		
	});
	
});
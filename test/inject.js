var plumby = require('..');
var assert = require('assert');

describe('Inject', function() {

	it('has inject handler', function() {
		assert.equal(typeof plumby.inject, 'function');
	});
	
});
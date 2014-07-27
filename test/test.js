var assert = require('assert')
  , mesh = require('..');

describe('MeSH Tree', function(){
  it('should return Tree Number id given a MeSH term', function(){
    assert.equal(mesh['Pacific Ocean'], 'Z01.756.700' );
  });
});

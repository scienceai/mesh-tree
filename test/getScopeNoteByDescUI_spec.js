var assert = require('assert')
  , meshTreeFuncs = require('../index.js')
  , co = require('co');

// getScopeNoteByDescUI
describe('get scope note for descriptor UI', function () {
  describe('D000001', function () {
    it('should return the scope note for concept Calcimycin', function (done) {
      co(meshTreeFuncs.getScopeNoteByDescUI('D000001')).then(function (result) {
        console.log(result);
        assert.equal(result.length>10, true);
        done();
      });
    })
  })
  describe('D009369', function () {
    it('should return the scope note for concept Neoplasms', function (done) {
      co(meshTreeFuncs.getScopeNoteByDescUI('D009369')).then(function (result) {
        console.log(result);
        assert.equal(result.length>10, true);
        done();
      });
    })
  })
  describe('D005138', function () {
    it('should return the scope note for concept Eyebrows', function (done) {
      co(meshTreeFuncs.getScopeNoteByDescUI('D005138')).then(function (result) {
        console.log(result);
        assert.equal(result.length>10, true);
        done();
      });
    })
  })
});
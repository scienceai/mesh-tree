var assert = require('assert')
  , meshTreeFuncs = require('../index.js')
  , co = require('co');

// getParentDescUIsForDescUI
describe('get parent descriptor UIs for a descriptor UI', function () {
  describe('D000001', function () {
    var resultExpected = ['D001583'];
    it('should return single parent desc UI: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getParentDescUIsForDescUI('D000001')).then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = [];
    it('should return no desc UIs (top level): ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getParentDescUIsForDescUI('D009369')).then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = ['D006197', 'D005123'];
    it('should return two parent desc UIs: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getParentDescUIsForDescUI('D005138')).then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
});
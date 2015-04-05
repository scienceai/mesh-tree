var assert = require('assert')
  , meshTreeFuncs = require('../index.js')
  , co = require('co');

// getTreeNumbersByDescUI
describe('get tree numbers by UI', function () {
  describe('D000001', function () {
    var resultExpected = ['D03.438.221.173'];
    it('should return correct single tree number: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getTreeNumbersByDescUI('D000001')).then(function (result) {
        assert.deepEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = ['C04'];
    it('should return correct single tree number: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getTreeNumbersByDescUI('D009369')).then(function (result) {
        assert.deepEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = ['A01.456.505.420.338', 'A17.360.296'];
    it('should return correct multiple tree numbers: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getTreeNumbersByDescUI('D005138')).then(function (result) {
        assert.deepEqual(result, resultExpected);
        done();
      });
    })
  })
});
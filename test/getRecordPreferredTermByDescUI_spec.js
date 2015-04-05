var assert = require('assert')
  , meshTreeFuncs = require('../index.js')
  , co = require('co');

// getRecordPreferredTermByDescUI
describe('get record preferred term by UI', function () {
  describe('D000001', function () {
    var resultExpected = 'Calcimycin';
    it('should return: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getRecordPreferredTermByDescUI('D000001')).then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = 'Neoplasms';
    it('should return: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getRecordPreferredTermByDescUI('D009369')).then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = 'Eyebrows';
    it('should return: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getRecordPreferredTermByDescUI('D005138')).then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
});
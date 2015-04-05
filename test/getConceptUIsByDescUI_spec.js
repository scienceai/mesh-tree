var assert = require('assert')
  , meshTreeFuncs = require('../index.js')
  , co = require('co');

// getConceptUIsByDescUI
describe('get all concept UIs contained by descriptor record UI', function () {
  describe('D000001', function () {
    var resultExpected = ['M0353609', 'M0000001'];
    it('should return correct concept UIs: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getConceptUIsByDescUI('D000001')).then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = ['M0014584', 'M0014585', 'M0014586'];
    it('should return correct concept UIs: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getConceptUIsByDescUI('D009369')).then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = ['M0008101'];
    it('should return correct concept UIs: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getConceptUIsByDescUI('D005138')).then(function (result) {
        assert.deepEqual(result, resultExpected);
        done();
      });
    })
  })
});
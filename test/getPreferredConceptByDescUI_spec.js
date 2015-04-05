
// getPreferredConceptByDescUI
describe('get preferred concept UI for descriptor record UI', function () {
  describe('D000001', function () {
    var resultExpected = 'M0000001';
    it('should return correct concept UI: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getPreferredConceptByDescUI('D000001')).then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = 'M0014585';
    it('should return correct concept UIs: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getPreferredConceptByDescUI('D009369')).then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = 'M0008101';
    it('should return correct concept UIs: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getPreferredConceptByDescUI('D005138')).then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
});
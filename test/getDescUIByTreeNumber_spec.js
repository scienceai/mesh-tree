
// getDescUIByTreeNumber
describe('get descriptor UI for tree number', function () {
  describe('D03.438.221.173', function () {
    var resultExpected = 'D000001';
    it('should return descriptor record UI: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getDescUIByTreeNumber('D03.438.221.173')).then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('C04', function () {
    var resultExpected = 'D009369';
    it('should return descriptor record UI: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getDescUIByTreeNumber('C04')).then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('A17.360.296', function () {
    var resultExpected = 'D005138';
    it('should return descriptor record UI: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getDescUIByTreeNumber('A17.360.296')).then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('A01.456.505.420.338', function () {
    var resultExpected = 'D005138';
    it('should return descriptor record UI: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getDescUIByTreeNumber('A01.456.505.420.338')).then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
});
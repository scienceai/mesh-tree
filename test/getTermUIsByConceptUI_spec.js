
// getTermUIsByConceptUI
describe('get all term UIs contained by a concept UI', function () {
  describe('M0353609', function () {
    var resultExpected = ['T000003', 'T000004', 'T000001'];
    it('should return correct term UIs: ' + resultExpected.toString(), function (done) {
      meshTree.getTermUIsByConceptUI('M0353609').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('M0000012', function () {
    var resultExpected = ['T000024', 'T000025', 'T365903', 'T811395', 'T646365', 'T751239', 'T365904'];
    it('should return correct term UIs: ' + resultExpected.toString(), function (done) {
      meshTree.getTermUIsByConceptUI('M0000012').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('M0000110', function () {
    var resultExpected = ['T000206', 'T814292', 'T816277'];
    it('should return correct term UIs: ' + resultExpected.toString(), function (done) {
      meshTree.getTermUIsByConceptUI('M0000110').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
});
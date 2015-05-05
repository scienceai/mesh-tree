
// getTermsByTermUI
describe('get all terms under a term UI', function () {
  describe('T000004', function () {
    var resultExpected = ['A23187'];
    it('should return correct terms: ' + resultExpected.toString(), function (done) {
      meshTree.getTermsByTermUI('T000004').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('T365903', function () {
    var resultExpected = ['Microsomal Triglyceride Transfer Protein Deficiency Disease'];
    it('should return correct terms: ' + resultExpected.toString(), function (done) {
      meshTree.getTermsByTermUI('T365903').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('T814292', function () {
    var resultExpected = ['Cotyloid Cavities', 'Cavity, Cotyloid', 'Cavities, Cotyloid', 'Cotyloid Cavity'];
    it('should return correct terms: ' + resultExpected.toString(), function (done) {
      meshTree.getTermsByTermUI('T814292').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
});
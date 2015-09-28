
// getPharmacologicalAction
describe('get pharmacological action descUIs', function () {
  describe('D000001', function () {
    var resultExpected = ['D000900', 'D061207'];
    it('should return array: ' + resultExpected.toString(), function (done) {
      meshTree.getPharmacologicalAction('D000001').then(function (result) {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });
});

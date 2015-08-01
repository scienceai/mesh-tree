
// getParentDescUIsForSCR
describe('get parent descriptor UIs for a supplemental concept record  UI', function () {
  describe('C041293', function () {
    var resultExpected = ['D011140'];
    it('should return single parent desc UI: ' + resultExpected.toString(), function (done) {
      meshTree.getParentDescUIsForSCR('C041293').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('C025735', function () {
    var resultExpected = ['D001286', 'D002164', 'D012602'];
    it('should return multiple parent desc UIs: ' + resultExpected.toString(), function (done) {
      meshTree.getParentDescUIsForSCR('C025735').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
});

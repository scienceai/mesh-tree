
// getCommonAncestorsForDescUIs
describe('get common ancestor of descriptor record UIs', function () {
  describe('D012345, D000926', function () {
    var resultExpected = ['D012343'];
    it('should return closest common ancestors desc UIs: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getCommonAncestorsForDescUIs(['D012345', 'D000926'])).then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
});
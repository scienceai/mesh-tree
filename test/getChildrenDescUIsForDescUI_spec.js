
// getChildrenDescUIsForDescUI
describe('get children descriptor UIs for a descriptor UI', function () {
  describe('D012343', function () {
    var resultExpected = ['D012345', 'D000926', 'D012346'];
    it('should return multiple desc UIs: ' + resultExpected.toString(), function (done) {
      co(meshTreeFuncs.getChildrenDescUIsForDescUI('D012343')).then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('D000001', function () {
    var resultExpected = [];
    it('should return no children.', function (done) {
      co(meshTreeFuncs.getChildrenDescUIsForDescUI('D000001')).then(function (result) {
        assert.strictEqual(result.length, 0);
        done();
      });
    })
  })
});
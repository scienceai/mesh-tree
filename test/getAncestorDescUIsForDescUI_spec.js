
// getAncestorDescUIsForDescUI
describe('get ancestor descriptor UIs for a descriptor UI', function () {
  describe('D009369', function () {
    var resultExpected = [];
    it('should return no desc UIs (top level): ' + resultExpected.toString(), function (done) {
      meshTree.getAncestorDescUIsForDescUI('D009369').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
});

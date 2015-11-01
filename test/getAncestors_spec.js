describe('get ancestor descriptor UIs for a descriptor UI', function () {

  describe('D009369', () => {
    let resultExpected = [];
    it('should return no desc UIs (top level): ' + resultExpected.toString(), done => {
      meshTree.getAncestors({ id: 'D009369', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D009369', () => {
    let resultExpected = [];
    it('should return no desc UIs (top level): ' + resultExpected.toString(), done => {
      meshTree.getAncestors({ id: 'http://id.nlm.nih.gov/mesh/D009369', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

});

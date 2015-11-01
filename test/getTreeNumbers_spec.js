describe('get tree numbers by UI', function () {

  describe('D000001', () => {
    let resultExpected = ['D03.438.221.173'];
    it('should return correct single tree number: ' + resultExpected.toString(), done => {
      meshTree.getTreeNumbers({ id: 'D000001', format: 'mesh' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D009369', () => {
    let resultExpected = ['C04'];
    it('should return correct single tree number: ' + resultExpected.toString(), done => {
      meshTree.getTreeNumbers({ id: 'D009369', format: 'mesh' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D005138', () => {
    let resultExpected = ['A01.456.505.420.338', 'A17.360.296'];
    it('should return correct multiple tree numbers: ' + resultExpected.toString(), done => {
      meshTree.getTreeNumbers({ id: 'D005138', format: 'mesh' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

});

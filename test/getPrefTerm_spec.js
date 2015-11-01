describe('get record preferred term by UI', function () {

  describe('D000001', () => {
    let resultExpected = 'Calcimycin';
    it('should return: ' + resultExpected.toString(), done => {
      meshTree.getPrefTerm({ id: 'D000001' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D009369', () => {
    let resultExpected = 'Neoplasms';
    it('should return: ' + resultExpected.toString(), done => {
      meshTree.getPrefTerm({ id: 'D009369' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D005138', () => {
    let resultExpected = 'Eyebrows';
    it('should return: ' + resultExpected.toString(), done => {
      meshTree.getPrefTerm({ id: 'D005138' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D005138', () => {
    let resultExpected = 'Eyebrows';
    it('should return: ' + resultExpected.toString(), done => {
      meshTree.getPrefTerm({ id: 'http://id.nlm.nih.gov/mesh/D005138' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

});

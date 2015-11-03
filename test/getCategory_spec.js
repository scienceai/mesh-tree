describe('get top-level category by UI', function () {

  describe('D000001', () => {
    let resultExpected = 'Chemicals and Drugs';
    it('should return correct top-level category: ' + resultExpected, done => {
      meshTree.getCategory({ id: 'D000001' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D000001', () => {
    let resultExpected = 'Chemicals and Drugs';
    it('should return correct top-level category: ' + resultExpected, done => {
      meshTree.getCategory({ id: 'http://id.nlm.nih.gov/mesh/D000001' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D009369', () => {
    let resultExpected = 'Diseases';
    it('should return correct top-level category: ' + resultExpected, done => {
      meshTree.getCategory({ id: 'D009369' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D009369', () => {
    let resultExpected = 'Diseases';
    it('should return correct top-level category: ' + resultExpected, done => {
      meshTree.getCategory({ id: 'http://id.nlm.nih.gov/mesh/D009369' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D005138', () => {
    let resultExpected = 'Anatomy';
    it('should return correct multiple tree numbers: ' + resultExpected, done => {
      meshTree.getCategory({ id: 'D005138' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D005138', () => {
    let resultExpected = 'Anatomy';
    it('should return correct multiple tree numbers: ' + resultExpected, done => {
      meshTree.getCategory({ id: 'http://id.nlm.nih.gov/mesh/D005138' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

});

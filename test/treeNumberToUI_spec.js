describe('get descriptor UI for tree number', function () {

  describe('D03.438.221.173', () => {
    let resultExpected = 'D000001';
    it('should return descriptor record UI: ' + resultExpected.toString(), done => {
      meshTree.treeNumberToUI({ treeNum: 'D03.438.221.173', format: 'mesh' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('C04', () => {
    let resultExpected = 'D009369';
    it('should return descriptor record UI: ' + resultExpected.toString(), done => {
      meshTree.treeNumberToUI({ treeNum: 'C04', format: 'mesh' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('A17.360.296', () => {
    let resultExpected = 'D005138';
    it('should return descriptor record UI: ' + resultExpected.toString(), done => {
      meshTree.treeNumberToUI({ treeNum: 'A17.360.296', format: 'mesh' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('A01.456.505.420.338', () => {
    let resultExpected = 'D005138';
    it('should return descriptor record UI: ' + resultExpected.toString(), done => {
      meshTree.treeNumberToUI({ treeNum: 'http://id.nlm.nih.gov/mesh/A01.456.505.420.338', format: 'mesh' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/A01.456.505.420.338', () => {
    let resultExpected = 'D005138';
    it('should return descriptor record UI: ' + resultExpected.toString(), done => {
      meshTree.treeNumberToUI({ treeNum: 'http://id.nlm.nih.gov/mesh/A01.456.505.420.338', format: 'mesh' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/A01.456.505.420.338', () => {
    let resultExpected = 'http://id.nlm.nih.gov/mesh/D005138';
    it('should return descriptor record UI: ' + resultExpected.toString(), done => {
      meshTree.treeNumberToUI({ treeNum: 'http://id.nlm.nih.gov/mesh/A01.456.505.420.338', format: 'rdf' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

});

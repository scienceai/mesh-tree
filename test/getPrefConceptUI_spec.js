describe('get preferred concept UI for descriptor record UI', function () {

  describe('D000001', () => {
    let resultExpected = 'M0000001';
    it('should return correct concept UI: ' + resultExpected.toString(), done => {
      meshTree.getPrefConceptUI({ id: 'D000001', format: 'mesh' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D009369', () => {
    let resultExpected = 'M0014585';
    it('should return correct concept UIs: ' + resultExpected.toString(), done => {
      meshTree.getPrefConceptUI({ id: 'D009369', format: 'mesh' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D005138', () => {
    let resultExpected = 'M0008101';
    it('should return correct concept UIs: ' + resultExpected.toString(), done => {
      meshTree.getPrefConceptUI({ id: 'D005138', format: 'mesh' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D005138', () => {
    let resultExpected = 'M0008101';
    it('should return correct concept UIs: ' + resultExpected.toString(), done => {
      meshTree.getPrefConceptUI({ id: 'http://id.nlm.nih.gov/mesh/D005138', format: 'mesh' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D005138', () => {
    let resultExpected = 'http://id.nlm.nih.gov/mesh/M0008101';
    it('should return correct concept UIs: ' + resultExpected.toString(), done => {
      meshTree.getPrefConceptUI({ id: 'http://id.nlm.nih.gov/mesh/D005138', format: 'rdf' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

});

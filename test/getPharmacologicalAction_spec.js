describe('get pharmacological action descUIs', function () {

  describe('D000001', () => {
    let resultExpected = ['D000900', 'D061207'];
    it('should return array: ' + resultExpected.toString(), done => {
      meshTree.getPharmacologicalAction({ id: 'D000001', format: 'mesh' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D000001', () => {
    let resultExpected = ['D000900', 'D061207'];
    it('should return array: ' + resultExpected.toString(), done => {
      meshTree.getPharmacologicalAction({ id: 'http://id.nlm.nih.gov/mesh/D000001', format: 'mesh' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D000001', () => {
    let resultExpected = ['http://id.nlm.nih.gov/mesh/D000900', 'http://id.nlm.nih.gov/mesh/D061207'];
    it('should return array: ' + resultExpected.toString(), done => {
      meshTree.getPharmacologicalAction({ id: 'D000001', format: 'rdf' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D000001', () => {
    let resultExpected = ['http://id.nlm.nih.gov/mesh/D000900', 'http://id.nlm.nih.gov/mesh/D061207'];
    it('should return array: ' + resultExpected.toString(), done => {
      meshTree.getPharmacologicalAction({ id: 'http://id.nlm.nih.gov/mesh/D000001', format: 'rdf' }).then(result => {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });

});

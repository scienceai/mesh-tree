describe('get parent descriptor UIs for a descriptor UI', function () {

  describe('D000001', () => {
    let resultExpected = ['D001583'];
    it('should return single parent desc UI: ' + resultExpected.toString(), done => {
      meshTree.getParents({ id: 'D000001', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('D000001', () => {
    let resultExpected = ['http://id.nlm.nih.gov/mesh/D001583'];
    it('should return single parent desc UI: ' + resultExpected.toString(), done => {
      meshTree.getParents({ id: 'D000001', format: 'rdf' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D000001', () => {
    let resultExpected = ['D001583'];
    it('should return single parent desc UI: ' + resultExpected.toString(), done => {
      meshTree.getParents({ id: 'http://id.nlm.nih.gov/mesh/D000001', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D000001', () => {
    let resultExpected = ['http://id.nlm.nih.gov/mesh/D001583'];
    it('should return single parent desc UI: ' + resultExpected.toString(), done => {
      meshTree.getParents({ id: 'http://id.nlm.nih.gov/mesh/D000001', format: 'rdf' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('D009369', () => {
    let resultExpected = [];
    it('should return no desc UIs (top level): ' + resultExpected.toString(), done => {
      meshTree.getParents({ id: 'D009369', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('D005138', () => {
    let resultExpected = ['D006197', 'D005123'];
    it('should return two parent desc UIs: ' + resultExpected.toString(), done => {
      meshTree.getParents({ id: 'D005138', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('C041293', () => {
    let resultExpected = ['D011140'];
    it('should return single parent desc UI: ' + resultExpected.toString(), done => {
      meshTree.getParents({ id: 'C041293', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('C025735', () => {
    let resultExpected = ['D001286', 'D002164', 'D012602'];
    it('should return multiple parent desc UIs: ' + resultExpected.toString(), done => {
      meshTree.getParents({ id: 'C025735', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/C025735', () => {
    let resultExpected = ['D001286', 'D002164', 'D012602'];
    it('should return multiple parent desc UIs: ' + resultExpected.toString(), done => {
      meshTree.getParents({ id: 'C025735', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

});

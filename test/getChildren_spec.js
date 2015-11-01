describe('get children descriptor UIs for a descriptor UI', function () {

  describe('D012343', () => {
    var resultExpected = ['D012345', 'D000926', 'D012346'];
    it('should return multiple desc UIs: ' + resultExpected.toString(), done => {
      meshTree.getChildren({ id: 'D012343', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D012343', () => {
    var resultExpected = ['D012345', 'D000926', 'D012346'];
    it('should return multiple desc UIs: ' + resultExpected.toString(), done => {
      meshTree.getChildren({ id: 'http://id.nlm.nih.gov/mesh/D012343', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });



  describe('D012343', () => {
    var resultExpected = ['http://id.nlm.nih.gov/mesh/D012345', 'http://id.nlm.nih.gov/mesh/D000926', 'http://id.nlm.nih.gov/mesh/D012346'];
    it('should return multiple desc UIs: ' + resultExpected.toString(), done => {
      meshTree.getChildren({ id: 'D012343', format: 'rdf' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });



  describe('http://id.nlm.nih.gov/mesh/D012343', () => {
    var resultExpected = ['http://id.nlm.nih.gov/mesh/D012345', 'http://id.nlm.nih.gov/mesh/D000926', 'http://id.nlm.nih.gov/mesh/D012346'];
    it('should return multiple desc UIs: ' + resultExpected.toString(), done => {
      meshTree.getChildren({ id: 'http://id.nlm.nih.gov/mesh/D012343', format: 'rdf' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('D000001', () => {
    var resultExpected = [];
    it('should return no children.', done => {
      meshTree.getChildren({ id: 'D000001', format: 'mesh' }).then(result => {
        assert.strictEqual(result.length, 0);
        done();
      });
    });
  });

});

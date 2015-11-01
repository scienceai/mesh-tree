describe('get sibling descriptor UIs for a descriptor UI', function () {

  describe('D015834 (Cochlear Diseases)', () => {
    let resultExpected = ['D018159', 'D015837', 'D007762'];
    it('should return multiple desc UIs: D018159 (Endolymphatic Hydrops), D015837 (Vestibular Diseases), D007762 (Labyrinthitis)', done => {
      meshTree.getSiblings({ id: 'D015834', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D015834 (Cochlear Diseases)', () => {
    let resultExpected = ['D018159', 'D015837', 'D007762'];
    it('should return multiple desc UIs: D018159 (Endolymphatic Hydrops), D015837 (Vestibular Diseases), D007762 (Labyrinthitis)', done => {
      meshTree.getSiblings({ id: 'http://id.nlm.nih.gov/mesh/D015834', format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('D015834 (Cochlear Diseases)', () => {
    let resultExpected = ['http://id.nlm.nih.gov/mesh/D018159', 'http://id.nlm.nih.gov/mesh/D015837', 'http://id.nlm.nih.gov/mesh/D007762'];
    it('should return multiple desc UIs: D018159 (Endolymphatic Hydrops), D015837 (Vestibular Diseases), D007762 (Labyrinthitis)', done => {
      meshTree.getSiblings({ id: 'D015834', format: 'rdf' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D015834 (Cochlear Diseases)', () => {
    let resultExpected = ['http://id.nlm.nih.gov/mesh/D018159', 'http://id.nlm.nih.gov/mesh/D015837', 'http://id.nlm.nih.gov/mesh/D007762'];
    it('should return multiple desc UIs: D018159 (Endolymphatic Hydrops), D015837 (Vestibular Diseases), D007762 (Labyrinthitis)', done => {
      meshTree.getSiblings({ id: 'http://id.nlm.nih.gov/mesh/D015834', format: 'rdf' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

});

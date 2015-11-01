describe('get common ancestor of descriptor record UIs', function () {

  describe('D012345 (RNA, Transfer, Amino Acid-Specific), D000926 (Anticodon)', () => {
    let resultExpected = ['D012343'];
    it('should return closest common ancestors desc UIs: ' + resultExpected.toString() + ' (RNA, Transfer)', done => {
      meshTree.getCommonAncestors({ ids: ['D012345', 'D000926'], format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('D000233 (Adenoidectomy), D014068 (Tonsillectomy), D007828 (Laryngoscopy)', () => {
    let resultExpected = ['D013517'];
    it('should return closest common ancestors desc UIs: ' + resultExpected.toString() + ' (Otorhinolaryngologic Surgical Procedures)', done => {
      meshTree.getCommonAncestors({ ids: ['D000233', 'D014068', 'D007828'], format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('D011434 (Proprioception), D014785 (Vision, Ocular), D004856 (Postural Balance)', () => {
    let resultExpected = ['D012677'];
    it('should return closest common ancestors desc UIs: ' + resultExpected.toString() + ' (Sensation)', done => {
      meshTree.getCommonAncestors({ ids: ['D011434', 'D014785', 'D004856'], format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D011434 (Proprioception), http://id.nlm.nih.gov/mesh/D014785 (Vision, Ocular), http://id.nlm.nih.gov/mesh/D004856 (Postural Balance)', () => {
    let resultExpected = ['D012677'];
    it('should return closest common ancestors desc UIs: ' + resultExpected.toString() + ' (Sensation)', done => {
      meshTree.getCommonAncestors({ ids: ['http://id.nlm.nih.gov/mesh/D011434', 'http://id.nlm.nih.gov/mesh/D014785', 'http://id.nlm.nih.gov/mesh/D004856'], format: 'mesh' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('D011434 (Proprioception), D014785 (Vision, Ocular), D004856 (Postural Balance)', () => {
    let resultExpected = ['http://id.nlm.nih.gov/mesh/D012677'];
    it('should return closest common ancestors desc UIs: ' + resultExpected.toString() + ' (Sensation)', done => {
      meshTree.getCommonAncestors({ ids: ['D011434', 'D014785', 'D004856'], format: 'rdf' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D011434 (Proprioception), http://id.nlm.nih.gov/mesh/D014785 (Vision, Ocular), http://id.nlm.nih.gov/mesh/D004856 (Postural Balance)', () => {
    let resultExpected = ['http://id.nlm.nih.gov/mesh/D012677'];
    it('should return closest common ancestors desc UIs: ' + resultExpected.toString() + ' (Sensation)', done => {
      meshTree.getCommonAncestors({ ids: ['http://id.nlm.nih.gov/mesh/D011434', 'http://id.nlm.nih.gov/mesh/D014785', 'http://id.nlm.nih.gov/mesh/D004856'], format: 'rdf' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

});

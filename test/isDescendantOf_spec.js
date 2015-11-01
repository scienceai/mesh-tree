describe('test for parent-descendant relationship', function () {

  describe('D012677 (Sensation) -> D014785 (Vision, Ocular)', () => {
    it('can handle descriptor records with multiple tree numbers (on multiple branches)', done => {
      meshTree.isDescendantOf('D012677', 'D014785').then(result => {
        expect(result).to.be.true;
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D012677 (Sensation) -> http://id.nlm.nih.gov/mesh/D014785 (Vision, Ocular)', () => {
    it('can handle descriptor records with multiple tree numbers (on multiple branches)', done => {
      meshTree.isDescendantOf('http://id.nlm.nih.gov/mesh/D012677', 'http://id.nlm.nih.gov/mesh/D014785').then(result => {
        expect(result).to.be.true;
        done();
      });
    });
  });

  describe('D013517 (Otorhinolaryngologic Surgical Procedures) -> D014068 (Tonsillectomy)', () => {
    it('should be parent -> descenddant', done => {
      meshTree.isDescendantOf('D013517', 'D014068').then(result => {
        expect(result).to.be.true;
        done();
      });
    });
  });

  describe('D013517 (Otorhinolaryngologic Surgical Procedures) -> D014068 (Tonsillectomy)', () => {
    it('reverse should not be true', done => {
      meshTree.isDescendantOf('D014068', 'D013517').then(result => {
        expect(result).to.be.false;
        done();
      });
    });
  });

});

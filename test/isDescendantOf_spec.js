
// isDescendantOf
describe('test for parent-descendant relationship', function () {
  describe('D012677 (Sensation) -> D014785 (Vision, Ocular)', function () {
    it('can handle descriptor records with multiple tree numbers (on multiple branches)', function (done) {
      meshTree.isDescendantOf('D012677', 'D014785').then(function (result) {
        expect(result).to.be.true;
        done();
      });
    })
  })
  describe('D013517 (Otorhinolaryngologic Surgical Procedures) -> D014068 (Tonsillectomy)', function () {
    it('should be parent -> descenddant', function (done) {
      meshTree.isDescendantOf('D013517', 'D014068').then(function (result) {
        expect(result).to.be.true;
        done();
      });
    })
  })
  describe('D013517 (Otorhinolaryngologic Surgical Procedures) -> D014068 (Tonsillectomy)', function () {
    it('reverse should not be true', function (done) {
      meshTree.isDescendantOf('D014068', 'D013517').then(function (result) {
        expect(result).to.be.false;
        done();
      });
    })
  })
});

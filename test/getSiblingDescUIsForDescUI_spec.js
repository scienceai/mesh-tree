
// getSiblingDescUIsForDescUI
describe('get sibling descriptor UIs for a descriptor UI', function () {

  describe('D015834 (Cochlear Diseases)', function () {
    var resultExpected = ['D018159', 'D015837', 'D007762'];
    it('should return multiple desc UIs: D018159 (Endolymphatic Hydrops), D015837 (Vestibular Diseases), D007762 (Labyrinthitis)', function (done) {
      meshTree.getSiblingDescUIsForDescUI('D015834').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

});

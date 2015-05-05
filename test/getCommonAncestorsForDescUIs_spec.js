
// getCommonAncestorsForDescUIs
describe('get common ancestor of descriptor record UIs', function () {

  describe('D012345 (RNA, Transfer, Amino Acid-Specific), D000926 (Anticodon)', function () {
    var resultExpected = ['D012343'];
    it('should return closest common ancestors desc UIs: ' + resultExpected.toString() + ' (RNA, Transfer)', function (done) {
      meshTree.getCommonAncestorsForDescUIs(['D012345', 'D000926']).then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })

  describe('D000233 (Adenoidectomy), D014068 (Tonsillectomy), D007828 (Laryngoscopy)', function () {
    var resultExpected = ['D013517'];
    it('should return closest common ancestors desc UIs: ' + resultExpected.toString() + ' (Otorhinolaryngologic Surgical Procedures)', function (done) {
      meshTree.getCommonAncestorsForDescUIs(['D000233', 'D014068', 'D007828']).then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })

  describe('D011434 (Proprioception), D014785 (Vision, Ocular), D004856 (Postural Balance)', function () {
    var resultExpected = ['D012677'];
    it('should return closest common ancestors desc UIs: ' + resultExpected.toString() + ' (Sensation)', function (done) {
      meshTree.getCommonAncestorsForDescUIs(['D011434', 'D014785', 'D004856']).then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })

});
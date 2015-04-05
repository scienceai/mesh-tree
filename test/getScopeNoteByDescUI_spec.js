
// getScopeNoteByDescUI
describe('get scope note for descriptor UI', function () {
  describe('D000001', function () {
    var resultExpected = 'An ionophorous, polyether antibiotic from Streptomyces chartreusensis. It binds and transports CALCIUM and other divalent cations across membranes and uncouples oxidative phosphorylation while inhibiting ATPase of rat liver mitochondria. The substance is used mostly as a biochemical tool to study the role of divalent cations in various biological systems.';
    var resultShow = resultExpected.length > 300 ? resultExpected.slice(0, 300) + ' ... ' : resultExpected;
    it('should return the scope note for concept Calcimycin: ' + resultShow, function (done) {
      co(meshTreeFuncs.getScopeNoteByDescUI('D000001')).then(function (result) {
        assert.equal(result, resultExpected);
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = 'New abnormal growth of tissue. Malignant neoplasms show a greater degree of anaplasia and have the properties of invasion and metastasis, compared to benign neoplasms.';
    var resultShow = resultExpected.length > 300 ? resultExpected.slice(0, 300) + ' ... ' : resultExpected;
    it('should return the scope note for concept Neoplasms: ' + resultShow, function (done) {
      co(meshTreeFuncs.getScopeNoteByDescUI('D009369')).then(function (result) {
        assert.equal(result, resultExpected);
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = 'Curved rows of HAIR located on the upper edges of the eye sockets.';
    var resultShow = resultExpected.length > 300 ? resultExpected.slice(0, 300) + ' ... ' : resultExpected;
    it('should return the scope note for concept Eyebrows: ' + resultShow, function (done) {
      co(meshTreeFuncs.getScopeNoteByDescUI('D005138')).then(function (result) {
        assert.equal(result, resultExpected);
        done();
      });
    })
  })
});
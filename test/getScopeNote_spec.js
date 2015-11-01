describe('get scope note for descriptor UI', function () {

  describe('D000001', () => {
    let resultExpected = 'An ionophorous, polyether antibiotic from Streptomyces chartreusensis. It binds and transports CALCIUM and other divalent cations across membranes and uncouples oxidative phosphorylation while inhibiting ATPase of rat liver mitochondria. The substance is used mostly as a biochemical tool to study the role of divalent cations in various biological systems.';
    let resultShow = resultExpected.length > 300 ? resultExpected.slice(0, 300) + ' ... ' : resultExpected;
    it('should return the scope note for concept Calcimycin: ' + resultShow, done => {
      meshTree.getScopeNote({ id: 'D000001' }).then(result => {
        assert.equal(result, resultExpected);
        done();
      });
    });
  });

  describe('D009369', () => {
    let resultExpected = 'New abnormal growth of tissue. Malignant neoplasms show a greater degree of anaplasia and have the properties of invasion and metastasis, compared to benign neoplasms.';
    let resultShow = resultExpected.length > 300 ? resultExpected.slice(0, 300) + ' ... ' : resultExpected;
    it('should return the scope note for concept Neoplasms: ' + resultShow, done => {
      meshTree.getScopeNote({ id: 'D009369' }).then(result => {
        assert.equal(result, resultExpected);
        done();
      });
    });
  });

  describe('D005138', () => {
    let resultExpected = 'Curved rows of HAIR located on the upper edges of the eye sockets.';
    let resultShow = resultExpected.length > 300 ? resultExpected.slice(0, 300) + ' ... ' : resultExpected;
    it('should return the scope note for concept Eyebrows: ' + resultShow, done => {
      meshTree.getScopeNote({ id: 'D005138' }).then(result => {
        assert.equal(result, resultExpected);
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D005138', () => {
    let resultExpected = 'Curved rows of HAIR located on the upper edges of the eye sockets.';
    let resultShow = resultExpected.length > 300 ? resultExpected.slice(0, 300) + ' ... ' : resultExpected;
    it('should return the scope note for concept Eyebrows: ' + resultShow, done => {
      meshTree.getScopeNote({ id: 'http://id.nlm.nih.gov/mesh/D005138' }).then(result => {
        assert.equal(result, resultExpected);
        done();
      });
    });
  });

});

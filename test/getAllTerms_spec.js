describe('get all terms by UI', function () {

  describe('D000001', () => {
    let resultExpected = ['A23187, Antibiotic', 'Antibiotic A23187', 'A23187', 'A 23187', 'A-23187', 'Calcimycin'];
    it('should return all terms for concept Calcimycin: ' + resultExpected.toString(), done => {
      meshTree.getAllTerms({ id: 'D000001' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D000001', () => {
    let resultExpected = ['A23187, Antibiotic', 'Antibiotic A23187', 'A23187', 'A 23187', 'A-23187', 'Calcimycin'];
    it('should return all terms for concept Calcimycin: ' + resultExpected.toString(), done => {
      meshTree.getAllTerms({ id: 'http://id.nlm.nih.gov/mesh/D000001' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('D009369', () => {
    let resultExpected = ['Cancers', 'Cancer', 'Benign Neoplasm', 'Neoplasm, Benign', 'Neoplasms, Benign', 'Benign Neoplasms', 'Tumor', 'Tumors', 'Neoplasia', 'Neoplasm', 'Neoplasms'];
    it('should return all terms for concept Neoplasms: ' + resultExpected.toString(), done => {
      meshTree.getAllTerms({ id: 'D009369' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });



  describe('http://id.nlm.nih.gov/mesh/D009369', () => {
    let resultExpected = ['Cancers', 'Cancer', 'Benign Neoplasm', 'Neoplasm, Benign', 'Neoplasms, Benign', 'Benign Neoplasms', 'Tumor', 'Tumors', 'Neoplasia', 'Neoplasm', 'Neoplasms'];
    it('should return all terms for concept Neoplasms: ' + resultExpected.toString(), done => {
      meshTree.getAllTerms({ id: 'http://id.nlm.nih.gov/mesh/D009369' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('D005138', () => {
    let resultExpected = ['Eyebrow', 'Eyebrows'];
    it('should return all terms for concept Eyebrows: ' + resultExpected.toString(), done => {
      meshTree.getAllTerms({ id: 'D005138' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });



  describe('http://id.nlm.nih.gov/mesh/D005138', () => {
    let resultExpected = ['Eyebrow', 'Eyebrows'];
    it('should return all terms for concept Eyebrows: ' + resultExpected.toString(), done => {
      meshTree.getAllTerms({ id: 'http://id.nlm.nih.gov/mesh/D005138' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('C025735', () => {
    let resultExpected = ['Aeron'];
    it('should return all terms for chemical record "Aeron": ' + resultExpected.toString(), done => {
      meshTree.getAllTerms({ id: 'C025735' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/C025735', () => {
    let resultExpected = ['Aeron'];
    it('should return all terms for chemical record "Aeron": ' + resultExpected.toString(), done => {
      meshTree.getAllTerms({ id: 'http://id.nlm.nih.gov/mesh/C025735' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('C025734', () => {
    let resultExpected = ['CH-A1-MG', 'alpha 1 microglobulin, chorionic', 'chorionic alpha 1-microglobulin', 'chorionic alpha(1)-microglobulin'];
    it('should return all terms for chemical record "chorionic alpha(1)-microglobulin": ' + resultExpected.toString(), done => {
      meshTree.getAllTerms({ id: 'C025734' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/C025734', () => {
    let resultExpected = ['CH-A1-MG', 'alpha 1 microglobulin, chorionic', 'chorionic alpha 1-microglobulin', 'chorionic alpha(1)-microglobulin'];
    it('should return all terms for chemical record "chorionic alpha(1)-microglobulin": ' + resultExpected.toString(), done => {
      meshTree.getAllTerms({ id: 'http://id.nlm.nih.gov/mesh/C025734' }).then(result => {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

});

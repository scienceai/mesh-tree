var assert = require('assert')
  , meshTreeFuncs = require('../index.js');

// getTreeNumbersByDescUI
describe('get tree numbers by UI', function () {
  describe('D000001', function () {
    var resultExpected = ['D03.438.221.173'];
    it('should return correct single tree number: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getTreeNumbersByDescUI('D000001').then(function (result) {
        assert.deepEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = ['C04'];
    it('should return correct single tree number: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getTreeNumbersByDescUI('D009369').then(function (result) {
        assert.deepEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = ['A01.456.505.420.338', 'A17.360.296'];
    it('should return correct multiple tree numbers: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getTreeNumbersByDescUI('D005138').then(function (result) {
        assert.deepEqual(result, resultExpected);
        done();
      });
    })
  })
});

// getRecordPreferredTermByDescUI
describe('get record preferred term by UI', function () {
  describe('D000001', function () {
    var resultExpected = '"Calcimycin"';
    it('should return: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getRecordPreferredTermByDescUI('D000001').then(function (result) {
        assert.equal(result, resultExpected);
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = '"Neoplasms"';
    it('should return: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getRecordPreferredTermByDescUI('D009369').then(function (result) {
        assert.equal(result, resultExpected);
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = '"Eyebrows"';
    it('should return: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getRecordPreferredTermByDescUI('D005138').then(function (result) {
        assert.equal(result, resultExpected);
        done();
      });
    })
  })
});

// getConceptUIsByDescUI
describe('get all concept UIs contained by descriptor record UI', function () {
  describe('D000001', function () {
    var resultExpected = ['M0353609', 'M0000001'];
    it('should return correct concept UIs: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getConceptUIsByDescUI('D000001').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = ['M0014584', 'M0014585', 'M0014586'];
    it('should return correct concept UIs: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getConceptUIsByDescUI('D009369').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = ['M0008101'];
    it('should return correct concept UIs: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getConceptUIsByDescUI('D005138').then(function (result) {
        assert.deepEqual(result, resultExpected);
        done();
      });
    })
  })
});

// getTermUIsByConceptUI
describe('get all term UIs contained by a concept UI', function () {
  describe('M0353609', function () {
    var resultExpected = ['T000003', 'T000004', 'T000001'];
    it('should return correct term UIs: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getTermUIsByConceptUI('M0353609').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('M0000012', function () {
    var resultExpected = ['T000024', 'T000025', 'T365903', 'T811395', 'T646365', 'T751239', 'T365904'];
    it('should return correct term UIs: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getTermUIsByConceptUI('M0000012').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('M0000110', function () {
    var resultExpected = ['T000206', 'T814292', 'T816277'];
    it('should return correct term UIs: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getTermUIsByConceptUI('M0000110').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
});

// getTermsByTermUI
describe('get all terms under a term UI', function () {
  describe('T000004', function () {
    var resultExpected = ['"A23187"'];
    it('should return correct terms: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getTermsByTermUI('T000004').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('T365903', function () {
    var resultExpected = ['"Microsomal Triglyceride Transfer Protein Deficiency Disease"'];
    it('should return correct terms: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getTermsByTermUI('T365903').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('T814292', function () {
    var resultExpected = ['"Cotyloid Cavities"', '"Cavity, Cotyloid"', '"Cavities, Cotyloid"', '"Cotyloid Cavity"'];
    it('should return correct terms: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getTermsByTermUI('T814292').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
});

// getAllTermsByDescUI
describe('get all terms by UI', function () {
  describe('D000001', function () {
    var resultExpected = ['"A23187, Antibiotic"', '"Antibiotic A23187"', '"A23187"', '"A 23187"', '"A-23187"', '"Calcimycin"'];
    it('should return all terms for concept Calcimycin: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getAllTermsByDescUI('D000001').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = ['"Cancers"', '"Cancer"', '"Benign Neoplasm"', '"Neoplasm, Benign"', '"Neoplasms, Benign"', '"Benign Neoplasms"', '"Tumor"', '"Tumors"', '"Neoplasia"', '"Neoplasm"', '"Neoplasms"'];
    it('should return all terms for concept Neoplasms: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getAllTermsByDescUI('D009369').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = ['"Eyebrow"', '"Eyebrows"'];
    it('should return all terms for concept Eyebrows: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getAllTermsByDescUI('D005138').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
});
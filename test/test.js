

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

// getDescUIByTreeNumber
describe('get descriptor UI for tree number', function () {
  describe('D03.438.221.173', function () {
    var resultExpected = 'D000001';
    it('should return descriptor record UI: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getDescUIByTreeNumber('D03.438.221.173').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('C04', function () {
    var resultExpected = 'D009369';
    it('should return descriptor record UI: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getDescUIByTreeNumber('C04').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('A17.360.296', function () {
    var resultExpected = 'D005138';
    it('should return descriptor record UI: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getDescUIByTreeNumber('A17.360.296').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('A01.456.505.420.338', function () {
    var resultExpected = 'D005138';
    it('should return descriptor record UI: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getDescUIByTreeNumber('A01.456.505.420.338').then(function (result) {
        assert.strictEqual(result, resultExpected);
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
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = '"Neoplasms"';
    it('should return: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getRecordPreferredTermByDescUI('D009369').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = '"Eyebrows"';
    it('should return: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getRecordPreferredTermByDescUI('D005138').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
});

// getPreferredConceptByDescUI
describe('get preferred concept UI for descriptor record UI', function () {
  describe('D000001', function () {
    var resultExpected = 'M0000001';
    it('should return correct concept UI: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getPreferredConceptByDescUI('D000001').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = 'M0014585';
    it('should return correct concept UIs: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getPreferredConceptByDescUI('D009369').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = 'M0008101';
    it('should return correct concept UIs: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getPreferredConceptByDescUI('D005138').then(function (result) {
        assert.strictEqual(result, resultExpected);
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

// getScopeNoteByDescUI
describe('get scope note for descriptor UI', function () {
  describe('D000001', function () {
    it('should return the scope note for concept Calcimycin', function (done) {
      meshTreeFuncs.getScopeNoteByDescUI('D000001').then(function (result) {
        console.log(result);
        assert.equal(result.length>10, true);
        done();
      });
    })
  })
  describe('D009369', function () {
    it('should return the scope note for concept Neoplasms', function (done) {
      meshTreeFuncs.getScopeNoteByDescUI('D009369').then(function (result) {
        console.log(result);
        assert.equal(result.length>10, true);
        done();
      });
    })
  })
  describe('D005138', function () {
    it('should return the scope note for concept Eyebrows', function (done) {
      meshTreeFuncs.getScopeNoteByDescUI('D005138').then(function (result) {
        console.log(result);
        assert.equal(result.length>10, true);
        done();
      });
    })
  })
});

// getParentDescUIsForDescUI
describe('get parent descriptor UIs for a descriptor UI', function () {
  describe('D000001', function () {
    var resultExpected = ['D001583'];
    it('should return single parent desc UI: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getParentDescUIsForDescUI('D000001').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('D009369', function () {
    var resultExpected = [];
    it('should return no desc UIs (top level): ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getParentDescUIsForDescUI('D009369').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
  describe('D005138', function () {
    var resultExpected = ['D006197', 'D005123'];
    it('should return two parent desc UIs: ' + resultExpected.toString(), function (done) {
      meshTreeFuncs.getParentDescUIsForDescUI('D005138').then(function (result) {
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })
});
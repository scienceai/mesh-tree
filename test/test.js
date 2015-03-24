var assert = require('assert')
  , meshTreeFuncs = require('../index.js');

describe('get tree numbers by UI', function() {
  describe('D000001', function(){
    it('should return correct single tree number', function(done) {
      meshTreeFuncs.getTreeNumbersByDescUI('D000001').then(function (result) {
        assert.deepEqual(result, ['D03.438.221.173']);
        done();
      });
    })
  })
  describe('D009369', function(){
    it('should return correct single tree number', function(done) {
      meshTreeFuncs.getTreeNumbersByDescUI('D009369').then(function (result) {
        assert.deepEqual(result, ['C04']);
        done();
      });
    })
  })
  describe('D005138', function(){
    it('should return correct multiple tree numbers', function(done) {
      meshTreeFuncs.getTreeNumbersByDescUI('D005138').then(function (result) {
        assert.deepEqual(result, ['A01.456.505.420.338', 'A17.360.296']);
        done();
      });
    })
  })
});

describe('get record preferred term by UI', function() {
  describe('D000001', function(){
    it('should return "Calcimycin"', function(done) {
      meshTreeFuncs.getRecordPreferredTermByDescUI('D000001').then(function (result) {
        assert.deepEqual(result, '"Calcimycin"');
        done();
      });
    })
  })
  describe('D009369', function(){
    it('should return "Neoplasms"', function(done) {
      meshTreeFuncs.getRecordPreferredTermByDescUI('D009369').then(function (result) {
        assert.deepEqual(result, '"Neoplasms"');
        done();
      });
    })
  })
  describe('D005138', function(){
    it('should return "Eyebrows"', function(done) {
      meshTreeFuncs.getRecordPreferredTermByDescUI('D005138').then(function (result) {
        assert.deepEqual(result, '"Eyebrows"');
        done();
      });
    })
  })
});

describe('get all terms by UI', function() {
  describe('D000001', function(){
    it('should return all terms for concept Calcimycin', function(done) {
      meshTreeFuncs.getAllTermsByDescUI('D000001').then(function (result) {
        assert.deepEqual(result, ['"A23187, Antibiotic"', '"Antibiotic A23187"', '"A23187"', '"A 23187"', '"A-23187"', '"Calcimycin"']);
        done();
      });
    })
  })
  describe('D009369', function(){
    it('should return all terms for concept Neoplasms', function(done) {
      meshTreeFuncs.getAllTermsByDescUI('D009369').then(function (result) {
        assert.deepEqual(result, ['"Cancers"', '"Cancer"', '"Benign Neoplasm"', '"Neoplasm, Benign"', '"Neoplasms, Benign"', '"Benign Neoplasms"', '"Tumor"', '"Tumors"', '"Neoplasia"', '"Neoplasm"', '"Neoplasms"']);
        done();
      });
    })
  })
  describe('D005138', function(){
    it('should return all terms for concept Eyebrows', function(done) {
      meshTreeFuncs.getAllTermsByDescUI('D005138').then(function (result) {
        assert.deepEqual(result, ['"Eyebrow"', '"Eyebrows"']);
        done();
      });
    })
  })
});
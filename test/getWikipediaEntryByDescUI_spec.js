
// getWikipediaEntryByDescUI
describe('get wikipedia text for descriptor UI', function () {
  this.timeout(30*1000);
  
  describe('D000001', function () {
    it('should return the wikipedia abstract for concept Calcimycin', function (done) {
      meshTree.getWikipediaEntryByDescUI([{descUI: 'D000001', level: 0}]).then(function (result) {
        console.log(result.length > 300 ? result.slice(0, 300) + ' ... ' : result);
        assert.equal(result.length>10, true);
        done();
      });
    });
  });
  describe('D000001', function () {
    it('should return the entire wikipedia text for concept Calcimycin', function (done) {
      meshTree.getWikipediaEntryByDescUI([{descUI: 'D000001', level: 1}]).then(function (result) {
        console.log(result.length > 300 ? result.slice(0, 300) + ' ... ' : result);
        assert.equal(result.length>10, true);
        done();
      });
    });
  });
  describe('D009369', function () {
    it('should return the wikipedia abstract for concept Neoplasms', function (done) {
      meshTree.getWikipediaEntryByDescUI([{descUI: 'D009369', level: 0}]).then(function (result) {
        console.log(result.length > 300 ? result.slice(0, 300) + ' ... ' : result);
        assert.equal(result.length>10, true);
        done();
      });
    });
  });
  describe('D009369', function () {
    it('should return the entire wikipedia text for concept Neoplasms', function (done) {
      meshTree.getWikipediaEntryByDescUI([{descUI: 'D009369', level: 1}]).then(function (result) {
        console.log(result.length > 300 ? result.slice(0, 300) + ' ... ' : result);
        assert.equal(result.length>10, true);
        done();
      });
    });
  });
  describe('D005138', function () {
    it('should return the wikipedia abstract for concept Eyebrows', function (done) {
      meshTree.getWikipediaEntryByDescUI([{descUI: 'D005138', level: 0}]).then(function (result) {
        console.log(result.length > 300 ? result.slice(0, 300) + ' ... ' : result);
        assert.equal(result.length>10, true);
        done();
      });
    });
  });
  describe('D005138', function () {
    it('should return the entire wikipedia text for concept Eyebrows', function (done) {
      meshTree.getWikipediaEntryByDescUI([{descUI: 'D005138', level: 1}]).then(function (result) {
        console.log(result.length > 300 ? result.slice(0, 300) + ' ... ' : result);
        assert.equal(result.length>10, true);
        done();
      });
    });
  });
});

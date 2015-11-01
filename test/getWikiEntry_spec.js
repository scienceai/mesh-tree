describe.only('get wikipedia text for descriptor UI', function () {
  this.timeout(30*1000);

  describe('D000001', () => {
    it('should return the wikipedia abstract for concept Calcimycin', done => {
      meshTree.getWikiEntry({ id: 'D000001', level: 0 }).then(result => {
        console.log(result.length > 300 ? result.slice(0, 300) + ' ... ' : result);
        assert.equal(result.length>10, true);
        done();
      });
    });

    it('should return the entire wikipedia text for concept Calcimycin', done => {
      meshTree.getWikiEntry({ id: 'D000001', level: 1 }).then(result => {
        console.log(result.length > 300 ? result.slice(0, 300) + ' ... ' : result);
        assert.equal(result.length>10, true);
        done();
      });
    });
  });

  describe('D009369', () => {
    it('should return the wikipedia abstract for concept Neoplasms', done => {
      meshTree.getWikiEntry({ id: 'D009369', level: 0 }).then(result => {
        console.log(result.length > 300 ? result.slice(0, 300) + ' ... ' : result);
        assert.equal(result.length>10, true);
        done();
      });
    });

    it('should return the entire wikipedia text for concept Neoplasms', done => {
      meshTree.getWikiEntry({ id: 'D009369', level: 1 }).then(result => {
        console.log(result.length > 300 ? result.slice(0, 300) + ' ... ' : result);
        assert.equal(result.length>10, true);
        done();
      });
    });
  });

  describe('D005138', () => {
    it('should return the wikipedia abstract for concept Eyebrows', done => {
      meshTree.getWikiEntry({ id: 'D005138', level: 0 }).then(result => {
        console.log(result.length > 300 ? result.slice(0, 300) + ' ... ' : result);
        assert.equal(result.length>10, true);
        done();
      });
    });

    it('should return the entire wikipedia text for concept Eyebrows', done => {
      meshTree.getWikiEntry({ id: 'D005138', level: 1 }).then(result => {
        console.log(result.length > 300 ? result.slice(0, 300) + ' ... ' : result);
        assert.equal(result.length>10, true);
        done();
      });
    });
  });
});

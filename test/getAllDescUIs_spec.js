describe('getAllDescUIs', function () {
  this.timeout(10*1000);

  describe('get array of all descriptors as MeSH uis', () => {
    let allDescUIs;

    before(done => {
      meshTree.getAllDescUIs({ format: 'mesh' }).then(result => {
        allDescUIs = result;
        done();
      });
    });

    it('should return an array', () => {
      expect(allDescUIs).to.be.instanceOf(Array);
    });

    it('should contain 26912 elements', () => {
      expect(allDescUIs.length).to.eql(26912);
    });

    it('should include D000001', () => {
      expect(allDescUIs).to.include('D000001');
    });

    it('should include D009369', () => {
      expect(allDescUIs).to.include('D009369');
    });

    it('should include D005138', () => {
      expect(allDescUIs).to.include('D005138');
    });

  });

  describe('get array of all descriptors as RDF ids', () => {
    let allDescUIs;

    before(done => {
      meshTree.getAllDescUIs({ format: 'rdf' }).then(result => {
        allDescUIs = result;
        done();
      });
    });

    it('should return an array', () => {
      expect(allDescUIs).to.be.instanceOf(Array);
    });

    it('should contain 26912 elements', () => {
      expect(allDescUIs.length).to.eql(26912);
    });

    it('should include http://id.nlm.nih.gov/mesh/D000001', () => {
      expect(allDescUIs).to.include('http://id.nlm.nih.gov/mesh/D000001');
    });

    it('should include http://id.nlm.nih.gov/mesh/D009369', () => {
      expect(allDescUIs).to.include('http://id.nlm.nih.gov/mesh/D009369');
    });

    it('should include http://id.nlm.nih.gov/mesh/D005138', () => {
      expect(allDescUIs).to.include('http://id.nlm.nih.gov/mesh/D005138');
    });

  });

});

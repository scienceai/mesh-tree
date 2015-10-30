describe.only('getAllSCRProtocolUIs', function () {
  this.timeout(5 * 1000);

  describe('get array of all protocol (e.g., cancer-related) supplement records as MeSH uis', () => {
    let allSCRProtocolUIs;

    before(done => {
      meshTree.getAllSCRProtocolUIs({ format: 'mesh' }).then(result => {
        allSCRProtocolUIs = result;
        done();
      });
    });

    it('should return an array', () => {
      expect(allSCRProtocolUIs).to.be.instanceOf(Array);
    });

    it('should contain 1212 elements', () => {
      expect(allSCRProtocolUIs.length).to.eql(1212);
    });

    it('should include C510854', () => {
      expect(allSCRProtocolUIs).to.include('C510854');
    });

  });

  describe('get array of all protocol (e.g., cancer-related) supplement records as RDF ids', () => {
    let allSCRProtocolUIs;

    before(done => {
      meshTree.getAllSCRProtocolUIs({ format: 'rdf' }).then(result => {
        allSCRProtocolUIs = result;
        done();
      });
    });

    it('should return an array', () => {
      expect(allSCRProtocolUIs).to.be.instanceOf(Array);
    });

    it('should contain 1212 elements', () => {
      expect(allSCRProtocolUIs.length).to.eql(1212);
    });

    it('should include http://id.nlm.nih.gov/mesh/C510854', () => {
      expect(allSCRProtocolUIs).to.include('http://id.nlm.nih.gov/mesh/C510854');
    });

  });

});

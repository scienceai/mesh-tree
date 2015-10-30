describe('getAllSCRDiseaseUIs', function () {
  this.timeout(5 * 1000);

  describe('get array of all disease (rare) supplement records as MeSH uis', () => {
    let allSCRDiseaseUIs;

    before(done => {
      meshTree.getAllSCRDiseaseUIs({ format: 'mesh' }).then(result => {
        allSCRDiseaseUIs = result;
        done();
      });
    });

    it('should return an array', () => {
      expect(allSCRDiseaseUIs).to.be.instanceOf(Array);
    });

    it('should contain 6582 elements', () => {
      expect(allSCRDiseaseUIs.length).to.eql(6582);
    });

    it('should include C580359', () => {
      expect(allSCRDiseaseUIs).to.include('C580359');
    });

  });

  describe('get array of all disease (rare) supplement records as RDF ids', () => {
    let allSCRDiseaseUIs;

    before(done => {
      meshTree.getAllSCRDiseaseUIs({ format: 'rdf' }).then(result => {
        allSCRDiseaseUIs = result;
        done();
      });
    });

    it('should return an array', () => {
      expect(allSCRDiseaseUIs).to.be.instanceOf(Array);
    });

    it('should contain 6582 elements', () => {
      expect(allSCRDiseaseUIs.length).to.eql(6582);
    });

    it('should include http://id.nlm.nih.gov/mesh/C580359', () => {
      expect(allSCRDiseaseUIs).to.include('http://id.nlm.nih.gov/mesh/C580359');
    });

  });

});

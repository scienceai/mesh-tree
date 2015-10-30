describe('getAllSCRChemicalUIs', function () {
  this.timeout(100 * 1000);

  describe('get array of all chemical supplement records as MeSH uis', () => {
    let allChemUIs;

    before(done => {
      meshTree.getAllSCRChemicalUIs({ format: 'mesh' }).then(result => {
        allChemUIs = result;
        done();
      });
    });

    it('should return an array', () => {
      expect(allChemUIs).to.be.instanceOf(Array);
    });

    it('should contain 222666 elements', () => {
      expect(allChemUIs.length).to.eql(222666);
    });

    it('should include C025735', () => {
      expect(allChemUIs).to.include('C025735');
    });

  });

  describe('get array of all chemical supplement records as RDF ids', () => {
    let allChemUIs;

    before(done => {
      meshTree.getAllSCRChemicalUIs({ format: 'rdf' }).then(result => {
        allChemUIs = result;
        done();
      });
    });

    it('should return an array', () => {
      expect(allChemUIs).to.be.instanceOf(Array);
    });

    it('should contain 222666 elements', () => {
      expect(allChemUIs.length).to.eql(222666);
    });

    it('should include http://id.nlm.nih.gov/mesh/C025735', () => {
      expect(allChemUIs).to.include('http://id.nlm.nih.gov/mesh/C025735');
    });

  });

});


// getAllSCRDiseaseUIs
describe('get array of all disease (rare) supplement record UIs', function () {

  var allSCRDiseaseUIs;

  before(function (done) {
    this.timeout(15000);
    meshTree.getAllSCRDiseaseUIs().then(function (result) {
      allSCRDiseaseUIs = result;
      done();
    });
  });

  it('should return an array', function () {
    expect(allSCRDiseaseUIs).to.be.instanceOf(Array);
  })
  it('should contain 6582 elements', function () {
    expect(allSCRDiseaseUIs.length).to.eql(6582);
  })
  it('should include C580359', function () {
    expect(allSCRDiseaseUIs).to.include('C580359');
  })

});

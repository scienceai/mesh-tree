
// getAllSCRChemicalUIs
describe('get array of all chemical supplement record UIs', function () {

  var allChemUIs;

  before(function (done) {
    this.timeout(15000);
    meshTree.getAllSCRChemicalUIs().then(function (result) {
      allChemUIs = result;
      done();
    });
  });

  it('should return an array', function () {
    expect(allChemUIs).to.be.instanceOf(Array);
  })
  it('should contain 222666 elements', function () {
    expect(allChemUIs.length).to.eql(222666);
  })
  it('should include C025735', function () {
    expect(allChemUIs).to.include('C025735');
  })

});


// getAllSCRProtocolUIs
describe('get array of all protocol (e.g., cancer-related) supplement record UIs', function () {

  var allSCRProtocolUIs;

  before(function (done) {
    this.timeout(15000);
    meshTree.getAllSCRProtocolUIs().then(function (result) {
      allSCRProtocolUIs = result;
      done();
    });
  });

  it('should return an array', function () {
    expect(allSCRProtocolUIs).to.be.instanceOf(Array);
  })
  it('should contain 1212 elements', function () {
    expect(allSCRProtocolUIs.length).to.eql(1212);
  })
  it('should include C510854', function () {
    expect(allSCRProtocolUIs).to.include('C510854');
  })

});

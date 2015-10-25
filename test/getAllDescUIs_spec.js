
// getAllDescUIs
describe('get array of all descriptor UIs', function () {
  this.timeout(30*1000);

  var allDescUIs;

  before(function (done) {
    setTimeout(() => {
    meshTree.getAllDescUIs().then(function (result) {
      allDescUIs = result;
      done();
    });
  },1000);
  });

  it('should return an array', function () {
    expect(allDescUIs).to.be.instanceOf(Array);
  });
  it('should contain 26912 elements', function () {
    expect(allDescUIs.length).to.eql(26912);
  });
  it('should include D000001', function () {
    expect(allDescUIs).to.include('D000001');
  });
  it('should include D009369', function () {
    expect(allDescUIs).to.include('D009369');
  });
  it('should include D005138', function () {
    expect(allDescUIs).to.include('D005138');
  });

});

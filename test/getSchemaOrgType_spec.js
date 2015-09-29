
// getSchemaOrgTypes
describe('get schema.org types', function () {
  describe('D000001', function () {
    var resultExpected = 'Drug';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D000001').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });
});

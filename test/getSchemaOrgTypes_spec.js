
// getSchemaOrgTypes
describe('get schema.org types', function () {
  describe('D000001', function () {
    var resultExpected = ['Drug'];
    it('should return: ' + resultExpected.toString(), function (done) {
      meshTree.getSchemaOrgTypes('D000001').then(function (result) {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });
});

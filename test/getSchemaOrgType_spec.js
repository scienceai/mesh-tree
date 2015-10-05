
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

  describe('D000926', function () {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D000926').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D001583', function () {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D001583').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D005123', function () {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D005123').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D005138', function () {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D005138').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D006197', function () {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D006197').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D007759', function () {
    var resultExpected = 'MedicalCondition';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D007759').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D007762', function () {
    var resultExpected = 'MedicalCondition';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D007762').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D009369', function () {
    var resultExpected = 'MedicalCondition';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D009369').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D011434', function () {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D011434').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D012343', function () {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D012343').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D012345', function () {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D012345').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D012346', function () {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D012346').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D012677', function () {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D012677').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D013514', function () {
    var resultExpected = 'MedicalProcedure';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D013514').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D013517', function () {
    var resultExpected = 'MedicalProcedure';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D013517').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D015834', function () {
    var resultExpected = 'MedicalCondition';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D015834').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D015837', function () {
    var resultExpected = 'MedicalCondition';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D015837').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D018159', function () {
    var resultExpected = 'MedicalCondition';
    it('should return: ' + resultExpected, function (done) {
      meshTree.getSchemaOrgType('D018159').then(function (result) {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });


});

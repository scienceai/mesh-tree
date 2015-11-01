describe('get schema.org types', function () {
  describe('D000001', () => {
    var resultExpected = 'Drug';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D000001' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('http://id.nlm.nih.gov/mesh/D000001', () => {
    var resultExpected = 'Drug';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'http://id.nlm.nih.gov/mesh/D000001' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D000926', () => {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D000926' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D001583', () => {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D001583' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D005123', () => {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D005123' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D005138', () => {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D005138' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D006197', () => {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D006197' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D007759', () => {
    var resultExpected = 'MedicalCondition';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D007759' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D007762', () => {
    var resultExpected = 'MedicalCondition';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D007762' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D009369', () => {
    var resultExpected = 'MedicalCondition';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D009369' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D011434', () => {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D011434' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D012343', () => {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D012343' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D012345', () => {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D012345' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D012346', () => {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D012346' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D012677', () => {
    var resultExpected = 'MedicalEntity';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D012677' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D013514', () => {
    var resultExpected = 'MedicalProcedure';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D013514' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D013517', () => {
    var resultExpected = 'MedicalProcedure';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D013517' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D015834', () => {
    var resultExpected = 'MedicalCondition';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D015834' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D015837', () => {
    var resultExpected = 'MedicalCondition';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D015837' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });

  describe('D018159', () => {
    var resultExpected = 'MedicalCondition';
    it('should return: ' + resultExpected, done => {
      meshTree.getSchemaOrgType({ id: 'D018159' }).then(result => {
        assert.strictEqual(result, resultExpected);
        done();
      });
    });
  });


});

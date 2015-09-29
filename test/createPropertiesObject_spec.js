
// createPropertiesObject
describe('create properties object', function () {
  describe('D000001', function () {
    var resultExpected = {
      '@id': 'http://id.nlm.nih.gov/mesh/D000001',
      'codeValue': 'D000001',
      'codingSystem': 'MeSH',
      'description': 'An ionophorous, polyether antibiotic from Streptomyces chartreusensis. It binds and transports CALCIUM and other divalent cations across membranes and uncouples oxidative phosphorylation while inhibiting ATPase of rat liver mitochondria. The substance is used mostly as a biochemical tool to study the role of divalent cations in various biological systems.',
      'name': 'Calcimycin',
      'schemaOrgType': 'Drug',
      'synonyms': ['A23187, Antibiotic', 'Antibiotic A23187', 'A23187', 'A 23187', 'A-23187']
    };
    it('should return: ' + JSON.stringify(resultExpected), function (done) {
      meshTree.createPropertiesObject({
        '@id': 'http://id.nlm.nih.gov/mesh/D000001',
        properties: ['name','description','synonyms','schemaOrgType','codeValue','codingSystem']
      }).then(function (result) {
        assert.deepEqual(result, resultExpected);
        done();
      });
    });
  });
});

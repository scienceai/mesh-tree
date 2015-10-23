
// clusterDescUIs
describe('cluster a list of descriptor record UIs based on the ontology tree', function () {

  describe('D012345 (RNA, Transfer, Amino Acid-Specific), D000926 (Anticodon), D012343 (RNA, Transfer)', function () {

    var resultExpected = [
      {
        "@id": "http://id.nlm.nih.gov/mesh/D012343",
        "parent": null,
        "mostSpecificConcept": false,
        "children": [
          {
            "@id": "http://id.nlm.nih.gov/mesh/D012345",
            "parent": "http://id.nlm.nih.gov/mesh/D012343",
            "mostSpecificConcept": false
          },
          {
            "@id": "http://id.nlm.nih.gov/mesh/D000926",
            "parent": "http://id.nlm.nih.gov/mesh/D012343",
            "mostSpecificConcept": true
          }
        ]
      }
    ];

    it('should return the correct nested tree structure of parent-child relationships', function (done) {

      meshTree.clusterDescUIs(['http://id.nlm.nih.gov/mesh/D012345', 'http://id.nlm.nih.gov/mesh/D000926', 'http://id.nlm.nih.gov/mesh/D012343']).then(function (result) {
        console.log(JSON.stringify(result, null, 2));
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('D000233 (Adenoidectomy), D014068 (Tonsillectomy), D007828 (Laryngoscopy), D013517 (Otorhinolaryngologic Surgical Procedures)', function () {

    var resultExpected = [
      {
        "@id": "http://id.nlm.nih.gov/mesh/D013517",
        "parent": null,
        "mostSpecificConcept": false,
        "children": [
          {
            "@id": "http://id.nlm.nih.gov/mesh/D000233",
            "parent": "http://id.nlm.nih.gov/mesh/D013517",
            "mostSpecificConcept": true
          },
          {
            "@id": "http://id.nlm.nih.gov/mesh/D014068",
            "parent": "http://id.nlm.nih.gov/mesh/D013517",
            "mostSpecificConcept": true
          },
          {
            "@id": "http://id.nlm.nih.gov/mesh/D007828",
            "parent": "http://id.nlm.nih.gov/mesh/D013517",
            "mostSpecificConcept": true
          }
        ]
      }
    ];

    it('should return the correct nested tree structure of parent-child relationships', function (done) {

      meshTree.clusterDescUIs(['http://id.nlm.nih.gov/mesh/D000233', 'http://id.nlm.nih.gov/mesh/D014068', 'http://id.nlm.nih.gov/mesh/D007828', 'http://id.nlm.nih.gov/mesh/D013517']).then(function (result) {
        console.log(JSON.stringify(result, null, 2));
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

  describe('D011434 (Proprioception), D014785 (Vision, Ocular), D004856 (Postural Balance)', function () {

    var resultExpected = [
      {
        "@id": "http://id.nlm.nih.gov/mesh/D011434",
        "parent": null,
        "mostSpecificConcept": false,
        "children": [
          {
            "@id": "http://id.nlm.nih.gov/mesh/D004856",
            "parent": "http://id.nlm.nih.gov/mesh/D011434",
            "mostSpecificConcept": true
          }
        ]
      },
      {
        "@id": "http://id.nlm.nih.gov/mesh/D014785",
        "parent": null,
        "mostSpecificConcept": false
      }
    ];

    it('should return the correct nested tree structure of parent-child relationships', function (done) {

      meshTree.clusterDescUIs(['http://id.nlm.nih.gov/mesh/D011434', 'http://id.nlm.nih.gov/mesh/D014785', 'http://id.nlm.nih.gov/mesh/D004856']).then(function (result) {
        console.log(JSON.stringify(result, null, 2));
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    });
  });

});

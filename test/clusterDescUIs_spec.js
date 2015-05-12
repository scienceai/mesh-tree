
// clusterDescUIs
describe('cluster a list of descriptor record UIs based on the ontology tree', function () {

  describe('D012345 (RNA, Transfer, Amino Acid-Specific), D000926 (Anticodon), D012343 (RNA, Transfer)', function () {

    var resultExpected = [
      {
        "descUI": "D012343",
        "parent": null,
        "children": [
          {
            "descUI": "D012345",
            "parent": "D012343"
          },
          {
            "descUI": "D000926",
            "parent": "D012343"
          }
        ]
      }
    ];

    it('should return the correct nested tree structure of parent-child relationships', function (done) {

      meshTree.clusterDescUIs(['D012345', 'D000926', 'D012343']).then(function (result) {
        console.log(JSON.stringify(result, null, 2));
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })

  describe('D000233 (Adenoidectomy), D014068 (Tonsillectomy), D007828 (Laryngoscopy), D013517 (Otorhinolaryngologic Surgical Procedures)', function () {

    var resultExpected = [
      {
        "descUI": "D013517",
        "parent": null,
        "children": [
          {
            "descUI": "D000233",
            "parent": "D013517"
          },
          {
            "descUI": "D014068",
            "parent": "D013517"
          },
          {
            "descUI": "D007828",
            "parent": "D013517"
          }
        ]
      }
    ];

    it('should return the correct nested tree structure of parent-child relationships', function (done) {

      meshTree.clusterDescUIs(['D000233', 'D014068', 'D007828', 'D013517']).then(function (result) {
        console.log(JSON.stringify(result, null, 2));
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })

  describe('D011434 (Proprioception), D014785 (Vision, Ocular), D004856 (Postural Balance)', function () {

    var resultExpected = [
      {
        "descUI": "D011434",
        "parent": null,
        "children": [
          {
            "descUI": "D004856",
            "parent": "D011434"
          }
        ]
      },
      {
        "descUI": "D014785",
        "parent": null
      }
    ];

    it('should return the correct nested tree structure of parent-child relationships', function (done) {

      meshTree.clusterDescUIs(['D011434', 'D014785', 'D004856']).then(function (result) {
        console.log(JSON.stringify(result, null, 2));
        assert.deepEqual(result.sort(), resultExpected.sort());
        done();
      });
    })
  })

});

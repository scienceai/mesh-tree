'use strict';

var levelgraph = require('levelgraph')
  , levelgraphN3 = require('levelgraph-n3')
  , db = levelgraphN3(levelgraph('./db'))
  , _ = require('lodash')
  , async = require('async');

const mesh = 'http://id.nlm.nih.gov/mesh/'
  , meshv = 'http://id.nlm.nih.gov/mesh/vocab#'
  , rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
  , rdfs = 'http://www.w3.org/2000/01/rdf-schema#';

var meshTreeFuncs = {

  /*
  * Returns array of tree numbers by descriptor record unique identifier
  * 
  * Example: 'D000001' returns ['D03.438.221.173']
  */
  getTreeNumbersByDescUI: function (desc_ui) {
    // example desc_ui: D009369
    return new Promise(function (resolve, reject) {
      db.search(
        {
          subject: mesh + desc_ui,
          predicate: meshv + 'treeNumber',
          object: db.v('treeNumber')
        }, {}, function (err, result) {
          if (err) reject(err);
          var treeNumbers = _.map(result, function (item) {
            return item['treeNumber'].replace(mesh, '');
          });
          resolve(treeNumbers);
        }
      );
    });
  },

  /*
  * Returns descriptor record unique identifier by tree number
  * 
  * Example: 'D03.438.221.173' returns 'D000001'
  */
  getDescUIByTreeNumber: function (tree_num) {
    // example tree_num: 'D03.438.221.173'
    return new Promise(function (resolve, reject) {
      db.search(
        {
          subject: db.v('descUI'),
          predicate: meshv + 'treeNumber',
          object: mesh + tree_num
        }, {}, function (err, result) {
          if (err) reject(err);
          if (_.isEmpty(result)) reject('None returned.');
          resolve(result[0]['descUI'].replace(mesh, ''));
        }
      );
    });
  },

  /*
  * Returns the record preferred term by descriptor record unique identifier 
  * (i.e., the preferred term of the preferred concept)
  * 
  * Example: 'D000001' returns 'Calcimycin'
  */
  getRecordPreferredTermByDescUI: function (desc_ui) {
    // example desc_ui: D009369
    return new Promise(function (resolve, reject) {
      db.search(
        {
          subject: mesh + desc_ui,
          predicate: meshv + 'recordPreferredTerm',
          object: db.v('recordPreferredTermUI')
        }, {}, function (err, result) {
          if (err) reject(err);
          db.search(
            {
              subject: result[0]['recordPreferredTermUI'],
              predicate: meshv + 'prefLabel',
              object: db.v('term')
            }, {}, function (err, result) {
              if (err) reject(err);
              if (_.isEmpty(result)) reject('None returned.');
              resolve(result[0]['term']);
            }
          );
        }
      );
    });
  },

  /*
  * Returns preferred concept UI for descriptor record UI
  * 
  * Example: 'D000001' returns 'M0000001'
  */
  getPreferredConceptByDescUI: function (desc_ui) {
    // example desc_ui: D009369
    return new Promise(function (resolve, reject) {

      db.search(
        {
          subject: mesh + desc_ui,
          predicate: meshv + 'preferredConcept',
          object: db.v('conceptUI')
        }, {}, function (err, result) {
          if (err) reject(err);
          if (_.isEmpty(result)) reject('None returned.');
          resolve(result[0]['conceptUI'].replace(mesh, ''));
        }
      );

    });

  },

  /*
  * Returns all concept UIs contained by descriptor record UI
  * (both preferred and not)
  * 
  * Example: 'D000001' returns [ 'M0353609', 'M0000001' ]
  */
  getConceptUIsByDescUI: function (desc_ui) {
    // example desc_ui: D009369
    return new Promise(function (resolve, reject) {

      async.map(['concept', 'preferredConcept'], function (pred, callback) {
        db.search(
          {
            subject: mesh + desc_ui,
            predicate: meshv + pred,
            object: db.v('conceptUI')
          }, {}, function (err, result) {
            if (err) callback(true, err);
            var conceptUIs = _.map(result, function (item) {
              return item['conceptUI'];
            });
            callback(null, conceptUIs);
          }
        );
      }, function (err, results) {
        if (err) reject(err);
        var allConceptUIs = _.map(_.flatten(results), function (item) {
            return item.replace(mesh, '');
        });
        resolve(allConceptUIs);
      });

    });

  },

  /*
  * Returns all term UIs contained by concept UI
  * (both preferred and not)
  * 
  * Example: 'M0353609' returns [ 'T000003', 'T000004', 'T000001' ]
  */
  getTermUIsByConceptUI: function (concept_ui) {
    // example concept_ui: M0353609
    return new Promise(function (resolve, reject) {

      async.map(['term', 'preferredTerm'], function (pred, callback) {
        db.search(
          {
            subject: mesh + concept_ui,
            predicate: meshv + pred,
            object: db.v('termUI')
          }, {}, function (err, result) {
            if (err) callback(true, err);
            var termUIs = _.map(result, function (item) {
              return item['termUI'];
            });
            callback(null, termUIs);
          }
        );
      }, function (err, results) {
        if (err) reject(err);
        var allTermUIs = _.map(_.flatten(results), function (item) {
            return item.replace(mesh, '');
        });
        resolve(allTermUIs);
      });

    });

  },

  /*
  * Returns all terms contained by term UI
  * (both preferred and not)
  * 
  * Example: 'T000003' returns [ '"A23187, Antibiotic"', '"Antibiotic A23187"' ]
  */
  getTermsByTermUI: function (term_ui) {
    // example term_ui: T000003
    return new Promise(function (resolve, reject) {

      async.map(['label', 'altLabel', 'prefLabel'], function (pred, callback) {
        db.search(
          {
            subject: mesh + term_ui,
            predicate: meshv + pred,
            object: db.v('label')
          }, {}, function (err, result) {
            if (err) callback(true, err);
            var labels = _.map(result, function (item) {
              return item['label'];
            });
            callback(null, labels);
          }
        );
      }, function (err, results) {
        if (err) reject(err);
        var allLabels = _.map(_.flatten(results), function (item) {
            return item;
        });
        resolve(allLabels);
      });

    });

  },

  /*
  * Returns all terms by descriptor record unique identifier 
  * (i.e., all terms for all concepts, both preferred and not)
  * 
  * Example: 'D000001' returns [ '"A23187, Antibiotic"', '"Antibiotic A23187"', '"A23187"', '"A 23187"', '"A-23187"', '"Calcimycin"' ]
  */
  getAllTermsByDescUI: function (desc_ui) {
    // example desc_ui: D009369
    let promise_conceptUIs = this.getConceptUIsByDescUI;
    let promise_termUIs = this.getTermUIsByConceptUI;
    let promise_labels = this.getTermsByTermUI;

    return new Promise(function (resolve, reject) {

      promise_conceptUIs(desc_ui).then(function (conceptUIs) {

        async.map(conceptUIs, function (conceptUI, callback) {
          promise_termUIs(conceptUI).then(function (termUIs) {
            callback(null, termUIs);
          })
        }, function (err, results) {
          if (err) reject(err);

          async.map(_.flatten(results), function (termUI, callback) {
            promise_labels(termUI).then(function (labels) {
              callback(null, labels)
            })
          }, function (err, results) {
            if (err) reject(err);

            resolve(_.flatten(results));
          });

        });
      });
    });
  },

  /*
  * Returns scope note for descriptor record unique identifier
  * (scope notes are contained in the preferred concept record)
  * 
  * Example: 'D000001', via concept 'M0000001', returns "An ionophorous, polyether antibiotic from Streptomyces chartreusensis. It binds and transports CALCIUM and other divalent cations across membranes and uncouples oxidative phosphorylation while inhibiting ATPase of rat liver mitochondria. The substance is used mostly as a biochemical tool to study the role of divalent cations in various biological systems."
  */
  getScopeNoteByDescUI: function (desc_ui) {
    // example desc_ui: D009369
    let promise_conceptUI = this.getPreferredConceptByDescUI;

    return new Promise(function (resolve, reject) {

      promise_conceptUI(desc_ui).then(function (conceptUI) {

        db.search(
          {
            subject: mesh + conceptUI,
            predicate: meshv + 'scopeNote',
            object: db.v('scopeNote')
          }, {}, function (err, result) {
            if (err) reject(err);
            if (_.isEmpty(result)) {
              resolve('');
            } else {
              resolve(result[0]['scopeNote']);
            }
          }
        );

      });
    });
  },

  /*
  * Returns parent descriptor records UIs
  * (returns an array as records can exist in multiple tree branches)
  * 
  * Example: 'D000001' returns ['D001583']
  *          'D005138' returns ['D006197', 'D005123']
  */
  getParentDescUIsForDescUI: function (desc_ui) {
    // example desc_ui: D009369
    let promise_treeNums = this.getTreeNumbersByDescUI;
    let promise_descUI = this.getDescUIByTreeNumber;

    return new Promise(function (resolve, reject) {

      promise_treeNums(desc_ui).then(function (treeNums) {

        async.map(treeNums, function (treeNum, callback) {

          db.search(
            {
              subject: mesh + treeNum,
              predicate: meshv + 'broaderTransitive',
              object: db.v('treeNum')
            }, {}, function (err, result) {
              if (err) callback(true, err);
              if (_.isEmpty(result)) {
                callback(null, []);
              } else {
                promise_descUI(result[0]['treeNum'].replace(mesh, '')).then(function (descUI) {
                  callback(null, descUI);
                });
              }
            }
          );

        }, function (err, results) {
          if (err) reject(err);
          resolve(_.flatten(results));
        });

      });
    });
  },

};

module.exports = meshTreeFuncs;
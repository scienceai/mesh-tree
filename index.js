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
              resolve(result[0]['term']);
            }
          );
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
    var promise_conceptUIs = this.getConceptUIsByDescUI;
    var promise_termUIs = this.getTermUIsByConceptUI;
    var promise_labels = this.getTermsByTermUI;

    return new Promise(function (resolve, reject) {

      promise_conceptUIs(desc_ui).then(function (conceptUIs) {

        async.map(conceptUIs, function (conceptUI, callback) {
          promise_termUIs(conceptUI).then(function (termUIs) {
            callback(null, termUIs);
          })
        }, function (err, results) {

          async.map(_.flatten(results), function (termUI, callback) {
            promise_labels(termUI).then(function (labels) {
              callback(null, labels)
            })
          }, function (err, results) {
            resolve(_.flatten(results));
          });

        });
      });
    });
  },

};

module.exports = meshTreeFuncs;
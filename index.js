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
  getTreeNumbersByDescUI: function (ui) {
    // example ui: D009369
    return new Promise(function (resolve, reject) {
      db.search(
        {
          subject: mesh + ui,
          predicate: meshv + 'treeNumber',
          object: db.v('treeNumber')
        }, {}, function(err, result) {
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
  getRecordPreferredTermByDescUI: function (ui) {
    // example ui: D009369
    return new Promise(function (resolve, reject) {
      db.search(
        {
          subject: mesh + ui,
          predicate: meshv + 'recordPreferredTerm',
          object: db.v('recordPreferredTermUI')
        }, {}, function(err, result) {
          if (err) reject(err);
          db.search(
            {
              subject: result[0]['recordPreferredTermUI'],
              predicate: meshv + 'prefLabel',
              object: db.v('term')
            }, {}, function(err, result) {
              if (err) reject(err);
              resolve(result[0]['term']);
            }
          );
        }
      );
    });
  },

  getConceptUIsByDescUI: function (ui) {
    return new Promise(function (resolve, reject) {

      async.map(['concept', 'preferredConcept'], function (pred, callback) {
        db.search(
          {
            subject: mesh + ui,
            predicate: meshv + pred,
            object: db.v('conceptUI')
          }, {}, function(err, result) {
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

  getTermUIsByConceptUI: function (ui) {
    return new Promise(function (resolve, reject) {

      async.map(['term', 'preferredTerm'], function (pred, callback) {
        db.search(
          {
            subject: mesh + ui,
            predicate: meshv + pred,
            object: db.v('termUI')
          }, {}, function(err, result) {
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

  getTermsByTermUI: function (ui) {
    return new Promise(function (resolve, reject) {

      async.map(['label', 'altLabel', 'prefLabel'], function (pred, callback) {
        db.search(
          {
            subject: mesh + ui,
            predicate: meshv + pred,
            object: db.v('label')
          }, {}, function(err, result) {
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
  getAllTermsByDescUI: function (ui) {
    // example ui: D009369
    var promise_conceptUIs = this.getConceptUIsByDescUI;
    var promise_termUIs = this.getTermUIsByConceptUI;
    var promise_labels = this.getTermsByTermUI;

    return new Promise(function (resolve, reject) {

      promise_conceptUIs(ui).then(function (conceptUIs) {

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
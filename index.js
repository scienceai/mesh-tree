'use strict';

var levelgraph = require('levelgraph')
  , levelgraphN3 = require('levelgraph-n3')
  , db = levelgraphN3(levelgraph('./db'))
  , _ = require('lodash')
  , Bluebird = require('bluebird');

var dbSearch = Bluebird.promisify(db.search);

var wikipedia = require('./lib/wikipedia')
  , permutations = require('./lib/permutations');

const mesh = 'http://id.nlm.nih.gov/mesh/'
  , meshv = 'http://id.nlm.nih.gov/mesh/vocab#'
  , rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
  , rdfs = 'http://www.w3.org/2000/01/rdf-schema#';

var meshTreeFuncs = {

  /*
  * Returns array of all descriptor record UIs
  */
  getAllDescUIs: function* () {

    try {

      let result = yield dbSearch({
        subject: db.v('desc'),
        predicate: rdf + 'type',
        object: meshv + 'TopicalDescriptor'
      }, {});

      let allDescUIs = _.map(result, (item) => item['desc'].replace(mesh, ''));
      return allDescUIs; 

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns array of all chemical supplementary record UIs
  */
  getAllChemUIs: function* () {

    try {

      let result = yield dbSearch({
        subject: db.v('chem'),
        predicate: rdf + 'type',
        object: meshv + 'SCR_Chemical'
      }, {});

      let allChemUIs = _.map(result, (item) => item['chem'].replace(mesh, ''));
      return allChemUIs; 

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns the cleaned text output of the wikipedia page corresponding to the descriptor record UI
  * 
  * `level`:
  *   `0` - abstract only
  *   `1` - all text
  */
  getWikipediaEntryByDescUI: function* (args) {

    let [desc_ui, level] = args;

    try {

      let concept = yield this.getRecordPreferredTermByDescUI(desc_ui);
      let wiki = yield wikipedia.getMainSections(concept.replace(/ /g, '+'));

      if (level === 0) {

        let text = '';
        _.each(wiki, (section) => {
          if (section.sectionLevel === 0) {
            text += section.sectionText;
          }
        });

        // if no abstract, just return everything as if level = 1
        if (text.length === 0) {
          _.each(wiki, (section) => {
            text += section.sectionText;
          });
        } 

        return text;

      } else {

        let text = '';
        _.each(wiki, (section) => {
          text += section.sectionText;
        });

        return text;

      }

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns array of tree numbers by descriptor record unique identifier
  * 
  * Example: 'D000001' returns ['D03.438.221.173']
  */
  getTreeNumbersByDescUI: function* (desc_ui) {

    try {

      let result = yield dbSearch({
        subject: mesh + desc_ui,
        predicate: meshv + 'treeNumber',
        object: db.v('treeNumber')
      }, {});

      let treeNumbers = _.map(result, (item) => item['treeNumber'].replace(mesh, ''));
      return treeNumbers;

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns descriptor record unique identifier by tree number
  * 
  * Example: 'D03.438.221.173' returns 'D000001'
  */
  getDescUIByTreeNumber: function* (tree_num) {

    try {

      let result = yield dbSearch({
        subject: db.v('descUI'),
        predicate: meshv + 'treeNumber',
        object: mesh + tree_num
      }, {});
      if (_.isEmpty(result)) throw('empty result.');

      return result[0]['descUI'].replace(mesh, '');

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns the record preferred term by descriptor record unique identifier 
  * (i.e., the preferred term of the preferred concept)
  * 
  * Example: 'D000001' returns 'Calcimycin'
  */
  getRecordPreferredTermByDescUI: function* (desc_ui) {

    try {

      let result1 = yield dbSearch({
        subject: mesh + desc_ui,
        predicate: meshv + 'recordPreferredTerm',
        object: db.v('recordPreferredTermUI')
      }, {});
      if (_.isEmpty(result1)) throw('empty result.');

      let result2 = yield dbSearch({
        subject: result1[0]['recordPreferredTermUI'],
        predicate: meshv + 'prefLabel',
        object: db.v('term')
      }, {});
      if (_.isEmpty(result2)) throw('empty result.');

      return result2[0]['term'].replace(/\"/g, '');

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns preferred concept UI for descriptor record UI
  * 
  * Example: 'D000001' returns 'M0000001'
  */
  getPreferredConceptByDescUI: function* (desc_ui) {

    try {

      let result = yield dbSearch({
        subject: mesh + desc_ui,
        predicate: meshv + 'preferredConcept',
        object: db.v('conceptUI')
      }, {});
      if (_.isEmpty(result)) throw('empty result.');

      return result[0]['conceptUI'].replace(mesh, '');

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns all concept UIs contained by descriptor record UI
  * (both preferred and not)
  * 
  * Example: 'D000001' returns [ 'M0353609', 'M0000001' ]
  */
  getConceptUIsByDescUI: function* (desc_ui) {

    try {

      let allConceptUIs = [];

      for (let pred of ['concept', 'preferredConcept']) {

        let result = yield dbSearch({
          subject: mesh + desc_ui,
          predicate: meshv + pred,
          object: db.v('conceptUI')
        }, {});

        result.forEach((item) => allConceptUIs.push(item['conceptUI'].replace(mesh, '')));

      }

      return allConceptUIs;

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns all term UIs contained by concept UI
  * (both preferred and not)
  * 
  * Example: 'M0353609' returns [ 'T000003', 'T000004', 'T000001' ]
  */
  getTermUIsByConceptUI: function* (concept_ui) {

    try {

      let allTermUIs = [];

      for (let pred of ['term', 'preferredTerm']) {

        let result = yield dbSearch({
          subject: mesh + concept_ui,
          predicate: meshv + pred,
          object: db.v('termUI')
        }, {});

        result.forEach((item) => allTermUIs.push(item['termUI'].replace(mesh, '')));

      }

      return allTermUIs;

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns all terms contained by term UI
  * (both preferred and not)
  * 
  * Example: 'T000003' returns [ 'A23187, Antibiotic', 'Antibiotic A23187' ]
  */
  getTermsByTermUI: function* (term_ui) {

    try {

      let allLabels = [];

      for (let pred of ['label', 'altLabel', 'prefLabel']) {

        let result = yield dbSearch({
          subject: mesh + term_ui,
          predicate: meshv + pred,
          object: db.v('label')
        }, {});

        result.forEach((item) => allLabels.push(item['label'].replace(/\"/g, '')));

      }

      return allLabels;

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns all terms by descriptor record unique identifier 
  * (i.e., all terms for all concepts, both preferred and not)
  * 
  * Example: 'D000001' returns [ 'A23187, Antibiotic', 'Antibiotic A23187', 'A23187', 'A 23187', 'A-23187', 'Calcimycin' ]
  */
  getAllTermsByDescUI: function* (desc_ui) {

    try {

      let allTerms = [];

      let conceptUIs = yield this.getConceptUIsByDescUI(desc_ui);
      for (let concept_ui of conceptUIs) {
        let termUIs = yield this.getTermUIsByConceptUI(concept_ui);
        for (let term_ui of termUIs) {
          let labels = yield this.getTermsByTermUI(term_ui);
          labels.forEach((label) => allTerms.push(label.replace(/\"/g, '')));
        }
      }

      return allTerms;

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns scope note for descriptor record unique identifier
  * (scope notes are contained in the preferred concept record)
  * 
  * Example: 'D000001', via concept 'M0000001', returns 'An ionophorous, polyether antibiotic from Streptomyces chartreusensis. It binds and transports CALCIUM and other divalent cations across membranes and uncouples oxidative phosphorylation while inhibiting ATPase of rat liver mitochondria. The substance is used mostly as a biochemical tool to study the role of divalent cations in various biological systems.'
  */
  getScopeNoteByDescUI: function* (desc_ui) {

    try {

      let concept_ui = yield this.getPreferredConceptByDescUI(desc_ui);

      let result = yield dbSearch({
        subject: mesh + concept_ui,
        predicate: meshv + 'scopeNote',
        object: db.v('scopeNote')
      }, {});

      if (_.isEmpty(result)) {
        return '';
      } else {
        return result[0]['scopeNote'].replace(/\"/g, '');
      }

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns parent descriptor records UIs
  * (returns an array as records can exist in multiple tree branches)
  * 
  * Example: 'D000001' returns ['D001583']
  *          'D005138' returns ['D006197', 'D005123']
  */
  getParentDescUIsForDescUI: function* (desc_ui) {

    try {

      let parentDescUIs = [];

      let treeNums = yield this.getTreeNumbersByDescUI(desc_ui);

      for (let treeNum of treeNums) {

        let result = yield dbSearch({
          subject: mesh + treeNum,
          predicate: meshv + 'broaderTransitive',
          object: db.v('treeNum')
        }, {});

        if (!_.isEmpty(result)) {
          let descUI = yield this.getDescUIByTreeNumber(result[0]['treeNum'].replace(mesh, ''));
          parentDescUIs.push(descUI);
        }

      }

      return parentDescUIs;

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns children descriptor records UIs
  * (immediate, not descendants)
  * 
  * Example: 'D012343' returns ['D012345', 'D000926', 'D012346']
  */
  getChildrenDescUIsForDescUI: function* (desc_ui) {

    try {

      let childrenDescUIs = [];

      let treeNums = yield this.getTreeNumbersByDescUI(desc_ui);

      for (let treeNum of treeNums) {

        let result = yield dbSearch({
          subject: db.v('treeNum'),
          predicate: meshv + 'broaderTransitive',
          object: mesh + treeNum
        }, {});

        if (!_.isEmpty(result)) {
          for (let res of result) {
            let descUI = yield this.getDescUIByTreeNumber(res['treeNum'].replace(mesh, ''));
            childrenDescUIs.push(descUI);
          }
        }

      }

      return childrenDescUIs;

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns sibling descriptor records UIs
  * (across all branches a descriptor record may exist under)
  * 
  * Example: 'D015834' returns ['D012345', 'D000926', 'D012346']
  */
  getSiblingDescUIsForDescUI: function* (desc_ui) {

    try {

      let siblingDescUIs = [];

      let parentDescUIs = yield this.getParentDescUIsForDescUI(desc_ui);

      for (let parent of parentDescUIs) {

        let childrenDescUIs = yield this.getChildrenDescUIsForDescUI(parent);
        _.forEach(childrenDescUIs, (ui) => siblingDescUIs.push(ui));

      }

      _.remove(siblingDescUIs, (ui) => (ui === desc_ui));

      return siblingDescUIs;

    } catch (err) {
      console.log('Error: ' + err);
    }

  },

  /*
  * Returns descriptor records UI of closest common ancestors of two or more descriptor record UIs
  * (if a descriptor exists in more than one place on the tree, there will be more than one common ancestor)
  * 
  * Example: ['D000926', 'D012345'] returns ['D012343']
  */
  getCommonAncestorsForDescUIs: function* (desc_ui_arr) {

    if (!_.isArray(desc_ui_arr)) raise('input not an array.');

    try {

      let commonAncestorsDescUIs = [];
      let commonAncestorsTreeNums = [];

      let treeNums_arr = [];
      for (let desc_ui of desc_ui_arr) {
        let treeNums = yield this.getTreeNumbersByDescUI(desc_ui);
        treeNums_arr.push(treeNums);
      }

      let treeNum_permutations = permutations.apply(null, treeNums_arr);

      for (let permut of treeNum_permutations) {

        let depth = 0;
        let branches = [];
        for (let branch of permut[0].split('.')) {

          let isCommonBranch = _.all(
            _.map(permut.slice(1, permut.length), (x) => (branch === x.split('.')[depth]))
          );

          if (isCommonBranch) {
            branches.push(branch);
            ++depth;
          } else {
            break;
          }
        }
        let commonAncestorTreeNum = branches.join('.');

        // should not be ancestor of common ancestor already in common ancestors array
        let isBroader = _.any(
          _.map(commonAncestorsTreeNums, (t) => _.startsWith(t, commonAncestorTreeNum))
        );

        if (commonAncestorTreeNum && !isBroader) {

          // remove those in common ancestors array that are broader than current
          let indices = [];
          for (let idx = 0; idx < commonAncestorsTreeNums.length; idx++) {
            if (_.startsWith(commonAncestorTreeNum, commonAncestorsTreeNums[idx])) {
              indices.push(idx);
            }
          }
          for (let idx of indices) {
            commonAncestorsDescUIs.splice(idx, 1);
            commonAncestorsTreeNums.splice(idx, 1);
          }

          // add common ancestor to array
          let commonAncestorDescUI = yield this.getDescUIByTreeNumber(commonAncestorTreeNum);
          commonAncestorsDescUIs.push(commonAncestorDescUI);
          commonAncestorsTreeNums.push(commonAncestorTreeNum);

        }

      }

      return commonAncestorsDescUIs;

    } catch (err) {
      console.log('Error: ' + err);
    }

  },



};

module.exports = meshTreeFuncs;
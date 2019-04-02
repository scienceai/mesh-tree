"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _levelgraph = _interopRequireDefault(require("levelgraph"));

var _levelgraphN = _interopRequireDefault(require("levelgraph-n3"));

var _level = _interopRequireDefault(require("level"));

var _lodash = _interopRequireDefault(require("lodash"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var wikipedia = _interopRequireWildcard(require("./helper/wikipedia"));

var _permutations = _interopRequireDefault(require("./helper/permutations"));

var MESH = 'http://id.nlm.nih.gov/mesh/';
var MESHV = 'http://id.nlm.nih.gov/mesh/vocab#';
var RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
var RDFS = 'http://www.w3.org/2000/01/rdf-schema#';

var MeshTree =
/*#__PURE__*/
function () {
  function MeshTree(config) {
    (0, _classCallCheck2.default)(this, MeshTree);
    config = config || {};
    var DB;

    if (config.level) {
      DB = config.level;
    } else {
      var dbPath = config.dbPath || process.env['PATH_TO_MESH_DB'] || 'dbtest';
      DB = (0, _level.default)(dbPath);
    }

    this.db = (0, _levelgraphN.default)((0, _levelgraph.default)(DB));
    this.dbSearch = _bluebird.default.promisify(this.db.search, {
      multiArgs: false
    });
  }

  (0, _createClass2.default)(MeshTree, [{
    key: "formatID",
    value: function formatID(id, format) {
      if (format === 'rdf') {
        if (id.startsWith(MESH)) {
          return id;
        } else {
          return MESH + id;
        }
      } else if (format === 'mesh') {
        if (id.startsWith(MESH)) {
          return id.replace(MESH, '');
        } else {
          return id;
        }
      } else {
        return id;
      }
    }
  }]);
  return MeshTree;
}();
/*
* Returns array of all descriptor records
*
* Four types of descriptor records exist:
* - TopicalDescriptor
* - GeographicalDescriptor
* - PublicationType
* - CheckTag
*
* By default, only TopicalDescriptor and GeographicalDescriptor are included
*/


MeshTree.prototype.getAllDescUIs = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee(opts) {
  var _this = this;

  var format, classes, results, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, cl, result;

  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          opts = opts || {};
          format = opts.format || 'rdf';
          classes = opts.classes || ['TopicalDescriptor', 'GeographicalDescriptor'];
          results = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 7;
          _iterator = classes[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 18;
            break;
          }

          cl = _step.value;
          _context.next = 13;
          return this.dbSearch({
            subject: this.db.v('desc'),
            predicate: RDF + 'type',
            object: MESHV + cl
          }, {});

        case 13:
          result = _context.sent;
          results = results.concat(result);

        case 15:
          _iteratorNormalCompletion = true;
          _context.next = 9;
          break;

        case 18:
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 24:
          _context.prev = 24;
          _context.prev = 25;

          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }

        case 27:
          _context.prev = 27;

          if (!_didIteratorError) {
            _context.next = 30;
            break;
          }

          throw _iteratorError;

        case 30:
          return _context.finish(27);

        case 31:
          return _context.finish(24);

        case 32:
          return _context.abrupt("return", _lodash.default.map(results, function (item) {
            return _this.formatID(item['desc'], format);
          }));

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this, [[7, 20, 24, 32], [25,, 27, 31]]);
}));
/*
* Returns array of all chemical supplementary records
*/

MeshTree.prototype.getAllSCRChemicalUIs = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee2(opts) {
  var _this2 = this;

  var format, result;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          opts = opts || {};
          format = opts.format || 'rdf';
          _context2.next = 4;
          return this.dbSearch({
            subject: this.db.v('chemicalSCR'),
            predicate: RDF + 'type',
            object: MESHV + 'SCR_Chemical'
          }, {});

        case 4:
          result = _context2.sent;
          return _context2.abrupt("return", _lodash.default.map(result, function (item) {
            return _this2.formatID(item['chemicalSCR'], format);
          }));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));
/*
* Returns array of all disease (rare) supplementary records
*/

MeshTree.prototype.getAllSCRDiseaseUIs = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee3(opts) {
  var _this3 = this;

  var format, result;
  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          opts = opts || {};
          format = opts.format || 'rdf';
          _context3.next = 4;
          return this.dbSearch({
            subject: this.db.v('diseaseSCR'),
            predicate: RDF + 'type',
            object: MESHV + 'SCR_Disease'
          }, {});

        case 4:
          result = _context3.sent;
          return _context3.abrupt("return", _lodash.default.map(result, function (item) {
            return _this3.formatID(item['diseaseSCR'], format);
          }));

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
}));
/*
* Returns array of all protocol (e.g., cancer-related) supplementary records
*/

MeshTree.prototype.getAllSCRProtocolUIs = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee4(opts) {
  var _this4 = this;

  var format, result;
  return _regenerator.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          opts = opts || {};
          format = opts.format || 'rdf';
          _context4.next = 4;
          return this.dbSearch({
            subject: this.db.v('protocolSCR'),
            predicate: RDF + 'type',
            object: MESHV + 'SCR_Protocol'
          }, {});

        case 4:
          result = _context4.sent;
          return _context4.abrupt("return", _lodash.default.map(result, function (item) {
            return _this4.formatID(item['protocolSCR'], format);
          }));

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
}));
/*
* Returns the cleaned text output of the wikipedia page corresponding to the descriptor record UI
*
* `level`:
*   `0` - abstract only
*   `1` - all text
*/

MeshTree.prototype.getWikiEntry = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee5(opts) {
  var descUI, level, concept, wiki, text, _text;

  return _regenerator.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          opts = opts || {};
          descUI = this.formatID(opts.id, 'mesh');
          level = opts.level || 0;
          _context5.next = 5;
          return this.getPrefTerm({
            id: descUI
          });

        case 5:
          concept = _context5.sent;
          _context5.next = 8;
          return wikipedia.getMainSections(concept.replace(/ /g, '+'));

        case 8:
          wiki = _context5.sent;

          if (!(level === 0)) {
            _context5.next = 16;
            break;
          }

          text = '';

          _lodash.default.each(wiki, function (section) {
            if (section.sectionLevel === 0) {
              text += section.sectionText;
            }
          }); // if no abstract, just return everything as if level = 1


          if (text.length === 0) {
            _lodash.default.each(wiki, function (section) {
              text += section.sectionText;
            });
          }

          return _context5.abrupt("return", text);

        case 16:
          _text = '';

          _lodash.default.each(wiki, function (section) {
            _text += section.sectionText;
          });

          return _context5.abrupt("return", _text);

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5, this);
}));
/*
* Returns array of tree numbers for descriptor record unique identifier
*
* Example: 'D000001' returns ['D03.438.221.173']
*/

MeshTree.prototype.getTreeNumbers = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee6(opts) {
  var _this5 = this;

  var descUI, format, result, treeNumbers;
  return _regenerator.default.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          opts = opts || {};
          descUI = this.formatID(opts.id, 'mesh');
          format = opts.format || 'rdf';
          _context6.next = 5;
          return this.dbSearch({
            subject: MESH + descUI,
            predicate: MESHV + 'treeNumber',
            object: this.db.v('treeNumber')
          }, {});

        case 5:
          result = _context6.sent;
          treeNumbers = _lodash.default.map(result, function (item) {
            return _this5.formatID(item['treeNumber'], format);
          });
          return _context6.abrupt("return", treeNumbers);

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6, this);
}));
/*
* Returns descriptor record unique identifier by tree number
*
* Example: 'D03.438.221.173' returns 'D000001'
*/

MeshTree.prototype.treeNumberToUI = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee7(opts) {
  var treeNum, format, result;
  return _regenerator.default.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          opts = opts || {};
          treeNum = this.formatID(opts.treeNum, 'mesh');
          format = opts.format || 'rdf';
          _context7.next = 5;
          return this.dbSearch({
            subject: this.db.v('descUI'),
            predicate: MESHV + 'treeNumber',
            object: MESH + treeNum
          }, {});

        case 5:
          result = _context7.sent;

          if (!_lodash.default.isEmpty(result)) {
            _context7.next = 10;
            break;
          }

          return _context7.abrupt("return", null);

        case 10:
          return _context7.abrupt("return", this.formatID(result[0]['descUI'], format));

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7, this);
}));
/*
* Returns top-level MeSH category
*
* Example: 'D000001' returns 'Chemicals and Drugs'
*/

MeshTree.prototype.getCategory = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee8(opts) {
  var descUI, categoryMap, treeNums, categories;
  return _regenerator.default.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          opts = opts || {};
          descUI = this.formatID(opts.id, 'mesh');
          categoryMap = new Map([['A', 'Anatomy'], ['B', 'Organisms'], ['C', 'Diseases'], ['D', 'Chemicals and Drugs'], ['E', 'Analytical, Diagnostic and Therapeutic Techniques and Equipment'], ['F', 'Psychiatry and Psychology'], ['G', 'Phenomena and Processes'], ['H', 'Disciplines and Occupations'], ['I', 'Anthropology, Education, Sociology and Social Phenomena'], ['J', 'Technology, Industry, Agriculture'], ['K', 'Humanities'], ['L', 'Information Science'], ['M', 'Named Groups'], ['N', 'Health Care'], ['V', 'Publication Characteristics'], ['Z', 'Geographicals']]);
          _context8.next = 5;
          return this.getTreeNumbers({
            id: descUI,
            format: 'mesh'
          });

        case 5:
          treeNums = _context8.sent;
          categories = treeNums.map(function (t) {
            return t[0];
          }); // get most represented category if multiply present

          return _context8.abrupt("return", categoryMap.get((0, _lodash.default)(categories).countBy().toPairs().max(function (kv) {
            return kv[1];
          })[0]));

        case 8:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8, this);
}));
/*
* Returns the record preferred term by descriptor record unique identifier
* (i.e., the preferred term of the preferred concept)
*
* Example: 'D000001' returns 'Calcimycin'
*/

MeshTree.prototype.getPrefTerm = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee9(opts) {
  var descUI, result1, result2, result2_en;
  return _regenerator.default.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          opts = opts || {};
          descUI = this.formatID(opts.id, 'mesh');
          _context9.next = 4;
          return this.dbSearch({
            subject: MESH + descUI,
            predicate: MESHV + 'preferredTerm',
            object: this.db.v('preferredTermUI')
          }, {});

        case 4:
          result1 = _context9.sent;
          _context9.next = 7;
          return this.dbSearch({
            subject: result1[0]['preferredTermUI'],
            predicate: MESHV + 'prefLabel',
            object: this.db.v('term')
          }, {});

        case 7:
          result2 = _context9.sent;

          if (!_lodash.default.isEmpty(result2)) {
            _context9.next = 10;
            break;
          }

          return _context9.abrupt("return", null);

        case 10:
          result2_en = result2.filter(function (r) {
            return r['term'].endsWith('@en');
          });
          return _context9.abrupt("return", result2_en[0]['term'].replace(/\"/g, '').replace(/@en/, ''));

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, _callee9, this);
}));
/*
* Returns all terms by descriptor record unique identifier
* (i.e., all terms for all concepts, both preferred and not)
*
* Example: 'D000001' returns [ 'A23187, Antibiotic', 'Antibiotic A23187', 'A23187', 'A 23187', 'A-23187', 'Calcimycin' ]
*/

MeshTree.prototype.getAllTerms = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee10(opts) {
  var descUI, allTermLabels, _arr, _i, pred1, conceptUIs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, conceptUI, _arr2, _i2, pred2, termUIs, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _item, termUI, _arr3, _i3, pred3, terms, terms_en;

  return _regenerator.default.wrap(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          opts = opts || {};
          descUI = this.formatID(opts.id, 'mesh');
          allTermLabels = [];
          _arr = ['concept', 'preferredConcept'];
          _i = 0;

        case 5:
          if (!(_i < _arr.length)) {
            _context10.next = 85;
            break;
          }

          pred1 = _arr[_i];
          _context10.next = 9;
          return this.dbSearch({
            subject: MESH + descUI,
            predicate: MESHV + pred1,
            object: this.db.v('conceptUI')
          }, {});

        case 9:
          conceptUIs = _context10.sent;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context10.prev = 13;
          _iterator2 = conceptUIs[Symbol.iterator]();

        case 15:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context10.next = 68;
            break;
          }

          item = _step2.value;
          conceptUI = item['conceptUI'];
          _arr2 = ['term', 'preferredTerm'];
          _i2 = 0;

        case 20:
          if (!(_i2 < _arr2.length)) {
            _context10.next = 65;
            break;
          }

          pred2 = _arr2[_i2];
          _context10.next = 24;
          return this.dbSearch({
            subject: conceptUI,
            predicate: MESHV + pred2,
            object: this.db.v('termUI')
          }, {});

        case 24:
          termUIs = _context10.sent;
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context10.prev = 28;
          _iterator3 = termUIs[Symbol.iterator]();

        case 30:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context10.next = 48;
            break;
          }

          _item = _step3.value;
          termUI = _item['termUI'];
          _arr3 = ['label', 'altLabel', 'prefLabel'];
          _i3 = 0;

        case 35:
          if (!(_i3 < _arr3.length)) {
            _context10.next = 45;
            break;
          }

          pred3 = _arr3[_i3];
          _context10.next = 39;
          return this.dbSearch({
            subject: termUI,
            predicate: MESHV + pred3,
            object: this.db.v('label')
          }, {});

        case 39:
          terms = _context10.sent;
          terms_en = terms.filter(function (r) {
            return r['label'].endsWith('@en');
          });
          terms_en.forEach(function (term) {
            return allTermLabels.push(term['label'].replace(/\"/g, '').replace(/@en/, ''));
          });

        case 42:
          _i3++;
          _context10.next = 35;
          break;

        case 45:
          _iteratorNormalCompletion3 = true;
          _context10.next = 30;
          break;

        case 48:
          _context10.next = 54;
          break;

        case 50:
          _context10.prev = 50;
          _context10.t0 = _context10["catch"](28);
          _didIteratorError3 = true;
          _iteratorError3 = _context10.t0;

        case 54:
          _context10.prev = 54;
          _context10.prev = 55;

          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }

        case 57:
          _context10.prev = 57;

          if (!_didIteratorError3) {
            _context10.next = 60;
            break;
          }

          throw _iteratorError3;

        case 60:
          return _context10.finish(57);

        case 61:
          return _context10.finish(54);

        case 62:
          _i2++;
          _context10.next = 20;
          break;

        case 65:
          _iteratorNormalCompletion2 = true;
          _context10.next = 15;
          break;

        case 68:
          _context10.next = 74;
          break;

        case 70:
          _context10.prev = 70;
          _context10.t1 = _context10["catch"](13);
          _didIteratorError2 = true;
          _iteratorError2 = _context10.t1;

        case 74:
          _context10.prev = 74;
          _context10.prev = 75;

          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }

        case 77:
          _context10.prev = 77;

          if (!_didIteratorError2) {
            _context10.next = 80;
            break;
          }

          throw _iteratorError2;

        case 80:
          return _context10.finish(77);

        case 81:
          return _context10.finish(74);

        case 82:
          _i++;
          _context10.next = 5;
          break;

        case 85:
          return _context10.abrupt("return", allTermLabels);

        case 86:
        case "end":
          return _context10.stop();
      }
    }
  }, _callee10, this, [[13, 70, 74, 82], [28, 50, 54, 62], [55,, 57, 61], [75,, 77, 81]]);
}));
/*
* Returns scope note for descriptor record unique identifier
* (scope notes are contained in the preferred concept record)
*
* Example: 'D000001', via concept 'M0000001', returns 'An ionophorous, polyether antibiotic from Streptomyces chartreusensis. It binds and transports CALCIUM and other divalent cations across membranes and uncouples oxidative phosphorylation while inhibiting ATPase of rat liver mitochondria. The substance is used mostly as a biochemical tool to study the role of divalent cations in various biological systems.'
*/

MeshTree.prototype.getScopeNote = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee11(opts) {
  var descUI, prefConcept, result, result_en;
  return _regenerator.default.wrap(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          opts = opts || {};
          descUI = this.formatID(opts.id, 'mesh');
          _context11.next = 4;
          return this.dbSearch({
            subject: MESH + descUI,
            predicate: MESHV + 'preferredConcept',
            object: this.db.v('conceptUI')
          }, {});

        case 4:
          prefConcept = _context11.sent;

          if (!_lodash.default.isEmpty(prefConcept)) {
            _context11.next = 7;
            break;
          }

          return _context11.abrupt("return", '');

        case 7:
          _context11.next = 9;
          return this.dbSearch({
            subject: prefConcept[0]['conceptUI'],
            predicate: MESHV + 'scopeNote',
            object: this.db.v('scopeNote')
          }, {});

        case 9:
          result = _context11.sent;

          if (!_lodash.default.isEmpty(result)) {
            _context11.next = 14;
            break;
          }

          return _context11.abrupt("return", '');

        case 14:
          result_en = result.filter(function (r) {
            return r['scopeNote'].endsWith('@en');
          });
          return _context11.abrupt("return", result_en[0]['scopeNote'].replace(/\"/g, '').replace(/@en/, ''));

        case 16:
        case "end":
          return _context11.stop();
      }
    }
  }, _callee11, this);
}));
/*
* Returns parent descriptor records UIs
* (returns an array as records can exist in multiple tree branches)
*
* Example: 'D000001' returns ['D001583']
*          'D005138' returns ['D006197', 'D005123']
*
* If id provided is SCR,
* returns parent descriptor record UIs mapped from supplementary concept record UI
*
* Example: 'C025735' returns ['D001286', 'D002164', 'D012602']
*/

MeshTree.prototype.getParents = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee12(opts) {
  var _this6 = this;

  var ui, format, result, _result;

  return _regenerator.default.wrap(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          opts = opts || {};
          ui = this.formatID(opts.id, 'mesh');
          format = opts.format || 'rdf';

          if (!/^D\d+$/.test(ui)) {
            _context12.next = 10;
            break;
          }

          _context12.next = 6;
          return this.dbSearch({
            subject: MESH + ui,
            predicate: MESHV + 'broaderDescriptor',
            object: this.db.v('descUI')
          }, {});

        case 6:
          result = _context12.sent;
          return _context12.abrupt("return", _lodash.default.uniq(result.map(function (res) {
            return _this6.formatID(res['descUI'], format);
          })));

        case 10:
          if (!/^C\d+$/.test(ui)) {
            _context12.next = 17;
            break;
          }

          _context12.next = 13;
          return this.dbSearch({
            subject: MESH + ui,
            predicate: MESHV + 'preferredMappedTo',
            object: this.db.v('descUI')
          }, {});

        case 13:
          _result = _context12.sent;
          return _context12.abrupt("return", _lodash.default.uniq(_result.map(function (res) {
            return _this6.formatID(res['descUI'], format).replace(/Q\d+/g, '');
          })));

        case 17:
          return _context12.abrupt("return", []);

        case 18:
        case "end":
          return _context12.stop();
      }
    }
  }, _callee12, this);
}));
/*
* Returns ancestor descriptor records UIs
* (returns an array)
*
* Example: 'D000001' returns ['D001583', 'D006574', 'D006571']
*          'D005138' returns ['D005123', 'D006197', 'D005145', 'D012679', 'D034582', 'D006257', 'D001829']
*/

MeshTree.prototype.getAncestors = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee13(opts) {
  var _this7 = this;

  var descUI, format, parents, nodes, hasParents, _loop;

  return _regenerator.default.wrap(function _callee13$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          opts = opts || {};
          descUI = this.formatID(opts.id, 'mesh');
          format = opts.format || 'rdf';
          parents = [];
          nodes = [descUI];
          hasParents = true;
          _loop =
          /*#__PURE__*/
          _regenerator.default.mark(function _loop() {
            var nodesTemp, _arr4, _i4, node, parentsTemp;

            return _regenerator.default.wrap(function _loop$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    nodesTemp = [];
                    _arr4 = nodes;
                    _i4 = 0;

                  case 3:
                    if (!(_i4 < _arr4.length)) {
                      _context13.next = 13;
                      break;
                    }

                    node = _arr4[_i4];
                    _context13.next = 7;
                    return _this7.getParents({
                      id: node,
                      format: 'mesh'
                    });

                  case 7:
                    parentsTemp = _context13.sent;

                    _lodash.default.each(parentsTemp, function (p) {
                      return nodesTemp.push(p);
                    });

                    _lodash.default.each(parentsTemp, function (p) {
                      return parents.push(p);
                    });

                  case 10:
                    _i4++;
                    _context13.next = 3;
                    break;

                  case 13:
                    nodes = nodesTemp;
                    hasParents = nodesTemp.length > 0;

                  case 15:
                  case "end":
                    return _context13.stop();
                }
              }
            }, _loop);
          });

        case 7:
          if (!hasParents) {
            _context14.next = 11;
            break;
          }

          return _context14.delegateYield(_loop(), "t0", 9);

        case 9:
          _context14.next = 7;
          break;

        case 11:
          return _context14.abrupt("return", _lodash.default.uniq(parents).map(function (p) {
            return _this7.formatID(p, format);
          }));

        case 12:
        case "end":
          return _context14.stop();
      }
    }
  }, _callee13, this);
}));
/*
* Returns children descriptor records UIs
* (immediate, not descendants)
*
* Example: 'D012343' returns ['D012345', 'D000926', 'D012346']
*/

MeshTree.prototype.getChildren = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee14(opts) {
  var _this8 = this;

  var descUI, format, childrenDescUIs, treeNums, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, treeNum, result, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, res, _treeNum, ui;

  return _regenerator.default.wrap(function _callee14$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          opts = opts || {};
          descUI = this.formatID(opts.id, 'mesh');
          format = opts.format || 'rdf';
          childrenDescUIs = [];
          _context15.next = 6;
          return this.getTreeNumbers({
            id: descUI,
            format: 'mesh'
          });

        case 6:
          treeNums = _context15.sent;
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context15.prev = 10;
          _iterator4 = treeNums[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
            _context15.next = 50;
            break;
          }

          treeNum = _step4.value;
          _context15.next = 16;
          return this.dbSearch({
            subject: this.db.v('treeNum'),
            predicate: MESHV + 'parentTreeNumber',
            object: MESH + treeNum
          }, {});

        case 16:
          result = _context15.sent;

          if (_lodash.default.isEmpty(result)) {
            _context15.next = 47;
            break;
          }

          _iteratorNormalCompletion5 = true;
          _didIteratorError5 = false;
          _iteratorError5 = undefined;
          _context15.prev = 21;
          _iterator5 = result[Symbol.iterator]();

        case 23:
          if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
            _context15.next = 33;
            break;
          }

          res = _step5.value;
          _treeNum = this.formatID(res['treeNum'], 'mesh');
          _context15.next = 28;
          return this.treeNumberToUI({
            treeNum: _treeNum,
            format: 'mesh'
          });

        case 28:
          ui = _context15.sent;
          childrenDescUIs.push(ui);

        case 30:
          _iteratorNormalCompletion5 = true;
          _context15.next = 23;
          break;

        case 33:
          _context15.next = 39;
          break;

        case 35:
          _context15.prev = 35;
          _context15.t0 = _context15["catch"](21);
          _didIteratorError5 = true;
          _iteratorError5 = _context15.t0;

        case 39:
          _context15.prev = 39;
          _context15.prev = 40;

          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }

        case 42:
          _context15.prev = 42;

          if (!_didIteratorError5) {
            _context15.next = 45;
            break;
          }

          throw _iteratorError5;

        case 45:
          return _context15.finish(42);

        case 46:
          return _context15.finish(39);

        case 47:
          _iteratorNormalCompletion4 = true;
          _context15.next = 12;
          break;

        case 50:
          _context15.next = 56;
          break;

        case 52:
          _context15.prev = 52;
          _context15.t1 = _context15["catch"](10);
          _didIteratorError4 = true;
          _iteratorError4 = _context15.t1;

        case 56:
          _context15.prev = 56;
          _context15.prev = 57;

          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }

        case 59:
          _context15.prev = 59;

          if (!_didIteratorError4) {
            _context15.next = 62;
            break;
          }

          throw _iteratorError4;

        case 62:
          return _context15.finish(59);

        case 63:
          return _context15.finish(56);

        case 64:
          return _context15.abrupt("return", childrenDescUIs.map(function (ui) {
            return _this8.formatID(ui, format);
          }));

        case 65:
        case "end":
          return _context15.stop();
      }
    }
  }, _callee14, this, [[10, 52, 56, 64], [21, 35, 39, 47], [40,, 42, 46], [57,, 59, 63]]);
}));
/*
* Returns sibling descriptor records UIs
* (across all branches a descriptor record may exist under)
*
* Example: 'D015834' returns ['D012345', 'D000926', 'D012346']
*/

MeshTree.prototype.getSiblings = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee15(opts) {
  var _this9 = this;

  var descUI, format, siblingDescUIs, parentDescUIs, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, parent, childrenDescUIs;

  return _regenerator.default.wrap(function _callee15$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          opts = opts || {};
          descUI = this.formatID(opts.id, 'mesh');
          format = opts.format || 'rdf';
          siblingDescUIs = [];
          _context16.next = 6;
          return this.getParents({
            id: descUI,
            format: 'mesh'
          });

        case 6:
          parentDescUIs = _context16.sent;
          _iteratorNormalCompletion6 = true;
          _didIteratorError6 = false;
          _iteratorError6 = undefined;
          _context16.prev = 10;
          _iterator6 = parentDescUIs[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
            _context16.next = 21;
            break;
          }

          parent = _step6.value;
          _context16.next = 16;
          return this.getChildren({
            id: parent,
            format: 'mesh'
          });

        case 16:
          childrenDescUIs = _context16.sent;

          _lodash.default.forEach(childrenDescUIs, function (ui) {
            return siblingDescUIs.push(ui);
          });

        case 18:
          _iteratorNormalCompletion6 = true;
          _context16.next = 12;
          break;

        case 21:
          _context16.next = 27;
          break;

        case 23:
          _context16.prev = 23;
          _context16.t0 = _context16["catch"](10);
          _didIteratorError6 = true;
          _iteratorError6 = _context16.t0;

        case 27:
          _context16.prev = 27;
          _context16.prev = 28;

          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }

        case 30:
          _context16.prev = 30;

          if (!_didIteratorError6) {
            _context16.next = 33;
            break;
          }

          throw _iteratorError6;

        case 33:
          return _context16.finish(30);

        case 34:
          return _context16.finish(27);

        case 35:
          _lodash.default.remove(siblingDescUIs, function (ui) {
            return ui === descUI;
          });

          return _context16.abrupt("return", siblingDescUIs.map(function (ui) {
            return _this9.formatID(ui, format);
          }));

        case 37:
        case "end":
          return _context16.stop();
      }
    }
  }, _callee15, this, [[10, 23, 27, 35], [28,, 30, 34]]);
}));
/*
* Returns descriptor records UI of closest common ancestors of two or more descriptor record UIs
* (if a descriptor exists in more than one place on the tree, there will be more than one common ancestor)
*
* Example: ['D000926', 'D012345'] returns ['D012343']
*/

MeshTree.prototype.getCommonAncestors = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee16(opts) {
  var _this10 = this;

  var descUIArray, format, commonAncestorsDescUIs, commonAncestorsTreeNums, treeNumsArray, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, descUI, treeNums, treeNumPermutations, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _loop2, _iterator8, _step8;

  return _regenerator.default.wrap(function _callee16$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          opts = opts || {};

          if (_lodash.default.isArray(opts.ids)) {
            _context18.next = 3;
            break;
          }

          throw new Error('opts.ids not an array.');

        case 3:
          descUIArray = opts.ids.map(function (id) {
            return _this10.formatID(id, 'mesh');
          });
          format = opts.format || 'rdf';
          commonAncestorsDescUIs = [];
          commonAncestorsTreeNums = [];
          treeNumsArray = [];
          _iteratorNormalCompletion7 = true;
          _didIteratorError7 = false;
          _iteratorError7 = undefined;
          _context18.prev = 11;
          _iterator7 = descUIArray[Symbol.iterator]();

        case 13:
          if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
            _context18.next = 22;
            break;
          }

          descUI = _step7.value;
          _context18.next = 17;
          return this.getTreeNumbers({
            id: descUI,
            format: 'mesh'
          });

        case 17:
          treeNums = _context18.sent;
          treeNumsArray.push(treeNums);

        case 19:
          _iteratorNormalCompletion7 = true;
          _context18.next = 13;
          break;

        case 22:
          _context18.next = 28;
          break;

        case 24:
          _context18.prev = 24;
          _context18.t0 = _context18["catch"](11);
          _didIteratorError7 = true;
          _iteratorError7 = _context18.t0;

        case 28:
          _context18.prev = 28;
          _context18.prev = 29;

          if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
            _iterator7.return();
          }

        case 31:
          _context18.prev = 31;

          if (!_didIteratorError7) {
            _context18.next = 34;
            break;
          }

          throw _iteratorError7;

        case 34:
          return _context18.finish(31);

        case 35:
          return _context18.finish(28);

        case 36:
          treeNumPermutations = _permutations.default.apply(null, treeNumsArray);
          _iteratorNormalCompletion8 = true;
          _didIteratorError8 = false;
          _iteratorError8 = undefined;
          _context18.prev = 40;
          _loop2 =
          /*#__PURE__*/
          _regenerator.default.mark(function _loop2() {
            var permut, depth, branches, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _loop3, _iterator9, _step9, _ret, commonAncestorTreeNum, isBroader, indices, idx, _arr5, _i5, _idx, commonAncestorDescUI;

            return _regenerator.default.wrap(function _loop2$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    permut = _step8.value;
                    depth = 0;
                    branches = [];
                    _iteratorNormalCompletion9 = true;
                    _didIteratorError9 = false;
                    _iteratorError9 = undefined;
                    _context17.prev = 6;

                    _loop3 = function _loop3() {
                      var branch = _step9.value;

                      var isCommonBranch = _lodash.default.every(_lodash.default.map(permut.slice(1, permut.length), function (x) {
                        return branch === x.split('.')[depth];
                      }));

                      if (isCommonBranch) {
                        branches.push(branch);
                        ++depth;
                      } else {
                        return "break";
                      }
                    };

                    _iterator9 = permut[0].split('.')[Symbol.iterator]();

                  case 9:
                    if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
                      _context17.next = 16;
                      break;
                    }

                    _ret = _loop3();

                    if (!(_ret === "break")) {
                      _context17.next = 13;
                      break;
                    }

                    return _context17.abrupt("break", 16);

                  case 13:
                    _iteratorNormalCompletion9 = true;
                    _context17.next = 9;
                    break;

                  case 16:
                    _context17.next = 22;
                    break;

                  case 18:
                    _context17.prev = 18;
                    _context17.t0 = _context17["catch"](6);
                    _didIteratorError9 = true;
                    _iteratorError9 = _context17.t0;

                  case 22:
                    _context17.prev = 22;
                    _context17.prev = 23;

                    if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
                      _iterator9.return();
                    }

                  case 25:
                    _context17.prev = 25;

                    if (!_didIteratorError9) {
                      _context17.next = 28;
                      break;
                    }

                    throw _iteratorError9;

                  case 28:
                    return _context17.finish(25);

                  case 29:
                    return _context17.finish(22);

                  case 30:
                    commonAncestorTreeNum = branches.join('.'); // should not be ancestor of common ancestor already in common ancestors array

                    isBroader = _lodash.default.some(_lodash.default.map(commonAncestorsTreeNums, function (t) {
                      return _lodash.default.startsWith(t, commonAncestorTreeNum);
                    }));

                    if (!(commonAncestorTreeNum && !isBroader)) {
                      _context17.next = 42;
                      break;
                    }

                    // remove those in common ancestors array that are broader than current
                    indices = [];

                    for (idx = 0; idx < commonAncestorsTreeNums.length; idx++) {
                      if (_lodash.default.startsWith(commonAncestorTreeNum, commonAncestorsTreeNums[idx])) {
                        indices.push(idx);
                      }
                    }

                    _arr5 = indices;

                    for (_i5 = 0; _i5 < _arr5.length; _i5++) {
                      _idx = _arr5[_i5];
                      commonAncestorsDescUIs.splice(_idx, 1);
                      commonAncestorsTreeNums.splice(_idx, 1);
                    } // add common ancestor to array


                    _context17.next = 39;
                    return _this10.treeNumberToUI({
                      treeNum: commonAncestorTreeNum,
                      format: 'mesh'
                    });

                  case 39:
                    commonAncestorDescUI = _context17.sent;
                    commonAncestorsDescUIs.push(commonAncestorDescUI);
                    commonAncestorsTreeNums.push(commonAncestorTreeNum);

                  case 42:
                  case "end":
                    return _context17.stop();
                }
              }
            }, _loop2, null, [[6, 18, 22, 30], [23,, 25, 29]]);
          });
          _iterator8 = treeNumPermutations[Symbol.iterator]();

        case 43:
          if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
            _context18.next = 48;
            break;
          }

          return _context18.delegateYield(_loop2(), "t1", 45);

        case 45:
          _iteratorNormalCompletion8 = true;
          _context18.next = 43;
          break;

        case 48:
          _context18.next = 54;
          break;

        case 50:
          _context18.prev = 50;
          _context18.t2 = _context18["catch"](40);
          _didIteratorError8 = true;
          _iteratorError8 = _context18.t2;

        case 54:
          _context18.prev = 54;
          _context18.prev = 55;

          if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
            _iterator8.return();
          }

        case 57:
          _context18.prev = 57;

          if (!_didIteratorError8) {
            _context18.next = 60;
            break;
          }

          throw _iteratorError8;

        case 60:
          return _context18.finish(57);

        case 61:
          return _context18.finish(54);

        case 62:
          return _context18.abrupt("return", commonAncestorsDescUIs.map(function (ui) {
            return _this10.formatID(ui, format);
          }));

        case 63:
        case "end":
          return _context18.stop();
      }
    }
  }, _callee16, this, [[11, 24, 28, 36], [29,, 31, 35], [40, 50, 54, 62], [55,, 57, 61]]);
}));
/*
* Tests whether or not id2 is a descendant of id1 (child of >=1 depth)
*/

MeshTree.prototype.isDescendantOf = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee17(id1, id2) {
  var _this11 = this;

  var descUI1, descUI2, parentsAll, nodes, hasParents, _loop4;

  return _regenerator.default.wrap(function _callee17$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          descUI1 = this.formatID(id1, 'mesh');
          descUI2 = this.formatID(id2, 'mesh');

          if (!(descUI1 === descUI2)) {
            _context20.next = 4;
            break;
          }

          return _context20.abrupt("return", false);

        case 4:
          parentsAll = [];
          nodes = [descUI2];
          hasParents = true;
          _loop4 =
          /*#__PURE__*/
          _regenerator.default.mark(function _loop4() {
            var nodesTemp, _arr6, _i6, node, parentsTemp;

            return _regenerator.default.wrap(function _loop4$(_context19) {
              while (1) {
                switch (_context19.prev = _context19.next) {
                  case 0:
                    nodesTemp = [];
                    _arr6 = nodes;
                    _i6 = 0;

                  case 3:
                    if (!(_i6 < _arr6.length)) {
                      _context19.next = 12;
                      break;
                    }

                    node = _arr6[_i6];
                    _context19.next = 7;
                    return _this11.getParents({
                      id: node,
                      format: 'mesh'
                    });

                  case 7:
                    parentsTemp = _context19.sent;

                    _lodash.default.each(parentsTemp, function (p) {
                      parentsAll.push(p);
                      nodesTemp.push(p);
                    });

                  case 9:
                    _i6++;
                    _context19.next = 3;
                    break;

                  case 12:
                    nodes = nodesTemp;
                    hasParents = nodes.length > 0;

                  case 14:
                  case "end":
                    return _context19.stop();
                }
              }
            }, _loop4);
          });

        case 8:
          if (!hasParents) {
            _context20.next = 12;
            break;
          }

          return _context20.delegateYield(_loop4(), "t0", 10);

        case 10:
          _context20.next = 8;
          break;

        case 12:
          return _context20.abrupt("return", _lodash.default.includes(parentsAll, descUI1));

        case 13:
        case "end":
          return _context20.stop();
      }
    }
  }, _callee17, this);
}));
/*
* Creates a subtree from a flat list of descriptor record UIs (as `@id`s) based on parent-child relationships within the MeSH ontology tree.
*/

MeshTree.prototype.clusterDescUIs = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee18(idArray) {
  var _this12 = this;

  var descUIArray, mostSpecificConcept, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, descUI, children, relationships, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _loop5, _iterator11, _step11, treeCluster;

  return _regenerator.default.wrap(function _callee18$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          treeCluster = function _ref(relationsList, parent, tree) {
            if (typeof tree === 'undefined') {
              tree = [];
            }

            if (typeof parent === 'undefined') {
              parent = {
                '@id': null,
                'parent': null
              };
            }

            var children = _lodash.default.filter(relationsList, function (child) {
              return child.parent === parent['@id'];
            });

            if (!_lodash.default.isEmpty(children)) {
              if (_lodash.default.isNull(parent['@id'])) {
                tree = children;
              } else {
                parent['children'] = children;
              }

              _lodash.default.each(children, function (child) {
                treeCluster(relationsList, child);
              });
            }

            return tree;
          };

          if (_lodash.default.isArray(idArray)) {
            _context23.next = 3;
            break;
          }

          throw new Error('input not an array.');

        case 3:
          descUIArray = idArray.map(function (id) {
            return id.replace(MESH, '');
          }); // booleans whether a concept can have potential children (i.e., not the most specific concept)

          mostSpecificConcept = {};
          _iteratorNormalCompletion10 = true;
          _didIteratorError10 = false;
          _iteratorError10 = undefined;
          _context23.prev = 8;
          _iterator10 = descUIArray[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
            _context23.next = 19;
            break;
          }

          descUI = _step10.value;
          _context23.next = 14;
          return this.getChildren({
            id: descUI,
            format: 'mesh'
          });

        case 14:
          children = _context23.sent;
          mostSpecificConcept[descUI] = !children || !children.length;

        case 16:
          _iteratorNormalCompletion10 = true;
          _context23.next = 10;
          break;

        case 19:
          _context23.next = 25;
          break;

        case 21:
          _context23.prev = 21;
          _context23.t0 = _context23["catch"](8);
          _didIteratorError10 = true;
          _iteratorError10 = _context23.t0;

        case 25:
          _context23.prev = 25;
          _context23.prev = 26;

          if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
            _iterator10.return();
          }

        case 28:
          _context23.prev = 28;

          if (!_didIteratorError10) {
            _context23.next = 31;
            break;
          }

          throw _iteratorError10;

        case 31:
          return _context23.finish(28);

        case 32:
          return _context23.finish(25);

        case 33:
          // create array of parent-child relationship objects
          relationships = [];
          _iteratorNormalCompletion11 = true;
          _didIteratorError11 = false;
          _iteratorError11 = undefined;
          _context23.prev = 37;
          _loop5 =
          /*#__PURE__*/
          _regenerator.default.mark(function _loop5() {
            var descUI, parents, nodes, hasParents, parentsFound, _loop6;

            return _regenerator.default.wrap(function _loop5$(_context22) {
              while (1) {
                switch (_context22.prev = _context22.next) {
                  case 0:
                    descUI = _step11.value;
                    parents = [];
                    nodes = [descUI];
                    hasParents = true;
                    parentsFound = false;
                    _loop6 =
                    /*#__PURE__*/
                    _regenerator.default.mark(function _loop6() {
                      var nodesTemp, _arr7, _i7, node, parentsTemp, parentsInArray;

                      return _regenerator.default.wrap(function _loop6$(_context21) {
                        while (1) {
                          switch (_context21.prev = _context21.next) {
                            case 0:
                              nodesTemp = [];
                              _arr7 = nodes;
                              _i7 = 0;

                            case 3:
                              if (!(_i7 < _arr7.length)) {
                                _context21.next = 13;
                                break;
                              }

                              node = _arr7[_i7];
                              _context21.next = 7;
                              return _this12.getParents({
                                id: node,
                                format: 'mesh'
                              });

                            case 7:
                              parentsTemp = _context21.sent;
                              parentsInArray = _lodash.default.intersection(parentsTemp, descUIArray);

                              if (parentsInArray.length > 0) {
                                _lodash.default.each(parentsInArray, function (p) {
                                  return parents.push(p);
                                });

                                parentsFound = true;
                              } else {
                                _lodash.default.each(parentsTemp, function (p) {
                                  return nodesTemp.push(p);
                                });
                              }

                            case 10:
                              _i7++;
                              _context21.next = 3;
                              break;

                            case 13:
                              nodes = nodesTemp;
                              hasParents = nodesTemp.length > 0;

                            case 15:
                            case "end":
                              return _context21.stop();
                          }
                        }
                      }, _loop6);
                    });

                  case 6:
                    if (!(hasParents && !parentsFound)) {
                      _context22.next = 10;
                      break;
                    }

                    return _context22.delegateYield(_loop6(), "t0", 8);

                  case 8:
                    _context22.next = 6;
                    break;

                  case 10:
                    if (parents.length === 0) {
                      relationships.push({
                        '@id': MESH + descUI,
                        'parent': null,
                        'mostSpecificConcept': mostSpecificConcept[descUI]
                      });
                    } else {
                      _lodash.default.each(parents, function (parent) {
                        relationships.push({
                          '@id': MESH + descUI,
                          'parent': MESH + parent,
                          'mostSpecificConcept': mostSpecificConcept[descUI]
                        });
                      });
                    }

                  case 11:
                  case "end":
                    return _context22.stop();
                }
              }
            }, _loop5);
          });
          _iterator11 = descUIArray[Symbol.iterator]();

        case 40:
          if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
            _context23.next = 45;
            break;
          }

          return _context23.delegateYield(_loop5(), "t1", 42);

        case 42:
          _iteratorNormalCompletion11 = true;
          _context23.next = 40;
          break;

        case 45:
          _context23.next = 51;
          break;

        case 47:
          _context23.prev = 47;
          _context23.t2 = _context23["catch"](37);
          _didIteratorError11 = true;
          _iteratorError11 = _context23.t2;

        case 51:
          _context23.prev = 51;
          _context23.prev = 52;

          if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
            _iterator11.return();
          }

        case 54:
          _context23.prev = 54;

          if (!_didIteratorError11) {
            _context23.next = 57;
            break;
          }

          throw _iteratorError11;

        case 57:
          return _context23.finish(54);

        case 58:
          return _context23.finish(51);

        case 59:
          return _context23.abrupt("return", treeCluster(relationships));

        case 60:
        case "end":
          return _context23.stop();
      }
    }
  }, _callee18, this, [[8, 21, 25, 33], [26,, 28, 32], [37, 47, 51, 59], [52,, 54, 58]]);
}));
/*
* Tests whether a descriptor has pharmacological actions (in other words, if the descriptor is a drug).
* If true, returns array of descUI mappings of the pharmacological action, otherwise returns null.
*/

MeshTree.prototype.getPharmacologicalAction = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee19(opts) {
  var _this13 = this;

  var ui, format, result;
  return _regenerator.default.wrap(function _callee19$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          opts = opts || {};
          ui = this.formatID(opts.id, 'mesh');
          format = opts.format || 'rdf';
          _context24.next = 5;
          return this.dbSearch({
            subject: MESH + ui,
            predicate: MESHV + 'pharmacologicalAction',
            object: this.db.v('descUI')
          }, {});

        case 5:
          result = _context24.sent;

          if (!_lodash.default.isEmpty(result)) {
            _context24.next = 10;
            break;
          }

          return _context24.abrupt("return", null);

        case 10:
          return _context24.abrupt("return", _lodash.default.uniq(result.map(function (res) {
            return _this13.formatID(res['descUI'], format);
          })));

        case 11:
        case "end":
          return _context24.stop();
      }
    }
  }, _callee19, this);
}));
/*
 * Performs mapping of MeSH concepts onto Schema.org classes
 */

MeshTree.prototype.getSchemaOrgType = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee20(opts) {
  var ui, schemaOrgType, pharmActions, treeNums;
  return _regenerator.default.wrap(function _callee20$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          opts = opts || {};
          ui = this.formatID(opts.id, 'mesh');
          schemaOrgType = 'MedicalEntity';
          _context25.next = 5;
          return this.getPharmacologicalAction({
            id: ui,
            format: 'mesh'
          });

        case 5:
          pharmActions = _context25.sent;

          if (pharmActions) {
            schemaOrgType = 'Drug';
          }

          _context25.next = 9;
          return this.getTreeNumbers({
            id: ui,
            format: 'mesh'
          });

        case 9:
          treeNums = _context25.sent;

          if (treeNums.some(function (tn) {
            return /^C\d+/.test(tn);
          })) {
            schemaOrgType = 'MedicalCondition';

            if (treeNums.some(function (tn) {
              return /^(C01|C02|C03)\./.test(tn);
            })) {
              schemaOrgType = 'InfectiousDisease';
            } else if (treeNums.some(function (tn) {
              return /^C23\./.test(tn);
            })) {
              schemaOrgType = 'MedicalSignOrSymptom';
            }
          } else if (treeNums.some(function (tn) {
            return /^E07\.(101|132|190|222|230|278|315|325|430|505|515|605|652|695|814|858|862|877|913|926|935|950)\./.test(tn);
          })) {
            schemaOrgType = 'MedicalDevice';
          } else if (treeNums.some(function (tn) {
            return /^E01\.370\./.test(tn);
          })) {
            schemaOrgType = 'MedicalTest';

            if (treeNums.some(function (tn) {
              return /^E01\.370\.(100|370.050|372.250|372.255|372.310|376.300|376.525|376.700|378.150|378.155|378.330|386.105|386.460|386.700|388.100|388.250|390.800|405|530)/.test(tn);
            })) {
              schemaOrgType = 'DiagnosticProcedure';
            } else if (treeNums.some(function (tn) {
              return /^E01\.370\.(049|350)/.test(tn);
            })) {
              schemaOrgType = 'ImagingTest';
            } // skipping BloodTest and PathologyTest mapping for now as these are somewhat ambiguous

          } else if (treeNums.some(function (tn) {
            return /^E02\./.test(tn);
          })) {
            schemaOrgType = 'MedicalTherapy';

            if (treeNums.some(function (tn) {
              return /^E02\.815\./.test(tn);
            })) {
              schemaOrgType = 'RadiationTherapy';
            } else if (treeNums.some(function (tn) {
              return /^E02\.779\./.test(tn);
            })) {
              schemaOrgType = 'PhysicalTherapy';
            } else if (treeNums.some(function (tn) {
              return /^E02\.(037|065|120|148|154|218|258|278|309|342|365|393|467|514|520|533|565|583|585|594|596|600|621|631|706|718|730|774|794|800|831|870|875|880|891|912|926|950|960)/.test(tn);
            })) {
              schemaOrgType = 'TherapeuticProcedure';
            }
          } else if (treeNums.some(function (tn) {
            return /^(E03|E04)/.test(tn);
          })) {
            schemaOrgType = 'MedicalProcedure';
          } else if (treeNums.some(function (tn) {
            return /^F04\.754\./.test(tn);
          })) {
            schemaOrgType = 'PsychologicalTreatment';
          }

          return _context25.abrupt("return", schemaOrgType);

        case 12:
        case "end":
          return _context25.stop();
      }
    }
  }, _callee20, this);
}));
/*
* Creates properties object from descriptor id
*/

MeshTree.prototype.createPropertiesObject = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee21(propRequestObj) {
  var id, properties, ui, propertiesObj, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, property, preferredTerm, scopeNotes, synonyms, preferredTermIndex, schemaOrgType;

  return _regenerator.default.wrap(function _callee21$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          id = propRequestObj['@id'];
          properties = propRequestObj.properties;
          ui = id.replace(MESH, '');
          propertiesObj = {
            '@id': id
          };
          _iteratorNormalCompletion12 = true;
          _didIteratorError12 = false;
          _iteratorError12 = undefined;
          _context26.prev = 7;
          _iterator12 = properties[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
            _context26.next = 48;
            break;
          }

          property = _step12.value;
          preferredTerm = void 0;
          _context26.t0 = property;
          _context26.next = _context26.t0 === 'name' ? 15 : _context26.t0 === 'description' ? 20 : _context26.t0 === 'synonyms' ? 25 : _context26.t0 === 'schemaOrgType' ? 35 : _context26.t0 === 'codeValue' ? 40 : _context26.t0 === 'codingSystem' ? 42 : 44;
          break;

        case 15:
          _context26.next = 17;
          return this.getPrefTerm({
            id: ui
          });

        case 17:
          preferredTerm = _context26.sent;
          propertiesObj[property] = preferredTerm;
          return _context26.abrupt("break", 45);

        case 20:
          _context26.next = 22;
          return this.getScopeNote({
            id: ui
          });

        case 22:
          scopeNotes = _context26.sent;
          propertiesObj[property] = scopeNotes;
          return _context26.abrupt("break", 45);

        case 25:
          _context26.next = 27;
          return this.getPrefTerm({
            id: ui
          });

        case 27:
          preferredTerm = _context26.sent;
          _context26.next = 30;
          return this.getAllTerms({
            id: ui
          });

        case 30:
          synonyms = _context26.sent;
          preferredTermIndex = synonyms.indexOf(preferredTerm);
          if (~preferredTermIndex) synonyms.splice(preferredTermIndex, 1);
          propertiesObj[property] = synonyms;
          return _context26.abrupt("break", 45);

        case 35:
          _context26.next = 37;
          return this.getSchemaOrgType({
            id: ui
          });

        case 37:
          schemaOrgType = _context26.sent;
          propertiesObj[property] = schemaOrgType;
          return _context26.abrupt("break", 45);

        case 40:
          propertiesObj[property] = ui;
          return _context26.abrupt("break", 45);

        case 42:
          propertiesObj[property] = 'MeSH';
          return _context26.abrupt("break", 45);

        case 44:
          propertiesObj[property] = null;

        case 45:
          _iteratorNormalCompletion12 = true;
          _context26.next = 9;
          break;

        case 48:
          _context26.next = 54;
          break;

        case 50:
          _context26.prev = 50;
          _context26.t1 = _context26["catch"](7);
          _didIteratorError12 = true;
          _iteratorError12 = _context26.t1;

        case 54:
          _context26.prev = 54;
          _context26.prev = 55;

          if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
            _iterator12.return();
          }

        case 57:
          _context26.prev = 57;

          if (!_didIteratorError12) {
            _context26.next = 60;
            break;
          }

          throw _iteratorError12;

        case 60:
          return _context26.finish(57);

        case 61:
          return _context26.finish(54);

        case 62:
          return _context26.abrupt("return", propertiesObj);

        case 63:
        case "end":
          return _context26.stop();
      }
    }
  }, _callee21, this, [[7, 50, 54, 62], [55,, 57, 61]]);
}));
var _default = MeshTree;
exports.default = _default;
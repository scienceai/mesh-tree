"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMainSections = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _request = _interopRequireDefault(require("request"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var requestPromise = _bluebird.default.promisify(_request.default, {
  multiArgs: true
});

var getMainSections = _bluebird.default.coroutine(
/*#__PURE__*/
_regenerator.default.mark(function _callee(articleTitle) {
  var url, response, resInfo, body, body_parsed, extractWikiJSON;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          extractWikiJSON = function _ref(wikijson) {
            var obj = wikijson.query.pages[Object.keys(wikijson.query.pages)[0]];

            if (!obj.hasOwnProperty('extract') || !obj.hasOwnProperty('title')) {
              return;
            }

            var sections = [],
                wikiextract = wikijson.query.pages[Object.keys(wikijson.query.pages)[0]].extract,
                sectionTitlesNotIncluded = ['See also', 'References', 'Further reading', 'External links', 'Works cited', 'Cited texts'],
                cursorStart = 0,
                cursorEnd = wikiextract.indexOf('\n== ');

            if (cursorEnd === -1) {
              cursorEnd = wikiextract.length;
            }

            var level = 0,
                title = wikijson.query.pages[Object.keys(wikijson.query.pages)[0]].title,
                abstract = {
              sectionLevel: level,
              sectionTitle: title,
              sectionText: wikiextract.substring(cursorStart, cursorEnd).replace(/\n+/g, '')
            };
            sections.push(abstract);
            var headingRE = /\n==+ (.*?) (==+)\n?/g,
                headingRE_results = headingRE.exec(wikiextract),
                text = '',
                section = {};

            while (cursorEnd !== wikiextract.length) {
              title = headingRE_results[1];
              level = headingRE_results[2].length - 1;
              cursorStart = headingRE.lastIndex;
              headingRE_results = headingRE.exec(wikiextract);

              if (headingRE_results === null) {
                cursorEnd = wikiextract.length;
              } else {
                cursorEnd = headingRE_results.index;
              }

              text = wikiextract.substring(cursorStart, cursorEnd).trim() + '\n';
              text = text.replace(/\[citation needed\]/g, '');
              text = text.replace(/\n+/g, '');
              section = {
                sectionLevel: level,
                sectionTitle: title,
                sectionText: text
              };

              if (sectionTitlesNotIncluded.indexOf(title) === -1) {
                sections.push(section);
              }
            }

            return sections;
          };

          url = 'http://en.wikipedia.org/w/api.php?redirects=true&format=json&utf8=true&action=query&titles=' + articleTitle + '&prop=extracts&explaintext=true&exsectionformat=wiki&continue=';
          _context.prev = 2;
          _context.next = 5;
          return requestPromise({
            url: url,
            json: true
          });

        case 5:
          response = _context.sent;
          resInfo = response[0];
          body = response[1];

          if (!(resInfo.statusCode !== 200)) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", '');

        case 12:
          body_parsed = extractWikiJSON(body);
          return _context.abrupt("return", body_parsed);

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](2);
          console.log('Error: ' + _context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[2, 16]]);
}));

exports.getMainSections = getMainSections;
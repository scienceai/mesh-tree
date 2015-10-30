import request from 'request';
import Bluebird from 'bluebird';

let requestPromise = Bluebird.promisify(request, {multiArgs: true});

export function* getMainSections(articleTitle) {

  let url = 'http://en.wikipedia.org/w/api.php?redirects=true&format=json&utf8=true&action=query&titles=' + articleTitle + '&prop=extracts&explaintext=true&exsectionformat=wiki&continue=';

  try {

    let response = yield requestPromise({
      url: url,
      json: true
    });

    let resInfo = response[0];
    let body = response[1];

    if (resInfo.statusCode !== 200) {
      return '';
    } else {
      let body_parsed = extractWikiJSON(body);
      return body_parsed;
    }

  } catch (err) {
    console.log('Error: ' + err);
  }

  // Parse returned wikipedia API JSON
  function extractWikiJSON (wikijson) {

    let obj = wikijson.query.pages[Object.keys(wikijson.query.pages)[0]];

    if (!obj.hasOwnProperty('extract') || !obj.hasOwnProperty('title')) {
      return;
    }

    let sections = []
      , wikiextract = wikijson.query.pages[Object.keys(wikijson.query.pages)[0]].extract
      , sectionTitlesNotIncluded = ['See also', 'References', 'Further reading', 'External links', 'Works cited', 'Cited texts']
      , cursorStart = 0
      , cursorEnd = wikiextract.indexOf('\n== ');

    if (cursorEnd === -1) {
      cursorEnd = wikiextract.length;
    }

    let level = 0
      , title = wikijson.query.pages[Object.keys(wikijson.query.pages)[0]].title
      , abstract = {sectionLevel: level, sectionTitle: title, sectionText: wikiextract.substring(cursorStart, cursorEnd).replace(/\n+/g, '')};

    sections.push(abstract);

    let headingRE = /\n==+ (.*?) (==+)\n?/g
      , headingRE_results = headingRE.exec(wikiextract)
      , text = ''
      , section = {};

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
      section = {sectionLevel: level, sectionTitle: title, sectionText: text};
      if (sectionTitlesNotIncluded.indexOf(title) === -1) {
        sections.push(section);
      }
    }

    return sections;
  }

}

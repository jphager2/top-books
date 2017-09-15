const cheerio = require('cheerio');
const fetch = require('node-fetch');

const source = 'telegraph - 100 Novels Everyone Should Read';
const url = 'http://www.telegraph.co.uk/books/what-to-read/100-novels-everyone-should-read/';

const extractBooks = (html) =>  {
  const $ = cheerio.load(html);

  const books = [];

  $('article .inline-content .component-content b > a').map((undefined, book) => {
    const text = $(book).text();
    const match = text.match(/(.+) by (.+)/);
    
    let title = null;
    let author = null;

    if (match) {
      [undefined, title, author] = match;
    } else {
      title = text;
    }

    title = (title || "").trim().toUpperCase();
    author = (author || "").trim().toUpperCase();

    books.push({ title, author, source });
  });

  return books;
}

module.exports = () => {
  return fetch(url)
    .then(response => response.text())
    .then(extractBooks)
}

const cheerio = require('cheerio');
const fetch = require('node-fetch');

const source = 'thegreatestbooks';
const url = 'http://thegreatestbooks.org/'

const extractBooks = (html) =>  {
  const $ = cheerio.load(html);

  const books = [];

  $('.list-unstyled').first().find('li h4 a').each((undefined, book) => {
    const match = $(book).text().match(/(.+) by (.+)/);
    const title = (match[1] || "").trim().toUpperCase();
    const author = (match[2] || "").trim().toUpperCase();

    books.push({ title, author, source });
  });

  return books;
}

module.exports = () => {
  return fetch(url)
    .then(response => response.text())
    .then(extractBooks)
}

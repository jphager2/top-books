const cheerio = require('cheerio');
const fetch = require('node-fetch');

const source = 'thegreatestbooks';
const url = 'http://thegreatestbooks.org/'

const handleError = (err) => {
  console.error(err.message || err);
}

const extractBooks = (html) =>  {
  const $ = cheerio.load(html);

  const books = [];

  $('.list-unstyled').first().find('li h4 a').each((undefined, book) => {
    const match = $(book).text().match(/(.+) by (.+)/);
    const title = (match[1] || "").trim();
    const author = (match[2] || "").trim();

    books.push({ title, author, source });
  });

  return books;
}

const outputJSON = (books) => {
  books.forEach((book) => {
    console.log(JSON.stringify(book));
  });
}

module.exports = () => {
  fetch(url)
    .then(response => response.text())
    .then(extractBooks)
    .then(outputJSON)
    .catch(handleError)
}

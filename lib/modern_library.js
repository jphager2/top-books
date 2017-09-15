const cheerio = require('cheerio');
const fetch = require('node-fetch');

const source = 'modernlibrary - 100 Best Novels';
const url = 'http://www.modernlibrary.com/top-100/100-best-novels/';

const extractBooks = (html) =>  {
  const $ = cheerio.load(html);

  const books = [];

  $('.list-100').map((undefined, list) => {
    $(list).find('li').each((undefined, book) => {
      const title = $(book).find('strong').text().trim().toUpperCase();
      const author = ($(book).text().match(/by (.+)/)[1] || "").trim().toUpperCase();

      books.push({ title, author, source });
    });
  });

  return books;
}

module.exports = () => {
  return fetch(url)
    .then(response => response.text())
    .then(extractBooks)
}

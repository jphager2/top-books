const cheerio = require('cheerio');
const fetch = require('node-fetch');

const source = 'theguardian - The 100 Best Novels Written in English';
const url = 'https://www.theguardian.com/books/2015/aug/17/the-100-best-novels-written-in-english-the-full-list'

const extractBooks = (html) =>  {
  const $ = cheerio.load(html);

  const books = [];

  $('[itemprop="articleBody"] strong').each((undefined, book) => {
    const title = $(book).find('a').text().trim().toUpperCase();
    const author = ($(book).text().match(/by (.+)/)[1] || "").trim().toUpperCase();

    books.push({ title, author, source });
  });

  return books;
}

module.exports = () => {
  return fetch(url)
    .then(response => response.text())
    .then(extractBooks)
}

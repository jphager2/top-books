const cheerio = require('cheerio');
const fetch = require('node-fetch');

const source = 'theguardian - The 100 Best Novels Written in English';
const url = 'https://www.theguardian.com/books/2015/aug/17/the-100-best-novels-written-in-english-the-full-list'

const handleError = (err) => {
  console.error(err.message || err);
}

const extractBooks = (html) =>  {
  const $ = cheerio.load(html);

  const books = [];

  $('[itemprop="articleBody"] strong').each((undefined, book) => {
    const title = $(book).find('a').text().trim();
    const author = ($(book).text().match(/by (.+)/)[1] || "").trim();

    books.push({ title, author, source });
  });

  return books;
}

const outputJSON = (books) => {
  books.forEach((book) => {
    console.log(JSON.stringify(book));
  });
}

fetch(url)
  .then(response => response.text())
  .then(extractBooks)
  .then(outputJSON)
  .catch(handleError)


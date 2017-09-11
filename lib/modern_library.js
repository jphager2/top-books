const cheerio = require('cheerio');
const fetch = require('node-fetch');

const url = 'http://www.modernlibrary.com/top-100/100-best-novels/';

const handleError = (err) => {
  console.error(err.message || err);
}

const extractBooks = (html) =>  {
  const $ = cheerio.load(html);

  const books = [];

  $('.list-100').map((undefined, list) => {
    $(list).find('li').each((undefined, book) => {
      const title = $(book).find('strong').text().trim();
      const author = ($(book).text().match(/by (.+)/)[1] || "").trim();

      books.push({ title, author });
    });
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

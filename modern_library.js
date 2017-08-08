const cheerio = require('cheerio');
const fetch = require('node-fetch');

const url = 'http://www.modernlibrary.com/top-100/100-best-novels/';

const extractBooks = (html) =>  {
  const $ = cheerio.load(html);

  return $('.list-100').map((list) => {
    const books = $(list).find('li');
    return books.map((book) => {
      return {
        title: book.querySelector('strong').innerText,
        author: book.innerText.match(/by (.+)/)[1]
      }
    });
  });
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

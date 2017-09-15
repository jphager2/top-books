const cheerio = require('cheerio');
const fetch = require('node-fetch');

const source = "goodreads - Time Magazine's All Time 100 Novels";
const url = 'https://www.goodreads.com/list/show/2681.Time_Magazine_s_All_Time_100_Novels';

const extractBooks = (html) =>  {
  const $ = cheerio.load(html);

  const books = [];

  $('[itemtype="http://schema.org/Book"]').map((undefined, book) => {
    const author = $(book).find('[itemprop="author"] [itemprop="name"]').text().trim().toUpperCase();
    const title = $(book).find('[itemprop="url"] [itemprop="name"]').text().trim().toUpperCase().replace(author, '');

    books.push({ title, author, source });
  });

  return books;
}

module.exports = () => {
  return fetch(url)
    .then(response => response.text())
    .then(extractBooks)
}

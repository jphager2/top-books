const cheerio = require('cheerio');
const fetch = require('node-fetch');

const url = 'https://www.goodreads.com/list/show/2681.Time_Magazine_s_All_Time_100_Novels';

const handleError = (err) => {
  console.error(err.message || err);
}

const extractBooks = (html) =>  {
  const $ = cheerio.load(html);

  const books = [];

  $('[itemtype="http://schema.org/Book"]').map((undefined, book) => {
    const author = $(book).find('[itemprop="author"] [itemprop="name"]').text().trim();
    const title = $(book).find('[itemprop="url"] [itemprop="name"]').text().trim().replace(author, '');

    books.push({ title, author });
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

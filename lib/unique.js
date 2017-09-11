/**
 * Print out unique books (line separated JSON) based on title
 *
 * USAGE:
 *
 * node lib/unique.js data/books.json
 */

const fs = require('fs');

const filename = process.argv[2];

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) {
    throw new Error(err);
  }

  const books = data.toString().split("\n");
  const titles = [];

  let book;
  let title;

  books.forEach((json) => {
    if (!json) {
      return;
    }

    try {
      book = JSON.parse(json);
      title = (book.title || "").toUpperCase();

      if (titles.includes(title)) { return; }

      titles.push(title);
      console.log(JSON.stringify(book));
    } catch (err) {
      console.error(err);
      console.error(json);
      process.exit(1);
    }
  });
});

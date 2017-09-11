const fs = require('fs');

const filename = process.argv[2];

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) {
    throw new Error(err);
  }

  const books = data.toString().split("\n");
  const titles = [];

  books.forEach((json) => {
    if (!json) {
      return;
    }

    try {
      book = JSON.parse(json);

      if (titles.includes(book.title)) { return; }

      titles.push(book.title);
      console.log(JSON.stringify(book));
    } catch (err) {
      console.error(err);
      console.error(json);
      process.exit(1);
    }
  });
});

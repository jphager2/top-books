const { version } = require('./package.json');

const lists = [
  require('./lib/goodreads'),
  require('./lib/modern_library'),
  require('./lib/telegraph'),
  require('./lib/the_greatest_books'),
  require('./lib/the_guardian'),
];

const fetchBooks = function() {
  console.log(`fetching books from ${lists.length} sources`);
  lists.forEach((fn) => fn());
};

module.exports = {
  version,
  fetchBooks,
}


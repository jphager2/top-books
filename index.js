const { version } = require('./package.json');

const lists = [
  require('./lib/goodreads'),
  require('./lib/modern_library'),
  require('./lib/telegraph'),
  require('./lib/the_greatest_books'),
  require('./lib/the_guardian'),
];

const fetchBooks = () => {
  const promises = lists.map((fetchList) => {
    return fetchList()
      .catch((err) => {
        console.error(err);
        return [];
      });
  });
  return Promise.all(promises).then((lists) => {
    return lists.reduce((list, books) => books.concat(list), []);
  });
};

class Books {
  constructor(data) {
    this.data = data.split('\n').map(JSON.parse);
  }
}

const db = (data) => {
  return new Books(data);
};

module.exports = {
  version,
  fetchBooks,
  db,
}

#!/usr/bin/env node

const fs = require('fs');
const assert = require('assert');
const program = require('commander');
const Table = require('cli-table');
const tb = require('../index');

const DB_PATH = './data/books.json';

tb.db.connect = () => {
  return new Promise((resolve, reject) => {
    const data = fs.readFile(DB_PATH, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('connection refused: try `top-books fetch` or `top-books --help`'));
      }
      resolve(tb.db(data));
    });
  });
};

const assertDB = () => {
 console.error('You must fetch first. See --help for a list of commands.');
};

const fetchBooks = () => {
  tb.fetchBooks().then((books) => {
    const data = books.map(JSON.stringify).join('\n');

    fs.mkdir('./data', (err) => {
      if (err && !err.message.match(/EEXIST/)) {
        console.error(err);
      }
    });
    fs.writeFile('./data/books.json', data, (err) => {
      if (err) {
        console.error(error);
      } else {
        console.log(Buffer.byteLength(data, 'utf-8'));
      }
    });
  })
};

const withDB = (fn) => {
  return (...arguments) => {
    tb.db.connect()
      .then((db) => {
        fn(db, ...arguments);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
}

const listTitles = (db) => {
  const titles = new Set(db.data.map((book) => {
    return book.title.toUpperCase();
  }).sort());

  Array.from(titles).forEach((title) => console.log(title));
}

const listBooks = (db, options) => {
  if (options.titles) {
    return listTitles(db);
  }

  const sortBy = options.sort || 'title';

  const books = db.data.sort((a, b) => {
    return a[sortBy].localeCompare(b[sortBy]);
  });

  const table = new Table({
    head: ['title', 'author', 'source'],
  });

  books.forEach((book) => {
    const { title, author, source } = book;
    table.push([title, author, source]);
  });

  console.log(table.toString());
};

program
  .version(tb.version);

program
  .command('fetch')
  .description('extract books from lists (required before using other commands!)')
  .action(fetchBooks);

program
  .command('list')
  .description('list unique books from db')
  .option('-T, --titles', 'only show titles')
  .option('-s, --sort [attr]', 'sort by attribute (title|author|source)')
  .action(withDB(listBooks));

program.parse(process.argv)

#!/usr/bin/env node

const program = require('commander');
const tb = require('../index');

program
  .version(tb.version);

program
  .command('fetch')
  .description('extract books from lists')
  .action(tb.fetchBooks);

program.parse(process.argv)

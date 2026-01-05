#!/usr/bin/env node
// cli/index.js

const { program } = require('commander');
// const chalk = require('chalk');
const init = require('./commands/init');

program
  .name('v-pack')
  .description('V-Pack CLI - Component library for React Native')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize V-Pack configuration (creates tailwind.config.js)')
  .option('-f, --force', 'Overwrite existing tailwind.config.js')
  .action(init);

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

// cli/commands/init.js

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const access = promisify(fs.access);

async function init(options) {
  console.log(chalk.blue('🚀 Initializing V-Pack...\n'));

  const cwd = process.cwd();
  const configPath = path.join(cwd, 'tailwind.config.js');

  try {
    // Check if tailwind.config.js already exists
    const configExists = await checkFileExists(configPath);

    if (configExists && !options.force) {
      console.log(chalk.yellow('⚠️  tailwind.config.js already exists!'));
      console.log(chalk.gray('   Use --force to overwrite\n'));

      const inquirer = (await import('inquirer')).default;
      const { shouldOverwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'shouldOverwrite',
          message: 'Do you want to overwrite it?',
          default: false,
        },
      ]);

      if (!shouldOverwrite) {
        console.log(chalk.gray('✋ Initialization cancelled.'));
        return;
      }
    }

    // Read template
    const templatePath = path.join(__dirname, '../../tailwind.config.js');
    let template = await readFile(templatePath, 'utf-8');

    // Write config file
    await writeFile(configPath, template, 'utf-8');

    console.log(chalk.green('✅ Successfully created tailwind.config.js\n'));

    // Show next steps
    console.log(chalk.bold('Next steps:\n'));
    console.log(chalk.gray('1. Install dependencies:'));
    console.log(chalk.cyan('   npm install twrnc\n'));

    console.log(chalk.gray('2. Wrap your app with VPackProvider:'));
    console.log(chalk.cyan(`   import { VPackProvider } from 'v-pack';`));
    console.log(chalk.cyan(`   import theme from './tailwind.config.js';\n`));
    console.log(chalk.cyan(`   <VPackProvider theme={theme}>`));
    console.log(chalk.cyan(`     <App />`));
    console.log(chalk.cyan(`   </VPackProvider>\n`));

    console.log(chalk.gray('3. Start using V-Pack components:'));
    console.log(chalk.cyan(`   import { VButton, VInput } from 'v-pack';\n`));

    console.log(chalk.green('🎉 Happy coding!\n'));
  } catch (error) {
    console.error(chalk.red('❌ Error creating tailwind.config.js:'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function checkFileExists(filePath) {
  try {
    await access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

module.exports = init;

#! /usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { commands } from './commands';

const pkg = {
  version: process.env.npm_package_version ?? '1.0.0',
};

program
  .version(pkg.version)
  .argument(
    '<type>',
    "choose 'template', 'render-dom', 'reconciliation', 'counter-app' or 'completed' (required)"
  )
  .argument('<project-name>', 'your project name (required)')
  .usage(`${chalk.yellow('<type>')} ${chalk.green('<project-name>')}`)
  .action((type, projectName) => {
    commands(type, projectName);
  })
  .parse(process.argv);

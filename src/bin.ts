#! /usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { commands } from './commands';

const pkg = {
  version: process.env.npm_package_version ?? '1.0.0',
};

program
  .version(pkg.version)
  .argument('<year>', "choose '2021', '2023' (required)")
  .argument(
    '<type>',
    `choose at least one from the below options (required)
2021: 'template', 'render-dom', 'reconciliation', 'counter-app' or 'completed'
2023: 'ssr-template', 'ssr-completed', 'ssg-template', or 'ssg-completed'`
  )
  .argument('<project-name>', 'your project name (required)')
  .usage(`${chalk.cyan('<year>')} ${chalk.yellow('<type>')} ${chalk.green('<project-name>')}`)
  .action((year, type, projectName) => {
    commands(year, type, projectName);
  })
  .parse(process.argv);

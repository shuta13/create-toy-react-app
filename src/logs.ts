import chalk from 'chalk';

export const info = (msg: string) => {
  return console.log(`${chalk.bold('INFO')} > ${msg}\n`);
};

export const error = (msg: string) => {
  return console.log(`${chalk.red('ERROR')} > ${msg}\n`);
};

export const success = (msg: string) => {
  return console.log(`${chalk.green('SUCCESS')} > ${msg}\n`);
};

import { argumentTypes, Type } from './utils';
import * as logs from './logs';
import { exit } from 'process';
import fs from 'fs';
import HostedGitInfo from 'hosted-git-info';
import execa from 'execa';
import chalk from 'chalk';
import path from 'path';
import { getPkgManager } from './utils/cmd';

const cloneRepositoryFromBranch = async (year: string, type: Type, projectName: string) => {
  logs.info(`clone project for ${chalk.bold(projectName)}...`);

  const gitInfo = HostedGitInfo.fromUrl(
    'https://github.com/shuta13/react-deep-dive'
  );
  const url = gitInfo?.https({ noCommittish: true, noGitPlus: true });

  if (url == null) {
    return;
  }

  const branch =
    type === 'completed' ? ['--branch', `${year}/main`] : ['--branch', `${year}/feat/${type}`];
  const args = [
    'clone',
    url,
    ...branch,
    projectName,
    '--single-branch',
    '--recursive',
  ];
  await execa('git', args, { stdio: 'inherit' });
  await fs.promises.rm(path.join(projectName, '.git'), { recursive: true });

  logs.success(`clone project for ${chalk.bold(projectName)}`);
};

const installDeps = async (projectName: string) => {
  logs.info('install dependencies...');
  process.chdir(projectName);

  const pkgManager = getPkgManager();
  await execa(pkgManager, ['install']);

  logs.success('installed dependencies');
};

const usage = (projectName: string) => {
  const pkgManager = getPkgManager();
  const isYarn = pkgManager === 'yarn';
  const dev = isYarn ? 'yarn dev' : 'npm run dev';
  const build = isYarn ? 'yarn build' : 'npm run build';
  const start = isYarn ? 'yarn start' : 'npm run start';

  const guide = `To build for development:
    ${chalk.bold(dev)}

  To build for production:
    ${chalk.bold(build)}

  To start the server:
    ${chalk.bold(start)}
  `;

  return logs.info(`Project is now ready to start.

  You're next steps are:
    ${chalk.bold(`cd ${projectName}`)}

  ${guide}

  If you have some questions or feedback, please let me know:
    ${chalk.cyan('https://github.com/shuta13/create-toy-react-app/issues')}
  `);
};

const initailize = async (year: string, type: Type, projectName: string) => {
  console.log(chalk.green('🤿 Hello React Deep Divers!'));

  await cloneRepositoryFromBranch(year, type, projectName);

  await installDeps(projectName);

  usage(projectName);
};

export const commands = (year: string, type: Type, projectName: string) => {
  if (!argumentTypes.includes(type)) {
    const pkgManager = getPkgManager();
    let cmd =
      pkgManager === 'yarn'
        ? 'yarn create toy-react-app'
        : 'npx create-toy-react-app';

    logs.error(`invalid type argument, try ${chalk.bold(`${cmd} -h`)}`);
    exit(1);
  }

  if (fs.existsSync(projectName)) {
    logs.error(`${projectName} is already exist`);
    exit(1);
  }

  initailize(year, type, projectName);
};

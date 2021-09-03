import execa from 'execa';

let pkgManager: 'yarn' | 'npm' | undefined;

export const getPkgManager = () => {
  if (pkgManager) {
    return pkgManager;
  }

  try {
    execa.sync('yarnpkg', ['--version']);
    pkgManager = 'yarn';
  } catch (e) {
    pkgManager = 'npm';
  }

  return pkgManager;
};

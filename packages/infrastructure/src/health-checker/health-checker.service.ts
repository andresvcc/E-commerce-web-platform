import { formatTime } from 'helpers';
import fs from 'fs';
import path from 'path';

export const healthChecker = () => {
  const findClosestPackageJson = (dir) => {
    const potentialPath = path.join(dir, 'package.json');

    if (fs.existsSync(potentialPath)) {
      return JSON.parse(fs.readFileSync(potentialPath, 'utf-8'));
    } else if (dir === path.parse(dir).root) {
      return null;
    } else {
      return findClosestPackageJson(path.dirname(dir));
    }
  };

  const packageData = findClosestPackageJson(process.cwd());
  const name = packageData ? packageData.name : 'unknown';
  const version = packageData ? packageData.version : 'unknown';
  const uptime = formatTime(process.uptime());
  const isHealthy = true;

  return {
    name,
    version,
    uptime,
    isHealthy,
  };
};

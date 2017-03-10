import cloneDeep from 'lodash/cloneDeep';

const upgrades = [
  '1.0.0',
  '1.0.1',
  '1.0.2',
  '2.0.0'
];

export function migrateData(data) {
  let upgradedData = cloneDeep(data);

  const versionIndex   = upgrades.indexOf(data.version);
  const upgradeProcess = upgrades.slice(versionIndex + 1, versionIndex.length);

  upgradeProcess.forEach((version) => {
    console.log(`Mimic: migrating from version ${data.version} to ${version}`);

    try {
      const { migrate } = require(`api/migrations/migration-${version}`);

      if (migrate) {
        upgradedData = migrate(upgradedData);
      }
    } catch (error) {
      console.error(`FAILED TO MIGRATE TO ${version}`);
      console.error(error);
    }
  });

  return upgradedData;
}

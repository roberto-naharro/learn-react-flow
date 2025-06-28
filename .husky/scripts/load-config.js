/**
 * Script to load and parse the husky configuration file
 * Usage: node load-config.js pre-push
 */

const configType = process.argv[2];

if (configType === 'pre-push') {
  import('../../.husky/config.js')
    .then((config) => {
      if (!config.default.prePush.enabled) {
        console.log('disabled');
        process.exit(0);
      }

      const settings = [];
      if (config.default.prePush.runUnitTests) settings.push('unit');
      if (config.default.prePush.runE2ETests) settings.push('e2e');

      console.log(settings.join(','));
    })
    .catch((err) => {
      // If there's an error loading the config, use default settings
      console.error('Error loading config:', err.message);
      console.log('unit,e2e');
    });
} else {
  console.error('Unknown config type:', configType);
  process.exit(1);
}

import { baseConfig } from './wdio.shared.conf';

const config = { ...baseConfig };

config.services = [...(config.services || []), ['selenium-standalone', { drivers: { chrome: true } }]];

config.waitforTimeout = 30000;
config.exclude = ['../specs/availability/**/*'];

export { config };

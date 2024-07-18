import { baseConfig } from './wdio.shared.conf';

const config = { ...baseConfig };
const isDebugMode = !!process.env.DEBUG;
const isMeasuringPerformance = !!process.env.PERFORMANCE_MEASURE;

config.user = process.env.SAUCE_USERNAME;
config.key = process.env.SAUCE_ACCESS_KEY;
config.bail = 'SAUCE_BAIL' in process.env ? parseInt(process.env.SAUCE_BAIL as string) : 1;
config.region = 'us';
const BUILD_PREFIX = process.env.BUILD_PREFIX ?? ``;
const defaultBrowserSauceOptions = {
  build: `${BUILD_PREFIX}Luminate Dashboard MFE build-${new Date().toISOString()}`,
  screenResolution: '1600x1200',
  extendedDebugging: true,
  capturePerformance: isMeasuringPerformance,
  avoidProxy: true,
  timeZone: 'Chicago'
};
const defaultBrowserDesktopSauceOptions = {
  screenResolution: '1600x1200'
};

baseConfig.services = [
  ...(baseConfig.services || []),
  [
    'sauce',
    {
      sauceConnect: isDebugMode
    }
  ]
];

config.services = baseConfig.services;
config.beforeSuite = function(suite) {
  browser.execute(`sauce:job-name=${suite.title}`);
};
const timeout = 30000;
config.waitforTimeout = isDebugMode ? timeout * 2 : timeout;
config.exclude = [
  '../specs/availability/**/*',
  '../specs/dashboard/add-card-empty-dashboard.spec.ts', // TODO: bring this back once https://jira.jda.com/browse/LUI-7560 is completed
  '../specs/dashboard/configure-child-card-on-nested-card.spec.ts' // TODO: bring this back once https://jira.jda.com/browse/LUI-10899 is completed
];
config.capabilities = [
  /*
    {
      'appium:deviceName': 'iPad 10.2 2020',
      'appium:platformVersion': '14.3',
      'appium:orientation': 'LANDSCAPE',
      browserName: 'Safari',
      platformName: 'iOS',
      'sauce:options': {
        ...defaultBrowserSauceOptions,
        appiumVersion: '1.18.1'
      },
    }, */ /*
  {
    'appium:deviceName': 'Samsung Galaxy Tab A 10 GoogleAPI Emulator',
    'appium:platformVersion': '8.1',
    'appium:orientation': 'LANDSCAPE',
    browserName: 'chrome',
    platformName: 'Android',
    'sauce:options': {
      ...defaultBrowserSauceOptions,
      appiumVersion: '1.18.1'
    },
  },
  {
    browserName: 'chrome',
    browserVersion: 'latest',
    platformName: 'Windows 10',
    'sauce:options': {
      ...defaultBrowserSauceOptions,
      ...defaultBrowserDesktopSauceOptions
    }
  }, */
  {
    browserName: 'chrome',
    browserVersion: 'latest',
    platformName: 'macOS 10.15',
    'sauce:options': {
      ...defaultBrowserSauceOptions,
      ...defaultBrowserDesktopSauceOptions
    }
  },
  /* {
    browserName: 'MicrosoftEdge',
    browserVersion: 'latest',
    platformName: 'Windows 10',
    'sauce:options': {
      ...defaultBrowserSauceOptions,
      ...defaultBrowserDesktopSauceOptions
    }
  },
  /*
  Temporarily disable Safari as there is an issue to be addressed in: https://jira.jda.com/browse/LUI-4240
  {
    browserName: 'safari',
    browserVersion: 'latest',
    platformName: 'macOS 10.15',
    'sauce:options': {
      ...defaultBrowserSauceOptions,
      ...defaultBrowserDesktopSauceOptions,
      enablePopups: 'true',
      allowAllCookies: 'true',
  },
  }, 
  {
    browserName: 'firefox',
    browserVersion: 'latest',
    platformName: 'macOS 10.15',
    'sauce:options': {
      ...defaultBrowserSauceOptions,
      ...defaultBrowserDesktopSauceOptions
    }
  }*/
];

// Hook to capture Sauce Labs session ID
let sessionId: string;

config.afterTest = async function(test, context, { error, result, duration, passed }) {
  if (passed && browser.sessionId) {
    sessionId = browser.sessionId;
    console.log(`SESSION_ID=${sessionId}`);
  }
};

export { config };

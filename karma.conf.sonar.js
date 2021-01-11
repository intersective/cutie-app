// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
// Test

var path = require('path');

module.exports = function (config) {
  config.set({

    basePath: '',

    // coverage reporter generates the coverage
    reporters: ['progress', 'sonarqubeUnit', 'coverage'],

    preprocessors: {
      'src/**/*.js':   ['coverage'],
      'src/**/*.ts':   ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'html', subdir: '.' },
        { type: 'lcov', subdir: '.' },
        { type: 'lcovonly', subdir: '.' }
      ]
    },
    // coverageReporter: {
    //   type : 'lcovonly',
    //   dir : 'coverage/'
    // },
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    // files: [
    //   'src/**/*.ts'
    //   // 'test/spec/**/*.ts'
    // ],
    exclude: ['node_modules'],
    // preprocessors: {'**src/**/*.ts': ['coverage'], '**src/*.ts': ['coverage']},
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-sonarqube-unit-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: 'coverage/test_report.xml',
      overrideTestDescription: true,
      testPaths: ['./src'],
      testFilePattern: '.spec.ts',
      useBrowserName: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};

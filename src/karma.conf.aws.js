const puppeteer = require("puppeteer");
process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-htmlfile-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client:{
            clearContext: false
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../coverage'),
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true,
            thresholds: {
                statements: 25,
                lines: 25,
                branches: 8,
                functions: 25
            }
        },
        htmlReporter: {
            outputFile: require('path').join(__dirname, '../tests/result.html'),
            pageTitle: 'Practera Cutie App Unit Tests',
            subPageTitle: 'Practera Cutie App',
            groupSuites: true,
            useCompactStyle: true,
            useLegacyStyle: true,
            showOnlyFailed: false
        },
        reporters: ['progress', 'kjhtml', 'html'],
        port: 19876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['ChromeHeadlessNoSandbox'],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
        singleRun: true
    });
};
# Practera-cutie

[GitHub Page](https://intersective.github.io/cutie/)

## Requirements

- Ionic 4
- Angular 7

## Install

Run `npm install` to install necessary packages

Run `npm run start` to start a development server on your local, and calling stage-test.practera.com for API

## Capacitor

We use Capacitor to make the app work on Android, IOS & Electron


### Android
 - run `npx cap add android` to add android folder
 - run `npx cap open android` to open the project

### IOS
 - run `sudo gem install cocoapods` to install cocoapods
 - run `npx cap add ios` to add ios folder
 - run `npx cap open ios` to open the project in Xcode

### Electron
 - run `npx cap add electron` to add electron folder
 - run `npm run electron:start` to launch the Electron instance

After code changes, in order to test the code on Android/IOS/Electron, run `npm run build`

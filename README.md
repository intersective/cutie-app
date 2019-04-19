# Practera-cutie

[GitHub Page](https://intersective.github.io/cutie/)

## Requirements

- Ionic 4
- Angular 7

## Installation

Run `npm install` to install necessary packages

Run `npm run start` to start a development server on your local, and calling stage-test.practera.com for API

## Capacitor

We use Capacitor to make the app work on Android, IOS & Electron

### Android
 - install [JAVA 8 JDK](https://www.oracle.com/technetwork/java/javaee/downloads/jdk8-downloads-2133151.html)
 - install [Android Studio](https://developer.android.com/studio/index.html)
 - run `npx cap open android` to open the project

### IOS
 - Xcode 9 or above version is needed
 - install the Xcode Command Line tools (either from Xcode, or running `xcode-select --install`)
 - run `sudo gem install cocoapods` to install cocoapods
 - run `pod repo update` to update Cocoapods
 - run `npx cap open ios` to open the project in Xcode

### Electron
 - run `npm run electron:start` to launch the Electron instance

After code changes, in order to test the code on Android/IOS/Electron, run `npm run build`.

If there are dependency changes, run `npx cap sync`

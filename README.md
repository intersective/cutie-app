# Practera-cutie

[GitHub Page](https://intersective.github.io/cutie/)
*TODO: No unit test, sonar test yet for cuite-app*

## Requirements

- Ionic 7
- Angular 15

## Development

1. To run this project locally, start with `demo:true` (in environment.ts)
1. Go to `https://localhost:4202/auth/demo` (the SSL must not be omitted) to get authorised locally
1. Ignore the `.localsegment` error during compilation (it's for devops purpose)
1. Start coding!

### Routes

1. Open the `app-routing.module.ts` file.
2. Find the available routing URLs.
3. Manually update the URL in your browser to access the desired page.

### Sandbox API environment (option 1)

1. Copy the "me" object from the localStorage of our app or core-admin.
2. Paste it into the localStorage of your running local cutie-app with the same key ("me").
3. Ensure there is no content in the root "/".
4. Add a relative URL after `https://localhost:4202/` to see the expected content.
  - For example, `https://localhost:4202/overview-only` will redirect you to the *overview-only* route.
  - Without a relative URL, you will get stuck at `https://localhost:4202`.

> Note: Use port 4202 if running `npm start`, or change it according to how you serve the app locally.

> Note: If you prefer to access a specific page, please refer to the [Routes](#routes) section above.

### Sandbox API environment (option 2)

1. Use the following URL format: `https://localhost:4202/?redirect=overview-only&jwt={OUR-APP-APIKEY}`
2. Retrieve the APIKEY from the localStorage or HTTP header of an already authorised app user and replace `{OUR-APP-APIKEY}` with the obtained APIKEY.
3. You will be redirected to the specified "redirect" destination.

## Installation

- Run `npm install` to install necessary packages
- Duplicate `environment.local.ts` under the `src/environments/` folder and rename it to `environment.ts`
- Run `npm run start` to start a development server on your local, and calling sandbox.practera.com for API

## Demo

To run the demo version of CUTIE on local

1. Go to `src/environments/environments.ts`, change `demo: false` to `demo: true`
1. Run `npm run start` to start a local server on `localhost:4202`

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

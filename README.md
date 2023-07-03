# message-journal-js

[![Build Status](https://jenkins.cerner.com/ion/job/AS075468/job/message-journal-js/job/master/badge/icon)](https://jenkins.cerner.com/ion/job/AS075468/job/message-journal-js/job/master/)

message-journal-js is a node module to support the message_journal_engine rails engine. Within this project is the React component called the MessageJournalApplication.

- [Getting Started](#getting-started)
- [Local Development](#local-development)
- [More Information](#more-information)

## Getting Started

- Add a '.npmrc' file to your base directory containing the line:

```
registry=https://cernerrepos.net/api/npm/npm
```

Then install the module by running:
```
npm install message-journal-js
```

Then install the following peerDependencies as devDependencies:
```
npm install --save-dev react react-dom react-intl
```

## Local Development
### Installing The Project
Install and compile javascript assets with:
```sh
> npm install
```
To remove all installed node_modules dependencies and re-install run:
```
➭ npm run clean:install
```

### Compiling Assets
The [Babel](https://babeljs.io/) JS compiler is used to compile src content to lib. 

```sh
npm run compile
```

### Running the Site
While developing, the following command can be used to pack and serve assets via [webpack-dev-server](https://webpack.js.org/configuration/dev-server/). By default this enabled hot reloading for JS and JSX files.
```sh
➭ npm run start
```

To validate the JS assets against the assets used during browser integration testing, run the following command. It will pack and serve assets via [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) in production mode.
```sh
➭ npm run start-prod
```

To develop and test JS assets in IE, run the following command. It will webpack your assets in production mode and serve the assets via Terra Static Server.
```sh
➭ npm run start-static 
```

## Testing
### Lint
This project used [ESlint](https://eslint.org/) and [stylelint](https://stylelint.io/) to lint JS and CSS/SASS files and it extends the [Terra ESLint](https://github.com/cerner/terra-toolkit/tree/main/packages/eslint-config-terra) and [Terra stylelint](https://github.com/cerner/terra-toolkit/tree/main/packages/stylelint-config-terra) configurations.

Check for lint errors within the project use the following command:

```sh
npm run test:lint
```

### Jest Tests

Unit tests are written with the [Jest](https://jestjs.io/en/) Testing Framework.

Run Jest tests run the following command:

```sh
npm run test:jest
```

Jest snapshots can be regenerated with the `-u` update flag. In the case a jest snapshot needs to be updated, make sure the new changes are intended.

```sh
npm run test:jest -- -u
```

### WDIO Tests
Browser Integration is tested via the [Webdriver.io](https://v6.webdriver.io/) Testing Framework.

To run WDIO tests locally against the selenium grid against Chrome, Firefox and IE browsers, run:

```sh
> npm run test:wdio:local
```
For more CLI options, run:
```sh
node node_modules/@cerner/terra-cli/bin/terra wdio -h
```

## Developing Along Side the Associated Engine
These docs assume the following folder structure:
```
/your-projects
  /message-journal-js
  /message-journal-js
```

## Install Git Reference
To develop along side the associated Engine, update the project reference with the client/package.json to reference the git branch reference that is being developed on.
```json
"message-journal-js": "git://github.cerner.com/AS075468/message-journal-js.git#<branch_name>"
```
It is important to use the git reference, and not a local linked reference. When using npm link to create a locale reference to your JS project on your device and when you run webpack, it will resolve your imports to the linked directory's node_module references instead of the version within the engine. This causes mis-match versions with context components

## Compiling Assets For the Engine
To avoid re-installing the client node dependencies for each change within the JS project, you can utilize Babel to compile your JS assets into the client's node_module directory. Babel's command line supports an `--out-dir` flag which allows your to choose the compile asset's directory location. When you compile to the client's node_module directory, it is consistent with a fresh install of the module.

Run babel in watch mode to compile src content to ../message_journal_engine/client/node_modules/message-journal-js/lib by running:

```sh
npm run compile:engine
```

## More Information
Please visit the [wiki page](https://wiki.cerner.com/display/Orion/Structure+-+Node+Module) for more information about what was generated.

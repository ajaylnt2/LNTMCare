# Wages

Seed project for angular apps using ES6 and webpack bundler.

This project was tested with the latest version of nodeJS and npm, please make sure you have atleast  [node.js](https://nodejs.org/) 5+ and [NPM](https://www.npmjs.com/) 3+ installed.

##Running node js Server
- go to the folder `srv` in the project.
- run `node index.js`

## Usage & Develop

- Clone or fork this repository
- run `npm install` to install dependencies
- run `npm install auth0-js angular-lock angular-jwt angular-auth0@2.0.0-beta.2` to install auth0 lock dependencies
- run `npm install angular-chart.js angular-nvd3` to install chart dependencies
- run `npm install angular-route@1.6.4 @uirouter/angularjs` to install route dependencies
- run `npm install angular-storage ng-dialog angular-paging json-tree2 angular-xeditable` to install other dependencies
- run `gulp serve` if any error occurs like node-sass go with `npm rebuild node-sass` or other error related to npm then use  `npm update`
- open browser to [`http://localhost:3000`](http://localhost:3000)




After login refresh the page to open the dashboard (There was an issue in login authentication issue, will try to resolve as soon as possible).

## Build

to create a ready production distribution package of the project please run:

```
npm run build
```

after running build the generated files will be available at `/dist`

## Testing

This seed is has protractor and karma for end to end testing and unit testing respectively.

### Unit Testing

make sure your tests are named with a `-test.js` suffix then. to run karma simply run:

```
npm test
```

### End to end Testing

to start protractor tests please run:

```
npm run protractor
```

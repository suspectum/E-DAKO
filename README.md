# E-DAKO Budget Tracking App - MERN Stack

E-DAKO Budget Tracking App is a fullstack MERN application which helps individuals to gain control on their budget by helping them to organize income & expense streams.

Essentially, I started this project to learn React JS but along the way it turned into full stack application. This process helped me a lot to develop fundamental understanding on the structure of frontend & backend.

### Features

- Register new user by email
- Email verification
- Forgot-Reset Password future
- Authentication with JWT(short live) & Refresh Tokens (long live) in Node.js + MongoDB API or Firebase Api
- Revoke Refresh Tokens to stop compromised account to recevive new JWT
- Perform CRUD operations on users with Admin privileges
- Perform CRUD operations on transactions

### Stack

- Client-Side Framework: [ReactJS](https://reactjs.org/)
- State Management: [Redux](https://react-redux.js.org/)
- Web Framework: [ExpressJS](https://expressjs.com/)
- Web Server: [NodeJS](https://nodejs.org/en/)
- Database: [MongoDB](https://www.mongodb.com/)
- Code Formatting: [Prettier](https://prettier.io/)
- UI components: [Material-UI](https://mui.com/)
- Styling: [@emotion/styled](https://emotion.sh/docs/styled)
- Forms: [Formik](https://formik.org/docs/overview)
- Form validations: [Yup](https://github.com/jquense/yup)
- Authentication: [JSON Web Token](https://jwt.io/) , [Firebase](https://firebase.google.com/)

## Get Started With Client

1. Add the project locally:

```shell
$ git clone https://github.com/suspectum/E-DAKO
$ cd client
$ npm install
```

2. Create a free account at [https://firebase.google.com](https://firebase.google.com)

3. Create a new project

4. Get connection details from [https://firebase.google.com](https://console.firebase.google.com/project/_/settings/general/web)

5. Setup .env file to initialize the connection with firebase

```
// .env configuration for client side
REACT_APP_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_AUTH_DOMAIN=XXXXXXXXXXX.firebaseapp.com
REACT_APP_PROJECT_ID=XXXXXXXXXXX
REACT_APP_STORAGE_BUCKET=XXXXXXXXXXX.appspot.com
REACT_APP_MESSAGING_SENDER_ID=XXXXXXXXXXXX
REACT_APP_APP_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Server Side

1. Install server dependencies:

```shell
$ cd server
$ npm install
```

2. Create a free account at [https://www.mongodb.com/](https://www.mongodb.com/) 

3. Get connection details from [mongodb](https://www.mongodb.com/), [google cloud](https://console.cloud.google.com/apis/credentials/oauthclient/) and [firebase](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk)

4. Setup .env file

```
// .env configuration for server side
MONGODB =  mongodb+srv://XXXX:XXXXXXXXXX@cluster0.ykhex.mongodb.net/XXXXX?retryWrites=true&w=majority
PORT = 4000
SECRET = SECRET FOR JWT, IT CAN BE ANY STRING
JWT_LIFE = 15min
// 7 days, 24 hours, 60 minutes, 60 seconds, 1000 milliseconds
REFRESH_TOKEN_COOKIE_LIFE = 7 * 24 * 60 * 60 * 1000

GMAIL_API_USER= "XXXXXXXX@gmail.com"
GMAIL_API_CLIENT_ID="XXXXXXXXXXXXXXX.apps.googleusercontent.com"
GMAIL_API_CLIENT_SECRET="XXXXXXXXXXXXXXX"
GMAIL_API_REFRESH_TOKEN="XXXXXXXXXXXXXXX"

FIREBASE_SERVICE_ACCOUNT_TYPE="XXXXXXXXXXXXXXX"
FIREBASE_SERVICE_ACCOUNT_PROJECT_ID="XXXXXXXXXXXXXXX"
FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID="XXXXXXXXXXXXXXX"
FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXXXXXXXXXXXXXXX.......\n-----END PRIVATE KEY-----\n"
FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL="firebase-adminsdk-XXXXXX@tXXXXXXXX.iam.gserviceaccount.com"
FIREBASE_SERVICE_ACCOUNT_CLIENT_ID="XXXXXXXXXXXXXXX"
FIREBASE_SERVICE_ACCOUNT_AUTH_URI="https://accounts.google.com/o/oauth2/auth"
FIREBASE_SERVICE_ACCOUNT_TOKEN_URI="https://oauth2.googleapis.com/token"
FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL="https://www.googleapis.com/oauth2/v1/certs"
FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL="https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-XXXXXXXXXXXXXXX.iam.gserviceaccount.com"
```

5.  For development environment server port is 4000. If you want o change it adjust the client side accordingly.

    1. Navigate to the `client/src/api/api.js` file and replace the port number.<br>

    ```JavaScript
    const API = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://deployURL' : 'http://localhost:4000',
    withCredentials: true,
    });
    ```

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and to decrease the bundle size\*, rewired with [React-App-Rewired](https://github.com/timarney/react-app-rewired)

\*MUI library supports tree-shaking and it's safe to use named imports without worrying about bundle size but it's only for production mode. Top level imports make development bundle bigger and cause slower startup times. To solve this issue either you need to use path imports or make some adjustment if you want to keep use top-level imports. Details can be found at [https://mui.com](https://mui.com/guides/minimizing-bundle-size/#bundle-size-matters). This porject follows the second option so there is no need to take any action regarding this matter.

Apart from standard [react scrips](https://create-react-app.dev/docs/available-scripts) , there are 2 additional scripts that can be used in the `client` directory :

#### `npm run analyze-dev`

Utilize the [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) to analyze development bundle and serve result at [http://localhost:5000](http://localhost:5000)

#### `npm run analyze-pro`

Utilize the [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) to analyze production bundle and serve result at [http://localhost:4000](http://localhost:5000)

These scripts can be found at `client/scripts/analyze.js`.

```JavaScript
//analyze.js
const mode = `${process.argv.slice(2)}`;

const port = mode === 'development' ? 5000 : 4000;

process.env.NODE_ENV = mode;

const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackConfigProd = require('react-scripts/config/webpack.config')(mode);

// this one is optional, just for better feedback on build
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const green = (text) => {
  return chalk.green.bold(text);
};

// pushing BundleAnalyzerPlugin to plugins array
webpackConfigProd.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerPort: port,
  })
);

// optional - pushing progress-bar plugin for better feedback;
// it can and will work without progress-bar,
// but during build time you will not see any messages for 10-60 seconds (depends on the size of the project)
// and decide that compilation is kind of hang up on you; progress bar shows nice progression of webpack compilation
webpackConfigProd.plugins.push(
  new ProgressBarPlugin({
    format: `${green('analyzing...')} ${green('[:bar]')}${green('[:percent]')}${green('[:elapsed seconds]')} - :msg`,
  })
);

// actually running compilation and waiting for plugin to start explorer
webpack(webpackConfigProd, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }
});
```

For the `server` side there are 2 additional scripts:

#### `npm run data:import`

Creates mock users-transactions and submits them to the database. Related scripts can be found at `server/mocks/` directory. Current settings creates 50.000 transactions and 499 new users. To determine size of mock datas please adjust related parts in `_mockTransactions.js` and `_mockUsers.js` .

```JavaScript
// _mockTransactions.js

.......

for (let i = 0; i < 50000; i++) {
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
  const category = type === types.Income ? INCOMECATEGORIES : EXPENSECATEGORIES;
  MOCK_TRANSACTIONS[i] = {
    type: type,
    category: category[Math.floor(Math.random() * category.length)].type,
    amount: faker.finance.amount(),
    date: faker.date.between('2012-01-01', '2021-11-28').toISOString(),
    created: faker.date.between('2012-01-01', '2021-11-28').toISOString(),
  };
}
```

```JavaScript
// _mockUsers.js

.......

for (let i = 0; i < 499; i++) {
  MOCK_USERS[i] = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    passwordHash: hash('123456'),
    role: ROLES[Math.floor(Math.random() * ROLES.length)],
    created: faker.date.past().toLocaleDateString('en-US'),
    verified: faker.date.past().toLocaleDateString('en-US'),
  };
}
```

#### `npm run data:remove`

Deletes exist transactions, users and refreshtokens from database. <br>

To keep the main user and it's transactions please change `keepThisUserEmail` and `keepThisUserId` at `server/mocks/seeder.js`

```JavaScript
// seeder.js

.......

const importData = async () => {
  users = MOCK_USERS;
  transactions = MOCK_TRANSACTIONS;

  const keepThisUserEmail = 'XXXXXXX@XXXXXXX.com';
  const keepThisUserId = '614f5783e6931b9ac2c74f8d';

  try {
    await accountModel.deleteMany({ email: { $ne: keepThisUserEmail } });
    await transactionModel.deleteMany();

.......

```

## API Documentation

To get API Documentation

1. Start server:

```shell
$ cd server
$ npm start
```

2. Navigate to [http://localhost:4000/api-docs/](http://localhost:4000/api-docs/)

You can also reach API documentation at [https://edako.onrender.com/api-docs/](https://edako.onrender.com/api-docs/)<br>
Please select production server to make API call.

![Swagger Api](screenshots/swagger.jpg?raw=true)

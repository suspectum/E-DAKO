import 'dotenv/config';
import express from 'express';
import colors from 'colors';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// project imports
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';

import accountRouter from './routes/accountRoutes.js';
import transactionRouter from './routes/transactionRoutes.js';
import swaggerRouter from './config/swagger.js';

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * use if you want to restrict requests from an unauthorized sources
// * change whitelist acording to your need
// const whitelist = ['http://localhost:3000', 'https://edako.netlify.app/'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(null, false);
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));

// * allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.get('/', (req, res) => {
  res.send('Welcome to server');
});
app.use('/accounts', accountRouter);
app.use('/transactions', transactionRouter);

// swagger docs route
app.use('/api-docs', swaggerRouter);

// global error handler
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server is runing on port ${PORT}`.yellow.bold));

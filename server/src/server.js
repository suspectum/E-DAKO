import 'dotenv/config';
import express from 'express';
import colors from 'colors';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// project imports
import connectDB from './config/db.js';
import errorHandler from './middlewares/error-handler.js';

import accountRouter from './routes/account.routes.js';

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// api routes
app.get('/', (req, res) => {
  res.send('Welcom to server');
});
app.use('/accounts', accountRouter);

// global error handler
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server is runing on port ${PORT}`.yellow.bold));

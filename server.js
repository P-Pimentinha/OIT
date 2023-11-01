import express from 'express';
const app = express();
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/connect.js';
import authenticateUser from './middleware/auth.js';

//error handling
import 'express-async-errors';

//routers
import wordRouter from './routes/wordsRoutes.js';
import authRouter from './routes/authRoutes.js';

//middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

//
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.json());
app.use(helmet());
app.use(compression());

app.get('/timer', authenticateUser, function (request, response) {
  response.sendFile(path.resolve(__dirname, './public/pages', 'timer.html'));
});

// app.get('/wotd', function (request, response) {
//   response.sendFile(
//     path.resolve(__dirname, './public/pages', 'wordoftheday.html')
//   );
// });

app.use('/api/v1/words', wordRouter);
app.use('/api/v1/auth', authRouter);

//error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening in port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

import express from 'express';
const app = express();
import helmet from 'helmet';
import compression from 'compression';
import 'express-async-errors';

//
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// app.use(express.static('public'));

const __dirname = dirname(fileURLToPath(import.meta.url));
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.json());
app.use(helmet());
app.use(compression());

app.get('/timer', function (request, response) {
  response.sendFile(path.resolve(__dirname, './public/pages', 'timer.html'));
});

const port = process.env.PORT || 5000;

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening in port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

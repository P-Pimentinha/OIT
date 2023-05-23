import express from 'express';
const router = express.Router();

import { createWord, getWords } from '../controllers/wordsController.js';

router.route('/').get(getWords).post(createWord);

/* router.route('/').get(getWords); */

export default router;

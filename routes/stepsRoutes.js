import express from 'express';
const router = express.Router();

import {
  getSteps,
  createSteps,
  updateSteps,
} from '../controllers/stepsController.js';

router.route('/').get(getSteps).post(createSteps).patch(updateSteps);

/* router.route('/').get(getWords); */

export default router;

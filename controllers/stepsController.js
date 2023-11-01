import Steps from '../models/Steps.js';

import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createSteps = async (req, res) => {
  const { goal, reached } = req.body;

  if (!goal || !reached) {
    throw new BadRequestError('Please Provide All Values');
  }

  const words = await Steps.create(req.body);
  res.status(StatusCodes.CREATED).json({ words });
};

const getSteps = async (req, res) => {
  const steps = await Steps.find();
  res.status(StatusCodes.OK).json({ steps });
};

const updateSteps = async (req, res) => {
  const { goal, reached, id } = req.body;
  if (!goal || !reached || !id) {
    throw new BadRequestError('Please provide all values');
  }

  const steps = await Steps.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ steps });
};

export { createSteps, getSteps, updateSteps };

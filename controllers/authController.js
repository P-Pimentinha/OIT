import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import { createJWT } from '../utils/tokenUtils.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('please provide all values');
  }

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    throw new BadRequestError('Email Already in Use');
  }

  const user = await User.create({ name, email, password });
  const token = createJWT({ userId: user._id });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('please provide all values');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const token = createJWT({ userId: user._id });
  user.password = undefined;
  console.log(token);
  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  // various setups
  // in this case only id
  // if other properties included, must re-generate

  // const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

export { register, login, updateUser };

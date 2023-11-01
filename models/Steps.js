import mongoose from 'mongoose';

const StepsSchema = new mongoose.Schema({
  goal: {
    type: Number,
    maxlength: 50,
  },
  reached: {
    type: Number,
    maxlength: 50,
  },
});

export default mongoose.model('Steps', StepsSchema);

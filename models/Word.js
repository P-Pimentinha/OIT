import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
  wort: {
    type: String,
    maxlength: 50,
  },
  word: {
    type: String,
    maxlength: 50,
  },
});

export default mongoose.model('Word', WordSchema);

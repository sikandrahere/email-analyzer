import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: false,
  },
  from: {
    type: String,
    required: false,
  },
  espType: {
    type: String,
    required: false,
  },
  receivingChain: {
    type: [String],
    required: false,
  },
  rawHeaders: {
    type: String,
    required: false,
  },
  receivedAt: {
    type: Date,
    required: false,
  },
});

const Email = mongoose.models.Email || mongoose.model('Email', emailSchema);

export default Email;

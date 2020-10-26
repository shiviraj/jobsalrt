const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  subject: { type: String, trim: true },
  message: { type: String, required: true, trim: true },
  date: { type: Number, default: new Date() },
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;

const Feedback = require('../../models/feedback');

const save = async (feedbackData) => {
  const feedback = new Feedback(feedbackData);
  await feedback.save();
};

module.exports = { save };

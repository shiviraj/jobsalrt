const Feedback = require('../../models/feebacks');

const save = async (feedbackData) => {
  const feedback = new Feedback(feedbackData);
  await feedback.save();
};

module.exports = { save };

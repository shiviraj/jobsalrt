const Feedback = require('./wrapper/feedback');

const saveFeedback = async (req, res) => {
  await Feedback.save(req.body);
  res.send({});
};

module.exports = {
  saveFeedback,
};

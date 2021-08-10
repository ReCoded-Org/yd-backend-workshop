const Awareness = require("../models/awareness");

exports.postAddAwareness = async (req, res, next) => {
  const name = req.body.name;
  const title = req.body.title;
  const date = req.body.date;
  const description = req.body.description;

  const awareness = Awareness.build({ name, title, date, description });
  try {
    await awareness.save();
    res.send(awareness);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAwareness = async (req, res, next) => {
  const awareness = await Awareness.findAll();
  res.send(awareness);
};




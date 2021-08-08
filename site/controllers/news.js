const News = require("../models/news");

exports.postAddNews = async (req, res, next) => {
  const name = req.body.name;
  const title = req.body.title;
  const date = req.body.date;
  const description = req.body.description;

  const news = News.build({ name, title, date, description });
  try {
    await news.save();
    res.send(news);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getNews = async (req, res, next) => {
  const news = await News.findAll();
  res.send(news);
};

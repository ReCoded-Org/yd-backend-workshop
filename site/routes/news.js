const express = require("express");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const newsControllers = require("../controllers/news");

router.post("/add-news", isAuth, newsControllers.postAddNews);
router.get("/get-news", newsControllers.getNews);

module.exports = router;

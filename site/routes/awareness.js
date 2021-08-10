const express = require("express");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const awarenessControllers = require("../controllers/awareness");

router.post("/add-awareness", isAuth, awarenessControllers.postAddAwareness);
router.get("/get-awareness", awarenessControllers.getAwareness);

module.exports = router;
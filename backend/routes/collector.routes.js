const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { getAvailableFood } = require("../controllers/collector.controller");

router.get("/available", auth, getAvailableFood);

module.exports = router;

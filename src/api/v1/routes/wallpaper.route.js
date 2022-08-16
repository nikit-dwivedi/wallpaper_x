const express = require("express");
const router = express.Router();

const { getFeaturedImage } = require("../controller/screen.controller");

router.post('/featured', getFeaturedImage);

module.exports = router;
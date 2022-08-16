const express = require("express");
const router = express.Router();

require("./config/mongodb");

const userRoute = require("./routes/client.route.js");
const wallpaperRoute = require("./routes/wallpaper.route.js");
const adminRoute = require("./routes/admin.route.js");
// const buissnessRoute = require('./routes/mrerchantBuissness.route');


router.use("/user", userRoute);
router.use("/", wallpaperRoute);
router.use("/admin", adminRoute);
// router.use("/buissnessRegister",buissnessRoute)

module.exports = router;
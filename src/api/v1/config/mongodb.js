const mongoose = require("mongoose");
db = mongoose.connect(
  "mongodb+srv://nikit:nikit@cluster0.5zi8b.mongodb.net/wallpaperX?retryWrites=true&w=majority",
  (err) => {
    console.log("Database connected");
    if (err) {
      console.log(err);
    }
  }
);
module.exports = { db };

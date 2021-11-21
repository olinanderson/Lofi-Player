const mongoose = require("mongoose"),
  config = require("config"),
  db = config.get("mongoURI"),
  chalk = require("chalk");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: false,
    });

    if (process.env.NODE_ENV === "production") {
      console.log(
        chalk.blueBright("MongoDB connected to"),
        chalk.yellow("MusicPlayer-Production")
      );
    } else {
      console.log(
        chalk.blueBright("MongoDB connected to"),
        chalk.yellow("MusicPlayer-Development")
      );
    }
  } catch (err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

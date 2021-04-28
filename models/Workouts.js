const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Workout = mongoose.model("Workout", new Schema({
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: Array,
  }));

module.exports = Workout;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Workouts = mongoose.model("Workout", new Schema({
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: Array,
  }));

module.exports = Workouts;
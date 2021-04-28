const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Workout = mongoose.model("Workout", new Schema({
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [{
      type: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      duration: {
        type: String,
        required: true
      },
      weight: {
        type: String,
        required: true
      },
      reps: {
        type: String,
        required: true
      },
      sets: {
        type: String,
        required: true
      },
      distance: {
        type: String,
        required: true
      },
    }]
  }));

module.exports = Workout;
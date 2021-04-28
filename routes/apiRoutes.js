const app = require("express").Router();
const { Workouts } = require("../models/index")

app.get("/api/workouts", (req, res) => {
    Workouts.aggregate(
      [
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
          },
        },
      ],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      }
    );
  });
  
  app.put("/api/workouts/:id", (req, res) => {
    Workouts.findById(mongoose.Types.ObjectId(req.params.id))
      .then((dbWorkout) => {
        console.log(dbWorkout);
        const { exercises } = dbWorkout;
        exercises.push(req.body);
        console.log(exercises);
        dbWorkout.save(function (err) {
          if (err) return handleError(err);
        });
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  app.get("/exercise", (req, res) => {
    res.sendFile(__dirname + "/public/exercise.html");
  });
  
  app.get("/stats", (req, res) => {
    res.sendFile(__dirname + "/public/stats.html");
  });
  
  app.post("/api/workouts", (req, res) => {
    const dbWorkout = new Workouts(req.body);
    dbWorkout.save(function (err) {
      if (err) return handleError(err);
    });
  
    res.json(dbWorkout);
  });
  
  app.get("/api/workouts/range", (req, res) => {
    Workouts.aggregate(
      [
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
          },
        },
      ],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          let lastSeven;
          if (result.length > 7) {
            lastSeven = result.filter(
              (workout, index) => index >= result.length - 7
            );
          } else {
            lastSeven = result;
          }
          res.json(lastSeven);
        }
      }
    );
  });
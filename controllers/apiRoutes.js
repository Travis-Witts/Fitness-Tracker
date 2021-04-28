const router = require("express").Router();
const db = require("../models")

// Get last workout
router.get("/api/workouts", async (req, res) => {
    try {
        let lastWorkout = await db.Workout.aggregate([
            {
                $sort: { day: -1 }
            },
            {
                $limit: 1
            },
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                },
            }
        ]);
        console.log(lastWorkout);
        res.status(200).json(lastWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Create Workout
router.post("/api/workouts", async ({ body }, res) => {
    try {
        let newWorkout = await db.Workout.create(body);
        res.status(200).json(newWorkout);
    } catch (error) {
        res.status(404).json(error);
    }
})

// Add Exercise
router.put("/api/workouts/:id", async ({ body, params }, result) => {
    try {
        let updatedWorkout = await db.Workout.findById(params.id)
        updatedWorkout.exercises.push(body)
        Workout.updateOne({ _id: params.id}, updatedWorkout, (err, res) => {
            res.status(200).json()
        })
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = router;
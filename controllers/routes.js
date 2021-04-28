const router = require("express").Router();
const db = require("../models")
const path = require("path")


// Get index page
router.get('/', async (_req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
})

// Get exercise page
router.get('/exercise', async (_req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/exercise.html'))
    } catch (error) {
        console.error(error);
        res.status(500).json(err)
    }
})

// Get workout page
router.get('/stats', async (_req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/stats.html'))
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
})

// Get last workout
router.get("/api/workouts", async (req, res) => {
    try {
        let lastWorkout = await db.Workout.aggregate([
            {
                $limit: 1
            },
            {
                $sort: { day: -1 }
            },
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                },
            }
        ]);
        res.status(200).json(lastWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Get workout range
router.get("/api/workouts/range", async (req, res) => {
    try {
        let workoutRange = await db.Workout.aggregate([
            {
                $limit: 7
            },
            {
                $sort: { _id: -1 }
            },
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                },
            }
        ]);
        res.status(200).json(workoutRange)
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
})

// Create Workout
router.post("/api/workouts", async ({ body }, res) => {
    try {
        let newWorkout = await db.Workout.create(body);
        res.status(200).json(newWorkout);
    } catch (error) {
        console.error(error);
        res.status(404).json(error);
    }
})

// Add Exercise
router.put("/api/workouts/:id", async ({ body, params }, result) => {
    try {
        let updatedWorkout = await db.Workout.findById(params.id)
        updatedWorkout.exercises.push(body)
        db.Workout.updateOne({ _id: params.id}, updatedWorkout, (err, res) => {
            result.status(200).json(updatedWorkout)
        })
    } catch (error) {
        console.error(error);
        res.status(404).json(error);
    }
})


module.exports = router;
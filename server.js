const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public", { extensions: ["html"] }));

app.use(require("./controllers/routes"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessTracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}..`);
})

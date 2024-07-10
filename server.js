require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// Create an instance of the express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Specify a port number for the server
const port = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Route to display a message in the browser
app.get("/", (req, res) => {
  res.send("Welcome to the API server!");
});

// Routes for workouts
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start the server and listen to the port
    app.listen(port, () => {
      console.log(
        `Connected to the database. Server is running on port ${port} and your API backend is up.`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

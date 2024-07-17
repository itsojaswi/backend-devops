// Require necessary modules
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// Create an instance of the express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS (Cross-Origin Resource Sharing)
// Adjust origin as needed based on your frontend setup
app.use(cors());

// Middleware to log requests (optional)
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Route to display a welcome message
app.get("/", (req, res) => {
  res.send("Welcome to the API server!!!!!");
});

// Routes for workouts and user APIs
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Specify a port number for the server
const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start the server and listen to the specified port with HTTPS
    http.createServer(httpsOptions, app).listen(port, () => {
      console.log(
        `Connected to the database. Server is running on port ${port}.`
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

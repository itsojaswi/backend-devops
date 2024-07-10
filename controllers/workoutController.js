const Workout = require("../models/workoutModel");

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(400).json({ error: "NO such workout" });
  }

  res.status(200).json(workout);
};

// create a workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  // add doc to db
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(400).json({ error: "No such workout" });
    }

    res.status(200).json({ message: "Workout deleted successfully", workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!workout) {
      return res.status(400).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
};

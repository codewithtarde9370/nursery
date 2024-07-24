import express from 'express';
import dotenv from 'dotenv';
import getHealth from './controllers/health.js';
import { deletePlantById, getPlant, getPlants, postPlants, putPlantById } from './controllers/plants.js';
import { notFound } from './controllers/error.js';
import mongoose from 'mongoose';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Set default values if environment variables are not set
const MONGODB_URL = process.env.MONGODB_URL || 'your_default_mongodb_url';
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
})(); // IIFE: Immediately Invoked Function Expression

// Health API to check if server is working properly
app.get("/health", getHealth);

// Route to add a new plant
app.post("/plant", postPlants);

// Route to retrieve all plants
app.get("/plants", getPlants);

// Route to retrieve a specific plant by ID
app.get("/plant/:id", getPlant);

// Route to update a plant by ID
app.put("/plant/:id", putPlantById);

// Route to delete a plant by ID
app.delete('/plant/:id', deletePlantById);

// Catch-all route to handle non-existent endpoints
app.use("*", notFound);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

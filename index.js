import express from 'express';
import dotenv from 'dotenv';
import getHealth from './controllers/health.js';
import { deletePlantById, getPlant, getPlants, postPlants, putPlantById } from './controllers/plants.js';
import { notFound } from './controllers/error.js';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process if the connection fails
  }
})();

// health API to check if server is working properly
app.get("/health", getHealth);

// 1. POST route to add a new plant
app.post("/plant", postPlants);

// 2. GET route to retrieve all plants
app.get("/plants", getPlants);

// 3. GET route to retrieve a specific plant by ID
app.get("/plant/:id", getPlant);

// 4. PUT route to update a plant by ID
app.put("/plant/:id", putPlantById);

// 5. DELETE route to delete a plant by ID
app.delete("/plant/:id", deletePlantById);

// Displaying an error message or status of the request made in HTML
app.use("*", notFound);

const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not defined
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

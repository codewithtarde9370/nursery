import express from 'express';
import dotenv from 'dotenv';
import getHealth from './controllers/health.js'
import { deletePlantById, getPlant, getPlants,postPlants, putPlantById } from './controllers/plants.js';
import { notFound } from './controllers/error.js';
import mongoose from 'mongoose';
import cors from 'cors';


dotenv.config()

const app = express();
app.use(cors())
app.use(express.json());

(async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URL);

  if (conn) {
    console.log("success Tarde!");
  } else {
    console.log("failure Tarde!");
  }
})(); //IIFE immediately invoked functiom Expression

// health API to check if server is working properly
app.get("/health",getHealth)  //1. POST route to add a new plant
app.post("/plant",postPlants);   //2. GET route to retrieve all plants
app.get("/plants",getPlants);   //3. GET route to retrieve a specific plant by ID
app.get("/plant/:id",getPlant);  //4. PUT route to update a plant by ID
app.put("/plant/:id",putPlantById);  //5. DELETE route to delete a plant by ID
app.delete('/plant/:id',deletePlantById);
app.use("*", notFound); //displaying an error message or status of the request made in html

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

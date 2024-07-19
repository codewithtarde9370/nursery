import express from 'express';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(express.json());

const plants = [
  {
    "id": 1,
    "name": "pink rose",
    "price": 599,
    "image": "https://images.unsplash.com/photo-1586676810246-7f4",
    "description": "A beautiful yellow rose",
  },
  {
    "id": 6,
    "name": "green rose",
    "price": 579,
    "image": "https://images.unsplash.com/photo-1586676810246-7f4",
    "description": "A beautiful yellow rose",
  }, 
  {
    "id": 7,
    "name": "blue rose",
    "price": 509,
    "image": "https://images.unsplash.com/photo-1586676810246-7f4",
    "description": "A beautiful yellow rose",
  }
];

//1. POST route to add a new plant
app.post("/plant", (req, res) => {
  const { name, price, image, description } = req.body;

  if (!name || !price || !image || !description) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: name, price, image, description",
    });
  }

  const randomId = Math.round(Math.random() * 10000);

  const newPlant = {
    id: randomId,
    name,
    price,
    image,
    description,
  };

  plants.push(newPlant);

  res.status(201).json({
    success: true,
    data: newPlant,
    message: "New plant added successfully",
  });
});

//2. GET route to retrieve all plants
app.get("/plants", (req, res) => {
  res.json({
    success: true,
    data: plants,
  });
});

//3. GET route to retrieve a specific plant by ID
app.get("/plant/:id", (req, res) => {
  const { id } = req.params;
  const plant = plants.find(p => p.id == id);

  if (!plant) {
    return res.status(404).json({
      success: false,
      message: "Plant not found",
    });
  }

  res.json({
    success: true,
    data: plant,
    message: "Plant fetched successfully",
  });
});

//4. PUT route to update a plant by ID
app.put("/plant/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, image, description } = req.body;
  const plantIndex = plants.findIndex(p => p.id == id);

  if (plantIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Plant not found",
    });
  }

  plants[plantIndex] = { ...plants[plantIndex], name, price, image, description };

  res.json({
    success: true,
    data: plants[plantIndex],
    message: "Plant updated successfully",
  });
});

//5. DELETE route to delete a plant by ID
app.delete('/plant/:id', (req, res) => {
  const { id } = req.params; // Get the plant ID from the request parameters
  const plantIndex = plants.findIndex(p => p.id == id); // Find the index of the plant

  if (plantIndex === -1) { // If plant is not found
    return res.status(404).json({
      success: false,
      message: "Plant to be deleted not found",
    });
  }

  plants.splice(plantIndex, 1); // Remove the plant from the array

  res.status(200).json({ // Respond with success message
    success: true,
    message: "Plant deleted successfully",
  });
});

app.use("*", (req,res) => {
res.send(`<div>
  <h1 style="text-align:center;">404: NOT FOUND <h1/>
  </div>
  `)
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

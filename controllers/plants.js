 const plants= [
    {
      "id": 1,
      "name": "Pink Rose",
      "price": 599,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJaiSYX3_5bI0fHLwfcZU1J3ich5sz2IKO8w&s",
      "description": "A beautiful pink rose"
    },
    {
      "id": 2,
      "name": "Red Tulip",
      "price": 629,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlDbJaeAY3x0E3zbtb8fxtcExAj3WV_AEZUQ&s",
      "description": "A stunning red tulip"
    },
    {
      "id": 3,
      "name": "White Lily",
      "price": 649,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT87yGDM4uzB09OuHvRsmBaRioQBU0grlifZg&s",
      "description": "A pure white lily"
    },
    {
      "id": 4,
      "name": "Yellow Daffodil",
      "price": 599,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW0IKXh9M_bOvASy7tLXq5awnTcaFTMn6QpQ&s",
      "description": "A bright yellow daffodil"
    },
    {
      "id": 5,
      "name": "Purple Orchid",
      "price": 619,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlOuWknkyspzsLaQ9nWqFgTpsMLtwxG60rnQ&s",
      "description": "An elegant purple orchid"
    },
    {
      "id": 6,
      "name": "Blue Hydrangea",
      "price": 579,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQun_eRgsyqyNMbeVC2BsAPC3qK4pF0l0yPyw&s",
      "description": "A charming blue hydrangea"
    },
    {
      "id": 7,
      "name": "Orange Marigold",
      "price": 509,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgh8UQfopVQCnI-9Db2YqH-7ZzA8Mw0j01w&s",
      "description": "A vibrant orange marigold"
    },
    {
      "id": 8,
      "name": "Pink Peony",
      "price": 689,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrNWmoM1XHYyKGBoF1mgQTrjtacVS1K5o3YA&s",
      "description": "A delicate pink peony"
    },
    {
      "id": 9,
      "name": "White Jasmine",
      "price": 559,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrNWmoM1XHYyKGBoF1mgQTrjtacVS1K5o3YA&s",
      "description": "A fragrant white jasmine"
    },
    {
      "id": 10,
      "name": "Red Poppy",
      "price": 539,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ82LHCMkdbSxeIECbZwpnCOcRJLsFqqV-FA&s",
      "description": "A vivid red poppy"
    }
  ]




const postPlants=(req, res) => {
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
}
const getPlants= async (req, res) => {
  const allPlants = await Plant.find().sort({createdAt: -1})
  
  res.json({

      success: true,
      data:plants,
      message:"heyy Tejasvi, plants are fetched successfully"
    });}
  
 const getPlant= (req, res) => {
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
  }

const putPlantById = (req, res) => {
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
  }

const deletePlantById =  (req, res) => {
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
  }

  export { deletePlantById, getPlant, getPlants,postPlants, putPlantById } 
 import Plant from './../models/plant.js'

//  {
//   error due to absence of extension in model.js
//   hence it is mandatory to write model.js
//  }
//  const plants= [
    // {
    //   "id": 1,
    //   "name": "Pink Rose",
    //   "price": 599,
    //   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJaiSYX3_5bI0fHLwfcZU1J3ich5sz2IKO8w&s",
    //   "description": "A beautiful pink rose"
    // },
    // {
    //   "id": 2,
    //   "name": "Red Tulip",
    //   "price": 629,
    //   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlDbJaeAY3x0E3zbtb8fxtcExAj3WV_AEZUQ&s",
    //   "description": "A stunning red tulip"
    // },
    // {
    //   "id": 3,
    //   "name": "White Lily",
    //   "price": 649,
    //   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT87yGDM4uzB09OuHvRsmBaRioQBU0grlifZg&s",
    //   "description": "A pure white lily"
    // },
    // {
    //   "id": 4,
    //   "name": "Yellow Daffodil",
    //   "price": 599,
    //   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW0IKXh9M_bOvASy7tLXq5awnTcaFTMn6QpQ&s",
    //   "description": "A bright yellow daffodil"
    // },
    // {
    //   "id": 5,
    //   "name": "Purple Orchid",
    //   "price": 619,
    //   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlOuWknkyspzsLaQ9nWqFgTpsMLtwxG60rnQ&s",
    //   "description": "An elegant purple orchid"
    // },
    // {
    //   "id": 6,
    //   "name": "Blue Hydrangea",
    //   "price": 579,
    //   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQun_eRgsyqyNMbeVC2BsAPC3qK4pF0l0yPyw&s",
    //   "description": "A charming blue hydrangea"
    // },
    // {
    //   "id": 7,
    //   "name": "Orange Marigold",
    //   "price": 509,
    //   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgh8UQfopVQCnI-9Db2YqH-7ZzA8Mw0j01w&s",
    //   "description": "A vibrant orange marigold"
    // },
    // {
    //   "id": 8,
    //   "name": "Pink Peony",
    //   "price": 689,
    //   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrNWmoM1XHYyKGBoF1mgQTrjtacVS1K5o3YA&s",
    //   "description": "A delicate pink peony"
    // },
    // {
    //   "id": 9,
    //   "name": "White Jasmine",
    //   "price": 559,
    //   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrNWmoM1XHYyKGBoF1mgQTrjtacVS1K5o3YA&s",
    //   "description": "A fragrant white jasmine"
    // },
    // {
    //   "id": 10,
    //   "name": "Red Poppy",
    //   "price": 539,
    //   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ82LHCMkdbSxeIECbZwpnCOcRJLsFqqV-FA&s",
    //   "description": "A vivid red poppy"
    // }
  // ]




const postPlants= async (req, res) => {
  const {
    name,
    image,
    price,
    description,  
  } = req.body
  
    
  
    // const randomId = Math.round(Math.random() * 10000);
  
    const newPlant = new Plant({
      
      name: name,
      price: price,
      image: image,
      description: description,
    });
  
    // plants.push(newPlant);
    const savedPlant = await newPlant.save();
  
    res.status(201).json({
      success: true,
      data: savedPlant,
      message: "New plant added successfully",
    });
}

const getPlants= async (req, res) => {

  const allPlants = await Plant.find().sort({createdAt: -1})
  
  res.json({

      success: true,
      data: allPlants,
      message:"heyy Tejasvi, plants are fetched successfully"
    });}
  
 const getPlant = async (req, res) => {
    const { id } = req.params;
    const plant = await Plant.findById(id)
  
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

const putPlantById = async (req, res) => {
    
    const { name, price, image, description } = req.body;

    const { id } = req.params;

     await Plant.updateOne({ _id: id},{
      $set: {
            name: name,
            price: price,
            description: description,
            image: image,
      }
    })

    const updatePlant = await Plant.findById(id)

    res.json({
      success: true,
      data: updatePlant,
      message: "Plant updated successfully",
    });
  }

const deletePlantById = async (req, res) => {
    const { id } = req.params; 
    
    await Plant.deleteOne({_id: id})

    res.status(200).json({ // Respond with success message
      success: true,
      message: "Plant deleted successfully",
      data:null
    });
  }

  export { deletePlantById, getPlant, getPlants,postPlants, putPlantById } 
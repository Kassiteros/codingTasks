// server.js

// Setup routes here to handle HTTP requests.


// Load environment variables from .env, in this case our MongoDB password !
require('dotenv').config();

// Import the packages that we'll be using
const express = require('express');
const cors = require('cors');

// It appears we need Mongoose here also since it assists in carrying
// out CRUD operations on our MongoDB collection.
const mongoose = require('mongoose');

// Make sure we import the schema for our data that we defined
const { CarModel } = require('./models/schema');


// Import our pre-defined PUT/POST/GET/DEL handler functions from queries.js
// so we can call them here when server.js "receives a request" !
const { updateCarByRegistrationNumber } = require('./controllers/queries');
const { deleteCarByRegistrationNumber } = require('./controllers/queries');
const { addCar } = require('./controllers/queries');
const { updateCars } = require('./controllers/queries');
const { listOldCars } = require('./controllers/queries');


// Create a new express app
const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Ensure HTTP requests and responses can use JSON formats
app.use(express.json());

// Define the route "listener" for the frontend to retrieve messages
app.get('/api/data', (req, res) => {
  const data = { message: 'Hello from the back end!' };
  res.json(data);
});


// Connect to MongoDB "hyperiondev" using Mongoose.

// First get MongoDB password from .env ! Ensure we "npm install dotenv" in backend server
// root i.e where package.json lives !
const mongoDB_Pwd = process.env.T23_MONGODB_KEY;
console.log(`ENV Key: ${mongoDB_Pwd}`);

const URL = `mongodb+srv://Alex516:${mongoDB_Pwd}@hyperiondev.wfborrr.mongodb.net/?retryWrites=true&w=majority&appName=HyperionDev`;
const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "hyperiondev"
};


// We need mongoose to "talk" to the DB in order to apply our "schema"
mongoose.connect(URL, clientOptions)
  .then(() => {
    console.log('Connected to MongoDB successfully.... yeeeeeee haaaaah');
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });


// GET all cars
app.get('/api/cars', async (req, res) => {
  try {
    console.log('Fetching all cars from MongoDB...');
    const cars = await CarModel.find();
    console.log('Cars fetched:', cars);
    res.json(cars);
  } catch (error) {
    // Handle any errors (e.g., database connection error)
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal server error !!' });
  }
});


// POST, add new car
app.post('/api/cars', async (req, res) => {
  try {
    const newCar = await addCar(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({ error: 'Error adding car' });
  }
});


// PUT, update car by registration number
app.put('/api/cars/:registration_number', async (req, res) => {
  try {
    const { registration_number } = req.params;
    const updateData = req.body;
    const updatedCar = await updateCarByRegistrationNumber(registration_number, updateData);
    res.json(updatedCar);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Error updating car' });
  }
});


// PUT, update many cars based on a filter. Use different route to differentiate between
// the two PUT operations described here, update one and update many !!

// PLEASE NOTE: discovered updateMany() not working because of the path definition. It appears
// the 2 PUT operations here in server.js on the same path conflict in some way. For this reason 
// the route has been changed from "/api/cars/update-many" to "/api/updates" to make it unique 
// for the update many operation !
app.put('/api/updates', async (req, res) => {
  try {
    console.log("REQUEST RECEIVED FROM FRONTEND!!!")

    const { filter, updateData } = req.body;
    if (!filter || !updateData) {
      return res.status(400).json({ error: 'Filter and update data are required' });
    }

    console.log(`Received filter: ${JSON.stringify(filter)} and updateData: ${JSON.stringify(updateData)}`);
    const result = await updateCars(filter, updateData);
    res.json(result);

  } catch (error) {
    console.error('Error updating cars:', error);
    res.status(500).json({ error: 'Error updating cars' });
  }
});


// For testing purposes only... bypass my updateCars function defined in queries.js
app.put('/api/cars/update-directly', async (req, res) => {
  try {
    const { filter, updateData } = req.body;
    const result = await CarModel.updateMany(filter, updateData);
    res.json(result);
  } catch (error) {
    console.error('Error updating cars:', error);
    res.status(500).json({ error: 'Error updating cars' });
  }
});


// GET cars older than a specified number of years
app.get('/api/cars/older-than/:years', async (req, res) => {
  const { years } = req.params;
  try {
    console.log(`Fetching cars older than ${years} years`);
    const cars = await listOldCars(years);
    res.json(cars);
  } catch (error) {
    console.error('Error fetching old cars:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// DEL car by registration_number
app.delete('/api/cars', async (req, res) => {
  const { registration_number } = req.query;

  if (!registration_number) {
    return res.status(400).json({ error: 'Registration number is required' });
  }

  try {
    console.log(`Registration number is: ${registration_number}`)
    const car = await deleteCarByRegistrationNumber(registration_number);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Define the port number for the server to "broadcast" on
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});

module.exports = app;
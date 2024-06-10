// schema.js


// Define our DB schema as an "overlay" to our MongoDB collection using Mongoose
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  registration_number: {
    type: String,
    required: true,
  },
  yr_manufacture: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
});

// Mongoose Schema, (carSchema), defines the structure and rules for the car documents in MongoDB.
// Mongoose Model, (CarModel), provides an "interface" to interact with cars collection in the  
// MongoDB database using the defined schema even though officially MongoDB doesn't use schemas ?!

const CarModel = mongoose.model('Car', carSchema);

module.exports = { CarModel };

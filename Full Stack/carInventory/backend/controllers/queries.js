// queries.js

// Pick up the defined schema for our collection i.e. rules of data typing and validation
const { CarModel } = require('../models/schema');


// Add a car to the cars collection
async function addCar(carData) {
  try {
    const car = new CarModel(carData);
    await car.save();
    return car;
  } catch (error) {
    throw error;
  }
}


// Update information about a single car by ID
async function updateCarById(id, updateData) {
  try {
    const car = await CarModel.findByIdAndUpdate(id, updateData, { new: true });
    return car;
  } catch (error) {
    throw error;
  }
}


// Update information about a single car by registration number. Use registration number to "key into" 
// the DB rather than ID which MongoDB generates !
async function updateCarByRegistrationNumber(registration_number, updateData) {
  try {
    const car = await CarModel.findOneAndUpdate({ registration_number }, updateData, { new: true });
    return car;
  } catch (error) {
    throw error;
  }
}


// Update information about more than one car based on a filter showing the field and selected data
// to search on and the value to change it to.
async function updateCars(filter, updateData) {
  try {
    console.log(`Filter: ${JSON.stringify(filter)} and updateData: ${JSON.stringify(updateData)}`)
    console.log(`Updating cars with filter: ${JSON.stringify(filter)} and updateData: ${JSON.stringify(updateData)}`);
    const result = await CarModel.updateMany(filter, updateData);
    console.log(`MongoDB Update Result: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    throw error;
  }
}


// Delete a specific document by Registration Number which always be required on input
// We should really check it is unique on input. Assuming registration is unique !
async function deleteCarByRegistrationNumber(registration_number) {
    try {
      const result = await CarModel.findOneAndDelete({ registration_number });
      return result;
    } catch (error) {
      throw error;
    }
  }


// List all the information for all cars in your database
async function listAllCars() {
  try {
    const cars = await CarModel.find();
    return cars;
  } catch (error) {
    throw error;
  }
}


// List the model, make, registration number, and current owner for all cars older than specified years
async function listOldCars(years) {
  try {
    const comparisonYear = new Date().getFullYear() - years;
    const cars = await CarModel.aggregate([
      {
        $match: {
          yr_manufacture: { $lt: comparisonYear }
        }
      },
      {
        $project: {
          model: 1,
          make: 1,
          registration_number: 1,
          owner: 1,
        }
      }
    ]);
    return cars;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  addCar,
  updateCarById,
  updateCarByRegistrationNumber,
  updateCars,
  deleteCarByRegistrationNumber,
  listAllCars,
  listOldCars
};


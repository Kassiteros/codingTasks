import React, { useState } from 'react';
import axios from 'axios';


// Provide a "standalone" utility on frontend that allows user to update multiple records.
// User will be able to select field to search on, and enter the value to look for and the
// value to change it to if a match is found. Resulting search will be through the whole
// data set, i.e. finding and changing all matches !
function UpdateManyCars({ carData, setCarData }) {

    // Receive state variable (an/or its setter) from parent component App. Changes made to
    // the data it holds will be signalled to all other child components of App and also, this 
    // component will be "aware" of changes made by other child components that use this state var.


    // Declare state variables to hold the inputs, field name to search on, value to
    // look for in that field and value to change it for if a match is found.
    const [selectedField, setSelectedField] = useState('');
    const [matchValue, setMatchValue] = useState('');
    const [newValue, setNewValue] = useState('');


    // Asynchronous function to write possibly multiple updates to the database where we find
    // matching data in the search field in any database record.
    const handleUpdateMany = async (e) => {
        // Don't cause a screen refresh on submit.
        e.preventDefault();
        try {

            // Build the JSON declared parameters to pass to the "put many" operation, in this
            // case something like this:
            //  {
            //      "filter": { "make": "VW" },
            //       "updateData": { "$set": { make: "Volkswagen" }
            //   }
            const filter = { [selectedField]: matchValue };

            const updateData = { $set: { [selectedField]: newValue } };
            console.log(`Passing filter: ${JSON.stringify(filter)} and updateData: ${JSON.stringify(updateData)}`);

            // Send the search/replace parameters we have built to the API on the specific path where we 
            // will expect a backend function that will call the appropriate Mongoose updateMany().

            const response = await axios.put('/api/updates', { filter, updateData });
            console.log("REQUEST SENT FROM FRONTEND!!!")
            console.log(`Filter Data = ${JSON.stringify(filter)}`)
            console.log(`Update Data = ${JSON.stringify(updateData)}`)
            console.log(`Cars updated successfully ! ${JSON.stringify(response)}`);

            // Clear the input fields by resetting the value they contain.
            setSelectedField('');
            setMatchValue('');
            setNewValue('');

            // We need to work harder, calling SetCarData() isn't enough to get a refresh of
            // data displayed by ShowAllCars(). By creating a new object *reference* with the
            // "spread operator", '...', we ensure the reference to the carData state variable
            // in App.js changes. Since showAllCars.js receives a new reference for carData,
            // it triggers a refresh of the displayed data.
            
            const updatedCarData = carData.map((car) => {
                // Check if car matches filter criteria
                if (car[selectedField] === matchValue) {
                // Create a new car object with updated value
                return { ...car, [selectedField]: newValue };
                } else {
                // Return the original car object (unchanged)
                return car;
                }
            });

            // Update state variable to "notify" other components using it of changes so if they are 
            // refresh any displayed carData if they are tracking this state variable !
            setCarData(updatedCarData);

        } catch (error) {
            console.error('Error updating cars:', error);
        }
    };

    return (
        <div className="UpdateManyCars">
            <h2>Update Multiple Records</h2>
            {/* A dropdown list so the user can select the field to search on */}
            <form onSubmit={handleUpdateMany}>
                <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)} required>
                    <option value="" disabled>Select Field</option>
                    <option value="make">Make</option>
                    <option value="model">Model</option>
                    <option value="registration_number">Registration Number</option>
                    <option value="yr_manufacture">Year of Manufacture</option>
                    <option value="color">Color</option>
                    <option value="owner">Owner</option>
                    <option value="address">Address</option>
                </select>
                {/* Input the value to match in the field we are going to search on */}
                <input
                    type="text"
                    placeholder="Where it contains..."
                    value={matchValue}
                    onChange={(e) => setMatchValue(e.target.value)}
                    required
                />
                {/* Enter the value to change the search field value to (if we find a match) */}
                <input
                    type="text"
                    placeholder="Change it to..."
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    required
                />
                <button type="submit">UPDATE</button>
            </form>
            <br></br><br></br>
        </div>
    );
}

export default UpdateManyCars;
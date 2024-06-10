// Remember to import React and Axios 
import React, { useState } from 'react';
import axios from 'axios';


// Allow the user to create a new car object (file) in the underlying database.
function CreateNewCar({ carData, setCarData }) {

    // Receive state variable (an/or its setter) from parent component App. Changes made to
    // the data it holds will be signalled to all other child components of App and also, this 
    // component will be "aware" of changes made by other child components that use this state var.


    // Create all the variables we know from our schema, that we will need for any car object 
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [yr_manufacture, setYrManufacture] = useState('');
    const [registration_number, setRegistrationNumber] = useState('');
    const [color, setColor] = useState('');
    const [owner, setOwner] = useState('');
    const [address, setAddress] = useState('');


    // Handle form submission when the user enters a new car. Update state variable so any child of
    // App knows a change has been made. Build a car object from the inputs and post this to the 
    // backend which will update the database.
    const handleSubmit = async (e) => {
        // Prevent default behavior which is to cause the page to reload.
        e.preventDefault();

        // "Build" a car object (array) to hold the input data in correct format for write to the DB.
        const newCar = {
            make,
            model,
            yr_manufacture,
            registration_number,
            color,
            owner,
            address
        };

        // Post the new car object to the correct path on the backend server where the
        // request will listened for and, on receipt, "forwarded" to the MongoDB database.
        try {
            const response = await axios.post('/api/cars', newCar);
            console.log('Car added successfully:', response.data);
            // Clear the form input fields on submission ready for the next inputs.
            setMake('');
            setModel('');
            setYrManufacture('');
            setRegistrationNumber('');
            setColor('');
            setOwner('');
            setAddress('');
            // Update carData state to include the newly added car and as a useful side-effect 
            // any displayed data linked to this state var in any child component of App, will 
            // be refreshed to show the updated contents of the DB ! 
            setCarData([...carData, response.data]);
        } catch (error) {
            // Log any error message to console.
            console.error('Error adding car:', error);
        }
    };

    return (
        <div>
            <h2>Add new Car to Inventory</h2>
            {/* 
              Display the input fields corresponding to each car object "property". When all fields
              filled in, (all required), on submit, collect event values and pass to handleSubmit to
              populate the car object it has built to receive this data !
            */}
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Year of Manufacture" value={yr_manufacture} onChange={(e) => setYrManufacture(e.target.value)} required />
                <input type="text" placeholder="Registration Number" value={registration_number} onChange={(e) => setRegistrationNumber(e.target.value)} required />
                <input type="text" placeholder="Make" value={make} onChange={(e) => setMake(e.target.value)} required />
                <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
                <input type="text" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} required />
                <input type="text" placeholder="Owner" value={owner} onChange={(e) => setOwner(e.target.value)} required />
                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                <button type="submit">ADD</button>
            </form>
        </div>
    );
}

export default CreateNewCar;
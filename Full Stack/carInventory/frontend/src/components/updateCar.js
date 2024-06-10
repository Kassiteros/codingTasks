import React, { useState } from 'react';
import axios from 'axios';


// Provide an update function to component showAllCars. ShowAllCars displays full database
// inventory of cars and with each offers an update button. This component will be called to
// process the update when it is requested. It is passed the car object that has been selected
// in showAllCars and the vehicle registration, the field used for lookup (the one field we
// cannot therefore change/update).
function UpdateCar({ selectedCar, carData, setCarData, setUpdateButtonClicked }) {

    // Initialize state variables with the passed car details, the car object we will update !
    const [car, setCar] = useState(selectedCar);

    // Asynchronous function to update a car by the registration number, our "key" field.
    const handleUpdate = async (e) => {
        // Default is to refresh the screen on submit. Code will handle data refresh not browser !
        e.preventDefault();
        try {
            // Make a PUT request to update the car data which has been modified by the inputs that
            // handleChange "collected".
            const response = await axios.put(`/api/cars/${car.registration_number}`, car);
            console.log('Car updated successfully:', response.data);

            // Update carData state var with the updated car details. Everywhere it is used we should
            // see the output data refreshed to show the updated car object.
            const updatedCarData = carData.map(c => c.registration_number === car.registration_number ? car : c);
            setCarData(updatedCarData);

            // Hide the update form after successful update
            setUpdateButtonClicked(false);
        } catch (error) {
            console.error('Error updating car:', error);
        }
    };


    // Keep the passed car object updated with the user's inputs.
    const handleChange = (e) => {
        // Get the name and value properties from (e), the event target i.e. input field.
        const { name, value } = e.target;

        // Update the "holding" car object we have created in UpdateCar(), using its setter function,
        // to add the field and value that has just been input, i.e. changed.
        setCar(prevCar => ({ ...prevCar, [name]: value }));
    };

    return (
        <div className="UpdateCar">
            <form onSubmit={handleUpdate}>
                <h4>*PLEASE NOTE: you cannot update vehicle registration !</h4>
                {/* Input fields for car details */}
                <input type="number" placeholder="Yr Manufacture" name="yr_manufacture" value={car.yr_manufacture} onChange={handleChange} required />
                <input type="text" placeholder="Reg no." name="registration_number" value={car.registration_number} onChange={handleChange} required />
                <input type="text" placeholder="Make" name="make" value={car.make} onChange={handleChange} required />
                <input type="text" placeholder="Model" name="model" value={car.model} onChange={handleChange} required />
                <input type="text" placeholder="Colour" name="color" value={car.color} onChange={handleChange} required />
                <input type="text" placeholder="Owner" name="owner" value={car.owner} onChange={handleChange} required />
                <input type="text" placeholder="Address" name="address" value={car.address} onChange={handleChange} required />
                {/* Button to submit the update. The on submit defined not on button but on the form */}
                <button type="submit">UPDATE</button>
            </form>
        </div>
    );
}

export default UpdateCar;
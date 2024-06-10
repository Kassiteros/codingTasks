// Remember to import React and Axios 
import React from 'react';
import axios from 'axios';


// Provide a delete function to showAllCars. ShowAllCars displays full database inventory
// of cars and with each offers a delete button. This component will be called to process
// the delete when it is requested. Vehicle registration is the unique field for lookup.
function DeleteCar({ registration_number, carData, setCarData }) {

    // Receive state variable (an/or its setter) from parent component App. Changes made to
    // the data it holds will be signalled to all other child components of App and also, this 
    // component will be "aware" of changes made by other child components that use this state var.
    
    // We also need registration_number which is passed as the "key" to identify the file to delete.

    // Function to delete a car by the passed prop, registration number.
    const handleDelete = async () => {
        try {
            const response = await axios.delete('/api/cars', {
                params: { registration_number }
            });
            console.log('Car deleted successfully:', response.data);
            // Update the state var carData by removing the car with the specified registration_number.
            setCarData(carData.filter(car => car.registration_number !== registration_number));
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    return (
        <button className="button button-delete" onClick={handleDelete}>Delete</button>
    );
}

export default DeleteCar;
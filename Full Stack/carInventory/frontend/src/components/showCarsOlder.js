// Remember to import React and Axios 
import React, { useState, useEffect } from 'react';
import axios from 'axios';


// Show the user all the car objects/files stored in the database which have a year of
// manufacture, yr_manufacture in our schema, greater than 'olderThan' years from the current date.
function ShowCarsOlder({ carData }) {

    // We need a variable (boolean) to be able to show button clicked status. We can test
    // this later, and if true we will display car data, otherwise hide it. Initialize false.
    const [buttonClicked, setButtonClicked] = useState(false);

    // Set variable for our older than comparisons so we can change it. In this case we want to display
    // vehicles older than 5 years. We will compare yr_manufacture against current year.
    const olderThan = 5;

    // Set state var to hold the fetched older cars
    const [olderCars, setOlderCars] = useState([]);

    // Effect to refetch data whenever carData changes so we get a refresh of data for all
    // components which display whenever there is an update or delete from any component !
    useEffect(() => {
        if (buttonClicked) {
            fetchOlderCars();
        }
    }, [buttonClicked, carData]);

    // Function to fetch cars older than a specified number of years
    const fetchOlderCars = async () => {
        try {
            const response = await axios.get(`/api/cars/older-than/${olderThan}`);
            setOlderCars(response.data);
        } catch (error) {
            console.error('Error fetching older cars:', error);
        }
    };

    // Displays fetched data to the user as a list of objects 
    return (
        <div className="ShowCarsOlder">
            <header className="ShowCarsOlder-header">
                <h2>Cars older than {olderThan} years</h2>
                <button onClick={() => setButtonClicked(!buttonClicked)}>
                    {buttonClicked ? 'HIDE' : 'SHOW'}
                </button>
                {buttonClicked && (
                    // Check if buttonClicked is true, in which case display cars older than specified 
                    // age 'olderThan'. If buttonClicked is false, show nothing i.e. hide the data.
                    olderCars.length > 0 ? (
                        <ul>
                            {olderCars.map((car, index) => (
                                <li key={index}>
                                    Reg: {car.registration_number} &nbsp;&nbsp;
                                    Make: {car.make} &nbsp;&nbsp;
                                    Model: {car.model} &nbsp;&nbsp;
                                    Owner: {car.owner} &nbsp;&nbsp;
                                </li>
                            ))}
                        </ul>
                    ) : (
                        // No cars in carData, hopefully we're just waiting for a bit ! 
                        <p>No cars older than {olderThan} years.</p>
                    )
                )}
            </header>
        </div>
    );
}

export default ShowCarsOlder;

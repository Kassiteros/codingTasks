import React, { useState } from 'react';
import DeleteCar from './deleteCar';
import UpdateCar from './updateCar';

import '../App.css';

// Show the user all the car objects/files stored in the database. Also, the displayed objects
// will show a delete button which the user can click to delete that specific file and also an
// update button to alter any of the data in any fields for that car object. We don't do a
// fetch here, we pick up carData fetched in App parent component and passed as prop ! 
function ShowAllCars({ carData, setCarData }) {

    // Receive state variable (and/or its setter) from parent component App. Changes made to
    // the data it holds will be signalled to all other child components of App and also, this 
    // component will be "aware" of changes made by other child components that use this state var.

    // Create state variables to keep track of DELETE button clicks.
    const [buttonClicked, setButtonClicked] = useState(false);

    // Create state variables to keep track of the UPDATE button clicks.
    const [updateButtonClicked, setUpdateButtonClicked] = useState(false);

    // State var to store the selected car for updating
    const [selectedCar, setSelectedCar] = useState(null);


    // Displays fetched data to the user in a list. Give the user the option to delete or update an 
    // individual file, "car".
    return (
        <div className="App">
            <header className="App-header">
                <h2>Full Car Inventory</h2>
                <button onClick={() => setButtonClicked(!buttonClicked)}>
                    {buttonClicked ? 'HIDE' : 'SHOW'}
                </button>
                {buttonClicked && (
                // Check if buttonClicked is true, in which case display all database files. If 
                // buttonClicked is false, show nothing i.e. hide car data.
                carData.length > 0 ? (
                        <ul>
                            {carData.map((car, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    Year: {car.yr_manufacture} &nbsp;&nbsp;
                                    Reg: {car.registration_number} &nbsp;&nbsp;
                                    Make: {car.make} &nbsp;&nbsp;
                                    Model: {car.model} &nbsp;&nbsp;
                                    Color: {car.color} &nbsp;&nbsp;
                                    Owner: {car.owner} &nbsp;&nbsp;
                                    Address: {car.address}

                                    <DeleteCar registration_number={car.registration_number} carData={carData} setCarData={setCarData} />
                                    <button className="button" onClick={() => { setSelectedCar(car); setUpdateButtonClicked(true); }}>Update</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )
                )}
                {/* 
                    We have stored the details of the car we want to update in setSelectedCar(), now pass this to
                    the component which will handle the update. It will display a row of input fields for each 
                    defined field allowing it to be changed.
                */}
                {updateButtonClicked && selectedCar && (
                    <UpdateCar 
                        selectedCar={selectedCar} 
                        carData={carData} 
                        setCarData={setCarData} 
                        setUpdateButtonClicked={setUpdateButtonClicked} 
                    />
                )}
            </header>
        </div>
    );
}

export default ShowAllCars;
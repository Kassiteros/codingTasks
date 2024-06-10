// Remember to import React and Axios 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import our child components
import CreateNewCar from './components/createNewCar';
import ShowAllCars from './components/showAllCars';
import ShowCarsOlder from './components/showCarsOlder';
import UpdateManyCars from './components/updateManyCars';



function App() {

    // Create state variables to store fetched MongoDB data, an array of multiple "car" objects !
    // "Hoist" this variable here in the parent component and pass it to any child so that if
    // they update carData with GET, PUT, POST, DEL etc.. a refresh will automatically be triggered
    // of any data displayed by other child components of App !
    const [carData, setCarData] = useState([]);


    // Create state var to store fetched "message" data from the backend. Initialize it to empty string.
    const [, setMessage] = useState('');


    // Ensure that fetchData and fetchMessage functions are called when the App component is first
    // loaded. UseEffect is "terminated" by an empty array so it is triggered once only on loading.
    useEffect(() => {
        fetchMessage();
        fetchData();
    }, []);


    // Asynchronous function which fetches the message from the backend via axios.
    // Display to console so we always know backend and frontend are "talking".
    const fetchMessage = async () => {
        try {
            const response = await axios.get('/api/data');
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error fetching message:', error);
        }
    };


    // Asynchronous function which fetches car data, an array of objects, from the backend
    // backend via Axios. This happens in the background,(async), and stores the data in
    // state variable carData.
    const fetchData = async () => {
        try {
            // Fetch data from /api/cars !
            const response = await axios.get('/api/cars'); 
            // Use associated setter to store returned data
            setCarData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    // Call child components as we now have access to the data they need via our MongoDB
    // database. We will ensure ShowCarsOlder() does it's own selected GET rather than
    // filtering carData passed to it (which might have bee easier ;-) !
    return (
        <div className="App">
            <header className="App-header">

                {/* Display the message from the backend. Keep for debugging
                <h1>{message || 'Loading...'}</h1>
                */}

            </header>
            
            {/* Call "CRUD" child components to create, read, update and delete database files */}
            <ShowAllCars carData={carData} setCarData={setCarData} />
            <ShowCarsOlder carData={carData} />
            <CreateNewCar carData={carData} setCarData={setCarData} />
            <UpdateManyCars carData={carData} setCarData={setCarData} />
        </div>
    );
}

export default App;
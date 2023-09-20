// SubpageTwo.js
// import React from 'react';

// function SubpageLoaded() {
//     return <h1>This is Subpage for Loading</h1>;
// }





import React, { useState, useContext } from 'react';
import axios from 'axios';

// Assuming you have the AuthContext in some external module and importing it.
import { AuthContext } from '../App'; 

function SubpageLoaded() {
    // State values for each input
    const [city, setCity] = useState("");
    const [delayAmount, setDelayAmount] = useState("");
    const [delayReason, setDelayReason] = useState("");

    // Access the auth context
    const auth = useContext(AuthContext);

    const handleSubmit = async () => {
        // Current time
        const currentTime = new Date().toISOString();

        const delayData = {
            city: "i have loaded the truck",
            // delayAmount: delayAmount,
            // delayReason: delayReason,
            routeDirection: auth.routeDirection,  // Add routeDirection to the data
            submittedTime: currentTime            // Add current time to the data
        };
        
        try {
            await axios.post('https://1941.methinks.pl/store.php', delayData);
            alert("You have loaded your trukc!");
        } catch (error) {
            alert("Error saving data!");
            console.error("Error:", error);
        }
    };

    return (
        <div>
             <div>Confirm the loading?</div>
            {/* City Name Input */}
            <div style={{display:'none'}}>
                <label htmlFor="city">City:</label><br />
                <input 
                    type="text" 
                    id="city"
                    value={city} 
                    placeholder="Enter City Name" 
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>

            {/* Number Input for Delay Amount */}
            {/* <div>
                <label htmlFor="delayAmount">Delay Amount (minutes):</label><br />
                <input 
                    type="number" 
                    id="delayAmount"
                    value={delayAmount} 
                    placeholder="Enter Delay Amount" 
                    onChange={(e) => setDelayAmount(e.target.value)}
                />
            </div> */}

            {/* Textarea for Delay Reason */}
            {/* <div>
                <label htmlFor="delayReason">Delay Reason:</label><br />
                <textarea
                    id="delayReason"
                    value={delayReason}
                    placeholder="Enter Delay Reason"
                    onChange={(e) => setDelayReason(e.target.value)}
                ></textarea>
            </div> */}

            {/* Button to submit the data */}
            <button onClick={handleSubmit}>Submit</button>
           
        </div>
    );
}
export default SubpageLoaded;
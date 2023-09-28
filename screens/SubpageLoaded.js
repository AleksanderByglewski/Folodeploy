import HelloUser from '../components/HelloUser';
import Message from '../components/Message';
import CustomButton from '../components/CustomButton';
import Colors from '../assets/css/globalStyles';

import React, { useState, useContext } from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';

// Assuming you have the AuthContext in some external module and importing it.
import { useAuth } from '../AuthContext';

function SubpageLoaded() {
    // State values for each input
    const [city, setCity] = useState("");
    const [delayAmount, setDelayAmount] = useState("");
    const [delayReason, setDelayReason] = useState("");

    // Access the auth context
    //const auth = useContext(useAuth);
    const auth = useAuth();
    //debugger

    const YourComponent = ({ city, setCity }) => {
        // const [city, setCity] = useState(''); // define state for city

        const handleSubmit = async () => {
       
            const currentTime = new Date().toISOString();
            const delayData = {
                city: "i have loaded the truck",
                routeDirection: auth.routeDirection,
                submittedTime: currentTime
            };

            try {
                await axios.post('https://1941.methinks.pl/store.php', delayData);
                alert("You have loaded your truck!");
            } catch (error) {
                alert("Error saving data!");
                console.error("Error:", error);
            }
        };

        return (
            <View>
                {/* City Name Input */}
                {/* <View style={{height: 0, width: 0}}>
              <Text>City:</Text>
              <TextInput 
                value={city} 
                placeholder="Enter City Name" 
                onChangeText={(value) => setCity(value)}
              />
            </View> */}

                <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                    <Text style={styles.buttonText}>OK</Text>

                </TouchableOpacity>
            </View>
        );
    };




    return (
        <>
            <HelloUser></HelloUser>
            <Message></Message>
            <YourComponent city={city} setCity={setCity} />

        </>
    );
}


const styles = StyleSheet.create({


    button: {
        width: '96%',
        margin: 8,
        padding: 8,
        borderRadius: 4,
        backgroundColor: Colors.accentColor, // choose a color for your button
    },
    buttonText: {
        color: '#fff', // choose a color for your text

        textAlign: 'center',
    },


});

export default SubpageLoaded;
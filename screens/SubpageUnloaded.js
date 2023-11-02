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
import I18n from '../translations'

function SubpageLoaded({navigation}) {
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
        const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state to manage button's disabled state
        const handleSubmit = async () => {
            setIsButtonDisabled(true); // Disable the button once clicked
            const currentTime = new Date().toISOString();


            const delayData = {
                driverId:auth.driverId,
                userId:auth.userId,
                message: "i have unloaded the truck",
                routeDirection: auth.routeDirection,
                submittedTime: currentTime
            };


            let url='https://1941.methinks.pl/store.php'
            // url='http://localhost:4000/backend/mobile/store.php'
            url='https://1944.methinks.pl/backend/mobile/store.php'
            try {
                await axios.post(url, delayData);
                alert("You have unloaded your truck!");
                const newStatus = 'unloaded';  // Set your new status value here
                const statusUrl = 'https://folotruck.com/backend/mobile/set-status.php'; // URL to the set-status.php

                    const statusData = {
                        userRole: auth.userRole,
                        driverId: auth.driverId,
                        userId: auth.userId,
                        status: newStatus
                    };

                    const response = await axios.post(statusUrl, statusData);

                    if (response.data.success) {
                        // alert('Status updated successfully!');
                    } else {
                        throw new Error('Failed to update status');
                    }
               

            } catch (error) {
                alert("Error saving data!");
                console.error("Error:", error);
            }
            navigation.navigate('Home')
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

                <TouchableOpacity style={styles.buttonRedo} onPress={handleSubmit}
                disabled={isButtonDisabled}  // Disable the button based on the state
                >
                    
                    <Text style={styles.buttonText}>OK</Text>

                </TouchableOpacity>
            </View>
        );
    };




    return (
        <>
            <HelloUser></HelloUser>
            


            <View style={styles.grid}>
    
                <View style={styles.container}>
                <Text style={styles.labelRedo}>{I18n.t('confirmUnloading')}</Text>
                </View>
                <YourComponent city={city} setCity={setCity} />
            </View>

        

        </>
    );
}


const styles = StyleSheet.create({
    labelRedo:{
        textAlign:"center",
        fontSize:24,
    
    },
    buttonRedo: {
        
        width: '30%',
        margin: 8,
        paddingTop:4,
        paddingBottom:4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 4,
        marginLeft:"auto",
        marginRight:"auto",
        backgroundColor: Colors.accentColor, // choose a color for your button
    },
    container: {
        width:"70%",
        alignSelf:"center",
        borderColor: '#ececec',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: "white",
        margin: 4,
        marginTop:0,
        paddingTop:8,
        paddingBottom:8
        
      },
    grid: {
   
  
        marginTop: "auto",
        marginBottom: "auto",
        width:"100%",
    
       
        // borderColor: '#cf1818',
        // borderWidth: 1,
        // borderRadius: 4,
      },


    button: {
        width: '96%',
        margin: 8,
        padding: 8,
        borderRadius: 4,
        backgroundColor: Colors.accentColor, // choose a color for your button
    },
    buttonText: {
        color: '#fff', // choose a color for your text
        fontSize:18,
        textAlign: 'center',
    },


});

export default SubpageLoaded;
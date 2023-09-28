import HelloUser from '../components/HelloUser';
import Message from '../components/Message';
import CustomButton from '../components/CustomButton';
import Colors from '../assets/css/globalStyles';

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuth } from '../AuthContext';

function SubpageDelay() {
    const [city, setCity] = useState("");
    const [delayAmount, setDelayAmount] = useState("");
    const [message, setMessage] = useState("");
    const auth = useAuth();

    const handleSubmit = async () => {
        const currentTime = new Date().toISOString();
        const delayData = {
            city,
            delayAmount,
            message,
            routeDirection: auth.routeDirection,
            submittedTime: currentTime
        };

        try {
            await axios.post('https://1941.methinks.pl/store.php', delayData);
            alert("Data submitted!");
        } catch (error) {
            alert("Error saving data!");
            console.error("Error:", error);
        }
    };

    return (
        <>
            <HelloUser></HelloUser>
            <Message title="Delay Screen"></Message>

            <View style={styles.container}>
                <Text style={styles.label}>City:</Text>
                <TextInput style={styles.input}
                    placeholderTextColor="#808080"
                    value={city} 
                    placeholder="Enter City" 
                    onChangeText={(value) => setCity(value)}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>Delay Amount:</Text>
                <TextInput style={styles.input}
                    placeholderTextColor="#808080"
                    value={delayAmount} 
                    placeholder="Enter Delay Amount" 
                    onChangeText={(value) => setDelayAmount(value)}
                    keyboardType="numeric"
                />
            </View>
  
            <View style={styles.container}>
                <Text style={styles.label}>Message:</Text>
                <TextInput 
                    placeholderTextColor="#808080"
                    style={styles.input}
                    value={message} 
                    placeholder="Enter Your Message" 
                    onChangeText={(value) => setMessage(value)}
                    multiline
                    numberOfLines={4}
                    
                />
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                    <Text style={styles.buttonText}>Send message</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '96%',
        margin: 8,
        padding: 8,
        borderRadius: 4,
        backgroundColor: Colors.accentColor,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    label:{
        marginLeft:5,
        marginRight:5,
        paddingLeft:5,
        paddingRight:5,
        paddingBottom:10,
        marginBottom:10,
        borderBottomColor:"#e4e4e4",
        borderBottomWidth:1,
        
    },
    input:{

        paddingLeft:5,
        padding:5,
        marginLeft:5,
        marginRight:5,
      
    },
    container: {
   
        borderColor: '#ececec',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: "white",
        margin: 4,
        marginTop:0,
        paddingTop:8,
        paddingBottom:8
        
      },
});

export default SubpageDelay;
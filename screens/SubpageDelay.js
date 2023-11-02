import HelloUser from '../components/HelloUser';
import Message from '../components/Message';
import CustomButton from '../components/CustomButton';
import Colors from '../assets/css/globalStyles';

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import I18n from '../translations'

// console.log(I18n.t('location'));


function SubpageDelay({navigation}) {
    const [city, setCity] = useState("");
    const [delayAmount, setDelayAmount] = useState("");
    const [message, setMessage] = useState("");
    const auth = useAuth();

    const handleSubmit = async () => {
        const currentTime = new Date().toISOString();
        const delayData = {
            driverId:auth.driverId,
            userId:auth.userId,
            city,
            delayAmount,
            message:"I have a delay",
            messageValue:"City: "+city+"<br>"+"Time: " +delayAmount+"<br>Message: "+message,
            routeDirection: auth.routeDirection,
            submittedTime: currentTime
        };
        console.log(delayData)

        let url='https://1941.methinks.pl/store.php'
         //url='http://localhost:4000/backend/mobile/store.php'
        url='https://folotruck.com/backend/mobile/store.php'
        try {
            await axios.post(url, delayData);
            alert("Thank you for your input!");
        } catch (error) {
            alert("Error saving data!");
            console.error("Error:", error);
        }
        navigation.navigate('Home')
    };

    return (
        <>
        <HelloUser></HelloUser>
        {/* <Message title="Delay Screen"></Message> */}

        <View style={styles.container}>
            <Text style={styles.label}>{I18n.t('location')}</Text>
            <TextInput style={styles.input}
                placeholderTextColor="#808080"
                value={city} 
                placeholder={I18n.t('location')}
                onChangeText={(value) => setCity(value)}
            />
        </View>
        <View style={styles.container}>
            <Text style={styles.label}>{I18n.t('delayTime')}</Text>
            <TextInput style={styles.input}
                placeholderTextColor="#808080"
                value={delayAmount} 
                placeholder={I18n.t('enterTime')} 
                onChangeText={(value) => setDelayAmount(value)}
                keyboardType="numeric"
            />
        </View>

        <View style={styles.container}>
            <Text style={styles.label}>{I18n.t('reason')}</Text>
            <TextInput 
                placeholderTextColor="#808080"
                style={styles.input}
                value={message} 
                placeholder={I18n.t('enterYourMessage')} 
                onChangeText={(value) => setMessage(value)}
                multiline
                numberOfLines={4}
                
            />
        </View>
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                <Text style={styles.buttonText}>{I18n.t('sendMessage')}</Text>
            </TouchableOpacity>
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '96%',
        margin: 8,
        marginLeft:'2%',
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
        // marginRight:5,
        paddingLeft:5,
        paddingRight:5,
        // paddingBottom:10,
        // marginBottom:10,
        // borderBottomColor:"#e4e4e4",
        //borderBottomWidth:1,
        
    },
    input:{
        flex:1,
         paddingLeft:5,
        
        marginLeft:5,
        marginRight:5,
      
    },
    container: {
        flexDirection:'column',
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
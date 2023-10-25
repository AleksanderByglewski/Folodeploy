import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../AuthContext';  // Import useAuth
import { useNavigation } from '@react-navigation/native';


import { ImageBackground, TouchableOpacity, Text,Image } from 'react-native';
import { Dimensions } from 'react-native';
import axios from "axios"

import Colors from '../assets/css/globalStyles';
import I18n from '../translations'

const SubpageLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();  // Access the auth context
  const navigation = useNavigation();  // Access navigation
  const handleLogin = async () => {
    try {
      //debugger
        //  const response = await axios.post('http://localhost:4000/backend/mobile/cred.php', { username, password });
         const response = await axios.post('https://1944.methinks.pl/backend/mobile/cred.php', { username, password });
        // const response = await axios.post('https://1941.1944.methinks.pl/backend/mobile/cred.php', { username, password });
        const userData = response.data;
        console.log(userData)
        if (userData.data=="success") {
            auth.setIsAuthenticated(true);
            // auth.setUserRole("Success");
            // auth.setRouteDirection("Success");
            auth.setUserRole(userData.username); // Set username
            auth.setRouteDirection(userData.total_destination); // Set total_destination
            auth.setDriverId(userData.driver_id); // Set driver_id
            auth.setUserId(userData.user_id); // Set user_id

            navigation.navigate('Home');
        } else {
            console.error('Invalid credentials');
        }
    } catch (error) {
        console.error('There was an error!', error);
    }
};

  return (

<ImageBackground source={require('../assets/img/background.jpg')} style={styles.containerBg}>
    <View style={styles.container}>
    <Image
    source={require('../assets/img/logo.png')}
    style={styles.logo}
    resizeMode="contain"
  
  />
      
      <TextInput
        autoCorrect={false}  
        autoCapitalize="none" 
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder={I18n.t('PhoneLogin')}
      />
      <TextInput
        autoCorrect={false}  
        autoCapitalize="none"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder={I18n.t('TruckPlatesLogin')}
        // secureTextEntry // To hide the password text
      />
     
     <TouchableOpacity style={styles.button} onPress={handleLogin}>
  <Text style={styles.buttonText}>Login</Text>
  
</TouchableOpacity>
   
    </View>
</ImageBackground>
  );
};


// Use it in styles

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

  logo: {
    width: "60%",
    height: undefined, 
    aspectRatio: 3.209,
    marginBottom:16,
  },

    containerBg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
       
        
      },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width:windowWidth < 768 ? 0.9*windowWidth : "",
    minWidth: windowWidth < 768 ? 0.9*windowWidth : "",
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    
  },
  button: {
    width: '100%',
    padding:12,
    borderRadius:4,
    backgroundColor: Colors.accentColor, // choose a color for your button
  },
  buttonText: {
    color: '#fff', // choose a color for your text

    textAlign: 'center',
  },


});

export default SubpageLogin;
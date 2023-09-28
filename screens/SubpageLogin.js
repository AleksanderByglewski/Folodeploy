import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../AuthContext';  // Import useAuth
import { useNavigation } from '@react-navigation/native';


import { ImageBackground, TouchableOpacity, Text,Image } from 'react-native';
import { Dimensions } from 'react-native';


import Colors from '../assets/css/globalStyles';

const SubpageLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();  // Access the auth context
  const navigation = useNavigation();  // Access navigation
  const handleLogin = () => {
    // Your login logic here

    console.log(username)
    console.log(password)
    if (username === '' && password === '') {
        auth.setIsAuthenticated(true);
        auth.setUserRole('admin');
        auth.setRouteDirection('Warsaw-Berlin-Paris');
        navigation.navigate('Home');
  
      }

    if (username === 'admin' && password === 'admin') {
      auth.setIsAuthenticated(true);
      auth.setUserRole('admin');
      auth.setRouteDirection('Warsaw-Berlin-Paris');
      navigation.navigate('Home');

    } else if (username === '600700800' && password === 'ZX20') {
      auth.setIsAuthenticated(true);
      auth.setUserRole('admin');
      auth.setRouteDirection('Zilina-Tychy');
      navigation.navigate('Home');

    } else if (username === '600600600' && password === '600') {
      auth.setIsAuthenticated(true);
      auth.setUserRole('admin');
      auth.setRouteDirection('Darmstadt-Milan-Canaveral');
      navigation.navigate('Home');
    }
    else if (username === '600600600' && password === '600') {
      auth.setIsAuthenticated(true);
      auth.setUserRole('admin');
      auth.setRouteDirection('Darmstadt-Milan-Canaveral');
      navigation.navigate('Home');
    }

    else if (username === '666666666' && password === '1234') {
      auth.setIsAuthenticated(true);
      auth.setUserRole('admin');
      auth.setRouteDirection('Barcelona-Paris');
      navigation.navigate('Home');
    }

    else if (username === 'super' && password === 'super') {  // Example superuser credentials
      auth.setIsAuthenticated(true);
      auth.setUserRole('superuser');  // Setting the user role to superuser
      navigate('/superuserpage');  // Redirecting to the superuser page
    }

    console.log(`Logging in with username: ${username} and password: ${password}`);
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
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry // To hide the password text
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
    width: "50%",
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
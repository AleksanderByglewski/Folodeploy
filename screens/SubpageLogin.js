import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../AuthContext';  // Import useAuth
import { useNavigation } from '@react-navigation/native';


import { ImageBackground, TouchableOpacity, Text,Image, Alert } from 'react-native';

import axios from "axios"

import Colors from '../assets/css/globalStyles';
import I18n from '../translations'

const SubpageLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();  // Access the auth context
  const navigation = useNavigation();  // Access navigation

  const handleLogin = async () => {
        // Alert.alert('Handle login');
        // Alert.alert('Login ',username) ;
        // Alert.alert('Password ',password)
      //debugger
        //  const response = await axios.post('http://localhost:4000/backend/mobile/cred.php', { username, password });

      //   const userData = {
      //     data: "success",
      //     username: "JohnDoe",
      //     total_destination: "MainStreet",
      //     driver_id: "D12345",
      //     user_id: "U98765"
      // };

          const response = await axios.post('https://folotruck.com/backend/mobile/cred.php', { username, password });
        // // const response = await axios.post('https://1941.1944.methinks.pl/backend/mobile/cred.php', { username, password });
         const userData = response.data;
        // Alert.alert('Response received');
  
        if (userData.data=="success") {
            // Alert.alert('Inside Repsonse');
            auth.setIsAuthenticated(true);
            // auth.setUserRole("Success");
            // auth.setRouteDirection("Success");
            auth.setUserRole(userData.username); // Set username
            auth.setRouteDirection(userData.total_destination); // Set total_destination
            auth.setDriverId(userData.driver_id); // Set driver_id
            auth.setUserId(userData.user_id); // Set user_id
            //Alert.alert('Trying to navigate');
            navigation.navigate('Home');
            //Alert.alert('Navigation success');
        } else {
          //Alert.alert('Incorect password or login');
        }
   
};


const handleLogin1 = () => {
  //Alert.alert("Login1 clicked from inside standard function!");
};

const handleLogin2 =  async () => {
  const innerFunction = () => {
      //Alert.alert("Login2 clicked from inside async function!");
  };
  innerFunction();
};

const handleLogin3 = async () => {
  const innerAsyncFunction = async () => {
      // Simulating some async operation, e.g., fetching data or waiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      //Alert.alert("Login3 clicked from inside async function!");
  };
  await innerAsyncFunction();
};

const handleLogin4 = () => {
  navigation.navigate('Home');
};

const handleLogin5 = () => {
  navigation.navigate('Login'); // Assuming 'SubpageLogin' is the name of the route for this page.
};
const handleLogin6 = () => {
  navigation.navigate('Build'); // Assuming 'SubpageLogin' is the name of the route for this page.
};

const handleLogin7 = async () => {
  try {
      // const response = await axios.get('https://httpbin.org/get'); // Replace with your API endpoint
      const response = await axios.post('https://folotruck.com/backend/mobile/cred.php', { "username":"9", "password":"9" });
      Alert.alert("Data fetched:", JSON.stringify(response.data));
  } catch (error) {
      Alert.alert("Error fetching data:", error.message);
  }
};

const handleLogin8 = () => {
  navigation.navigate('Loaded'); // Assuming 'SubpageLogin' is the name of the route for this page.
};

const handleLogin9 = () => {
  navigation.navigate('Unloaded'); // Assuming 'SubpageLogin' is the name of the route for this page.
};

const handleLogin10 = () => {
  navigation.navigate('Upload CMR'); // Assuming 'SubpageLogin' is the name of the route for this page.
};
const handleLogin11 = () => {
  navigation.navigate('Delayed'); // Assuming 'SubpageLogin' is the name of the route for this page.
};

const handleLogin12 = () => {
  navigation.navigate('Build'); // Assuming 'SubpageLogin' is the name of the route for this page.
};
const handleLogin13 = () => {
  navigation.navigate('Build2'); // Assuming 'SubpageLogin' is the name of the route for this page.
};
const handleLogin14 = () => {
  navigation.navigate('Build3'); // Assuming 'SubpageLogin' is the name of the route for this page.
};
const handleLogin15 = () => {
  navigation.navigate('Build4'); // Assuming 'SubpageLogin' is the name of the route for this page.
};

const handleLogin16 = () => {
  navigation.navigate('Build5'); // Assuming 'SubpageLogin' is the name of the route for this page.
};
const handleLogin17 = () => {
  navigation.navigate('Loaded2'); // Assuming 'SubpageLogin' is the name of the route for this page.
};

const handleLogin18 = () => {
  navigation.navigate('Build6'); // Assuming 'SubpageLogin' is the name of the route for this page.
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
     <View>
    {/* <Button title="Again" onPress={handleLogin17}></Button > */}

      {/* <Button title="Loaded" onPress={handleLogin8} />
      <Button title="Unloaded" onPress={handleLogin9} /> */}
      {/* <Button title="Upload" onPress={handleLogin10} /> */}
      {/* <Button title="Delay" onPress={handleLogin11} /> */}
      {/* <Button title="Build1" onPress={handleLogin12} />
      <Button title="Build2" onPress={handleLogin13} />
      <Button title="Build3" onPress={handleLogin14} />
      <Button title="Build4" onPress={handleLogin15} />
      <Button title="Build5" onPress={handleLogin16} />
      <Button title="Build6" onPress={handleLogin18} /> */}
            {/* <Button title="Login1" onPress={handleLogin1} />
            <Button title="Login2" onPress={handleLogin2} />
            <Button title="Login3" onPress={handleLogin3} />
            <Button title="Login4" onPress={handleLogin4} />
            <Button title="Login5" onPress={handleLogin5} />
            <Button title="Login6" onPress={handleLogin6} />
            <Button title="Login7" onPress={handleLogin7} /> */}
          </View>
  <Text style={styles.buttonText}>Login</Text>
  
</TouchableOpacity>
   
    </View>
</ImageBackground>
  );
};


// Use it in styles

//const windowWidth = Dimensions.get('window').width;

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
    width:"90%",
    minWidth:"90%"
    // width:windowWidth < 768 ? 0.9*windowWidth : "",
    // minWidth: windowWidth < 768 ? 0.9*windowWidth : "",
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
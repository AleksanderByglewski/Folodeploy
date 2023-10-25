
import React, { useState, useContext, createContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './AuthContext';
import {  Text, View, Button } from 'react-native';
import { enableScreens } from 'react-native-screens';
const Stack = createStackNavigator();
import axios from 'axios'
import SubpageLogin from './screens/SubpageLogin';
import SubpageBuild from './screens/SubpageBuild';

function HomeScreen({ navigation }) {
 return( <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen Line 1</Text>
    <Text>Home Screen Line 2</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
  </View>)
};

const DetailsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen Line 1</Text>
    <Text>Details Screen Line 2</Text>
  </View>
);
enableScreens();
export default function App() {
  return (

      <AuthProvider>

        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={SubpageLogin} />
          {/* <Stack.Screen name="Details" component={SubpageLoaded} />
           
          
            <Stack.Screen name="Loaded" component={SubpageLoaded} />
            <Stack.Screen name="Unloaded" component={SubpageUnloaded} />
            <Stack.Screen name="Upload CMR" component={SubpageUpload} />
            <Stack.Screen name="Delayed" component={SubpageDelay} />
            <Stack.Screen name="Build" component={SubpageBuild} />
           Stack.Screen name="Loaded" component={SubpageLoaded} />
            <Stack.Screen name="Unloaded" component={SubpageUnloaded} />
            <Stack.Screen name="Upload CMR" component={SubpageUpload} />
            <Stack.Screen name="Delayed" component={SubpageDelay} />
          
            <Stack.Screen name="SuperUserPage" component={SuperUserPage} /> */}
          </Stack.Navigator>
        </NavigationContainer>

      </AuthProvider>
   
  );
}



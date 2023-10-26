
import React, { useState, useContext, createContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './AuthContext';
import {  Text, View, Button } from 'react-native';
import { enableScreens } from 'react-native-screens';
const Stack = createStackNavigator();
import axios from 'axios'


import SubpageLogin from './screens/SubpageLogin';
import SubpageMain from './screens/SubpageMain';
import SubpageDelay from './screens/SubpageDelay';
import SubpageLoaded from './screens/SubpageLoaded';
import SubpageUnloaded from './screens/SubpageUnloaded';
import SubpageUpload from './screens/SubpageUpload';
import SubpageBuild from './screens/SubpageBuild';

enableScreens();
export default function App() {
  return (

      <AuthProvider>

        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={SubpageMain} />
            <Stack.Screen name="Login" component={SubpageLogin} />
            <Stack.Screen name="Loaded" component={SubpageLoaded} />
            <Stack.Screen name="Unloaded" component={SubpageUnloaded} />
            <Stack.Screen name="Upload CMR" component={SubpageUpload} />
            <Stack.Screen name="Delayed" component={SubpageDelay} />
            <Stack.Screen name="Build" component={SubpageBuild} />
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



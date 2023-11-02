// SubpageTwo.js
import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,  TouchableOpacity, Image, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import HelloUser from '../components/HelloUser';

import { useAuth } from '../AuthContext';  
import axios from 'axios';



import LOADED from '../assets/img/loaded.png';
import UNLOADED from '../assets/img/unloaded.png';
import UPLOAD from '../assets/img/upload.png';
import DELAY from '../assets/img/delay.png';
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import I18n from '../translations'

//Alert.alert('Home Page render');
function SubpageMain({ navigation }) {
  const auth = useAuth();  // Access the auth context
  const [status, setStatus] = useState([]);
  




  return (
    <>
    <View style={styles.container}>
        <HelloUser></HelloUser>
        <View style={styles.grid}>
            <View style={styles.row} >
                <CustomButton 
                    title={I18n.t('MAIN_loaded')} 
                    imgSource={LOADED} 
                   
                    onPress={() => navigation.navigate('Loaded')}
                />
                <CustomButton 
                    title={I18n.t('MAIN_unloaded')} 
                    imgSource={UNLOADED}
                   
                    onPress={() => navigation.navigate('Unloaded')}
                />
            </View>
            <View style={styles.row}>
                <CustomButton   
                    title={I18n.t('MAIN_uploadCMR')} 
                    imgSource={UPLOAD}  
                 
                    onPress={() => navigation.navigate('Upload CMR')}
                />
                <CustomButton 
                    title={I18n.t('MAIN_delayed')} 
                    imgSource={DELAY} 
          
                    onPress={() => navigation.navigate('Delayed')}
                />
            </View>
        </View>
    </View>
</>

  );
}
export default SubpageMain;





const styles = StyleSheet.create({
  imageIcon:{
    height:20,
    width:20,
    
    //     borderColor: '#cf1818',
    // borderWidth: 1,
    // borderRadius: 4,

    

  },

  container:{
    
    width:"90%",
    marginLeft:"5%",
    marginRight:"5%",
    paddingTop:8,
    flex:1,
    alignItems:"end",
    alignContent:"end",
  },
  grid: {
   
  
    marginTop: "auto",
    marginBottom: "auto",
    width:"100%",

   
    // borderColor: '#cf1818',
    // borderWidth: 1,
    // borderRadius: 4,
  },
  row: {

    width:"100%",
    flexDirection: 'row',
    
    // borderColor: '#cf1818',
    // borderWidth: 1,
    // borderRadius: 4,
  },
  resetButton: {
    width: 30,
    height: 30,
    borderRadius: 15, // Half of width and height to make it circular
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:4,
    marginTop:4
    // position: 'absolute', // Use 'absolute' if you want to position it over another element
    // right: 10, // Adjust the position as per your need
    // top: 10
},
resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500'
}

});
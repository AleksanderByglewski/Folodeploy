// SubpageTwo.js
import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,  TouchableOpacity, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import HelloUser from '../components/HelloUser';

import { useAuth } from '../AuthContext';  

function Cetacean() {
  return <></>;
}

function Navigation() {
  return (
    <>
      <CertainLinks></CertainLinks>

    </>
  )

}

function CertainLinks() {
  return (
    <>
      {/* <Link to="/">Main Page</Link> */}
      <Link to="/loaded">Loaded</Link>
      <Link to="/unloaded">Unloaded</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/delay">Delay</Link>
      <Cetacean></Cetacean>

    </>

  );
}

import LOADED from '../assets/img/loaded.png';
import UNLOADED from '../assets/img/unloaded.png';
import UPLOAD from '../assets/img/upload.png';
import DELAY from '../assets/img/delay.png';



function SubpageMain({ navigation }) {
  const auth = useAuth();  // Access the auth context
  return (
    <>

    <View style={styles.container}>

     
   
      <HelloUser></HelloUser>

      <View style={styles.grid}>
    
        <View style={styles.row}>

        
        <CustomButton title="Loaded" imgSource={LOADED} style={styles.cell} onPress={() => navigation.navigate('Loaded')}>
     
        </CustomButton>
        <CustomButton title="Unloaded"   imgSource={UNLOADED}  style={styles.cell} onPress={() => navigation.navigate('Unloaded')}>
          
        </CustomButton>

        
        </View>
        <View style={styles.row}>
          <CustomButton   title="Upload" imgSource={UPLOAD} style={styles.cell} onPress={() => navigation.navigate('Upload')}>
    
          </CustomButton>
          <CustomButton  title="Delayed" imgSource={DELAY}  style={styles.cell} onPress={() => navigation.navigate('Delayed')}>
      
          </CustomButton>


          
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

});
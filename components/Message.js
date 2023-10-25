// HelloUser.js
import React from 'react';
import { View, Text,StyleSheet, Image  } from 'react-native';
// import SvgUri from 'react-native-svg';  
import { useAuth } from '../AuthContext';  // Make sure the path is correct


import SVG from '../assets/img/user.png';
import MAP from '../assets/img/map.png';


const Message = ({ title, style }) => {
  const auth = useAuth();  // Access the auth context

  return (
    <View style={[styles.wrapper, style]}>
    <View style={styles.container}>

   
 


        {/* <Image style={{width: 20, height: 20}} source={require('../assets/img/user.png')} /> */}
        <Text style={styles.text}>{title ? title : 'Confirm?'}</Text>
 


    </View>
    </View>
  );
};

const styles = StyleSheet.create({


    wrapper:{
   
        width:"100%"
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
  textWithIcon: {
    flexDirection: 'row',  // Use row to place the icon and text next to each other
    alignItems: 'center',  // Align items vertically in the center
    marginVertical: 5,  // Add some vertical margin for better spacing
  },
  text: {
    marginLeft: 10,  // Add some left margin to separate the text from the icon
  }
});

export default Message;
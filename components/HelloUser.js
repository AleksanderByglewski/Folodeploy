// HelloUser.js
import React from 'react';
import { View, Text,StyleSheet, Image  } from 'react-native';
import SvgUri from 'react-native-svg';  
import { useAuth } from '../AuthContext';  // Make sure the path is correct


import SVG from '../assets/img/user.png';
import MAP from '../assets/img/map.png';


const HelloUser = () => {
  const auth = useAuth();  // Access the auth context

  return (
    <View style={styles.wrapper}>
    <View style={styles.container}>
      <View style={styles.textWithIcon}>
      <View style={styles.svgIconBox}>
      <Image source={SVG} style={styles.svgIcon} />
 

      </View>
        {/* <Image style={{width: 20, height: 20}} source={require('../assets/img/user.png')} /> */}
        <Text style={styles.text}>Welcome User: {auth.userRole}</Text>
      </View>
      <View style={styles.textWithIcon}>
      <View style={styles.svgIconBox}>
      <Image source={MAP} style={styles.svgIcon} />
      </View>

        <Text style={styles.text}>Route Direction: {auth.routeDirection}</Text>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({

  svgIconBox:{
    height:20,
    width:20,
    //     borderColor: '#cf1818',
    // borderWidth: 1,
    // borderRadius: 4,
    // height: '100%',
    
    marginLeft:10,
  },

  svgIcon: {

    width:"100%",
    height: '100%',
  
  },
    wrapper:{
   
        width:"100%"
    },
  container: {
   
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "white",
    margin: 4,
    
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

export default HelloUser;
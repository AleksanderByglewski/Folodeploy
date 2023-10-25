// components/CustomButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const CustomButton = ({ title, imgSource, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.cell, style]} onPress={onPress}>
      <Image source={imgSource} style={styles.imageIcon} />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
  
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ececec',
    margin: 4,
    borderRadius:4,
    backgroundColor:"white",

    // borderColor: '#cf1818',
    // borderWidth: 1,
    // borderRadius: 4,
    // boxShadow:"0px 0px 8px 0px rgb(223, 223, 223)"
    aspectRatio: 1, // Sets the aspect ratio to 1:1
  },
  imageIcon:{
    height:"50%",
    width:"50%",
    marginTop:12,
    marginBottom:12
    //     borderColor: '#cf1818',
    // borderWidth: 1,
    // borderRadius: 4,

    

  },

  svgIcon: {

    width:"100%",
    height: '100%',
  
  },
});

export default CustomButton;
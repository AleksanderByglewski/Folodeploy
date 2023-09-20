// SubpageTwo.js
import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


function Cetacean() {
  return <></>;
}

function Navigation(){
  return (
  <>
  <CertainLinks></CertainLinks>

  </>
  )

}

function CertainLinks(){
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

function SubpageMain() {
    return <CertainLinks></CertainLinks>}

export default SubpageMain;

// SubpageTwo.js
import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,  TouchableOpacity, Image, Alert } from 'react-native';
import HelloUser from '../components/HelloUser';
// import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../AuthContext';  
import axios from 'axios';

import CustomButton from '../components/CustomButton';

import LOADED from '../assets/img/loaded.png';
import UNLOADED from '../assets/img/unloaded.png';
import UPLOAD from '../assets/img/upload.png';
import DELAY from '../assets/img/delay.png';
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import I18n from '../translations'

function SubpageMain() {

  // const navigation = useNavigation();  // Access navigation



  return (
    <>
    <View>
        <HelloUser></HelloUser>
        <View >
        <HelloUser></HelloUser>
        <View >
            <View  >
            <CustomButton 
                    title={I18n.t('MAIN_loaded')} 
                    imgSource={LOADED} 
                   
              
                />
                <CustomButton 
                    title={I18n.t('MAIN_unloaded')} 
                    imgSource={UNLOADED}
                   
                 
                />
            </View>
            <View style={styles.row}>
                <CustomButton   
                    title={I18n.t('MAIN_uploadCMR')} 
                    imgSource={UPLOAD}  
                
                />
                <CustomButton 
                    title={I18n.t('MAIN_delayed')} 
                    imgSource={DELAY} 
          
                  
                />
                </View>
            </View>
        </View>
  
    </View>
  </>

  );
}
export default SubpageMain;



const styles = StyleSheet.create({


});

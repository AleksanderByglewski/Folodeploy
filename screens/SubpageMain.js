// SubpageTwo.js
import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,  TouchableOpacity, Image } from 'react-native';
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


function SubpageMain({ navigation }) {
  const auth = useAuth();  // Access the auth context


  const [status, setStatus] = useState([]);
  
  const resetStatus = async () => {
    try {
         //url='http://localhost:4000/backend/mobile/store2.php'
       
        var url_reset='http://localhost:4000/backend/mobile/reset-status.php'
        var url_reset='https://1944.methinks.pl/backend/mobile/reset-status.php'
        const response = await axios.post(url_reset, {
            userRole: auth.userRole,
            driverId: auth.driverId,
            userId: auth.userId,
        });
        
        if (response.data.success) {
            alert('Status reset successfully!');
            // Refresh the status after resetting
            await fetchData();
            
        } else {
            throw new Error('Failed to reset status');
        }
    } catch (error) {
        console.error('There was an error!', error);
    }
};


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('https://1944.methinks.pl/backend/mobile/status.php', {
            userRole: auth.userRole,
            driverId: auth.driverId,
            userId: auth.userId,
          });
          console.log(response);
          if (response.data.status && typeof response.data.status === 'string') {
            setStatus(response.data.status.split(','));
          } else {
            // console.error('Status is not a string:', response.data.status);
            setStatus([]);
          }
        } catch (error) {
          console.error('There was an error!', error);
        }
      };

      fetchData();
    }, [auth.userRole, auth.driverId, auth.userId])
  );

    const isCompleted = (step) => {
      if(status){
    return status.map(s => s.toUpperCase()).includes(step.toUpperCase());
      }
  };

  return (
    <>
    <View style={styles.container}>
        <HelloUser></HelloUser>
        <View style={styles.grid}>
            <View style={styles.row} >
                <CustomButton 
                    title={I18n.t('MAIN_loaded')} 
                    imgSource={LOADED} 
                    style={isCompleted('loaded') ? {...styles.cell, filter: 'grayscale(100%)'} : styles.cell} 
                    onPress={() => navigation.navigate('Loaded')}
                />
                <CustomButton 
                    title={I18n.t('MAIN_unloaded')} 
                    imgSource={UNLOADED}
                    style={isCompleted('unloaded') ? {...styles.cell, filter: 'grayscale(100%)'} : styles.cell} 
                    onPress={() => navigation.navigate('Unloaded')}
                />
            </View>
            <View style={styles.row}>
                <CustomButton   
                    title={I18n.t('MAIN_uploadCMR')} 
                    imgSource={UPLOAD}  
                    style={isCompleted('CMR') ? {...styles.cell, filter: 'grayscale(100%)'} : styles.cell} 
                    onPress={() => navigation.navigate('Upload CMR')}
                />
                <CustomButton 
                    title={I18n.t('MAIN_delayed')} 
                    imgSource={DELAY} 
                    style={styles.cell} 
                    onPress={() => navigation.navigate('Delayed')}
                />
            </View>
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={resetStatus}>
            <Text style={styles.resetButtonText}>{I18n.t('MAIN_reset')}</Text>
        </TouchableOpacity>
        <Text>{I18n.t('MAIN_status')}: {status}</Text>
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
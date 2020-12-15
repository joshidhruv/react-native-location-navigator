import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { userLogout } from '../Actions/authAction';

export default function Home({navigation}) {
    const dispatch = useDispatch();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
                'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
            );
        } else {
            (async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            })();
        }
    });

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    const startTrack = () => {
        navigation.navigate('Map', { details: location });
    }
    let user_name = ''
    let { authenticated_user, registeredUsers } = useSelector(state => state.auth);
    registeredUsers.forEach(user=>{
        if(authenticated_user.email === user.email){
            user_name = user.name
        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.name}>Hi {user_name}!</Text>
            <Button onPress={()=>dispatch(userLogout())} title='Logout'/>
            <Text style={styles.paragraph}>{text}</Text>
            {
                (text !== 'Waiting..') && <Button title='Start tracking my location' onPress={startTrack} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
    name:{
        fontSize: 38,
        fontWeight: 'bold'
    },
});

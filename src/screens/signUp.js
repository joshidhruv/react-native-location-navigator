import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Button, View } from 'react-native';
import styled from 'styled-components';
import { createUser } from '../Actions/authAction';
// import AsyncStorage from '@react-native-async-storage/async-storage'
const SignUp = ({ navigation }) => {
    const dispatch = useDispatch();
    const [name, setname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const signUp = () => {
        dispatch(createUser({
            name: name,
            email: email,
            password: password
        }))
        navigation.navigate('SignIn')
    }
    // useEffect(() => {
    //     AsyncStorage.clear().then((response) => {
    //         console.log("CLEAR: ",response);
    //     }).catch((error) =>console.log("error: ",error));
    // }, [])
    return (
        <RegistrationView style={styles.screenContainer}>
            <Box>
                <Description>Full Name</Description>
                <TextInput onChangeText={text => setname(text)} />
            </Box>
            <Box>
                <Description>Email</Description>
                <TextInput onChangeText={text => setEmail(text)} />
            </Box>
            <Box>
                <Description>Password</Description>
                <TextInput onChangeText={text => setPassword(text)} secureTextEntry={true} />
            </Box>
            <ButtonContainer onPress={signUp}>
                <ButtonText>Sign Up</ButtonText>
            </ButtonContainer>
            <View>
                <Description>Don't have an account?</Description>
                <Button onPress={() => navigation.navigate('SignIn')} title="Sign In" />
            </View>
        </RegistrationView>
    );
}
export default SignUp

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1
    }
});

const TextInput = styled.TextInput`
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    height: 40px;
    padding: 8px 15px;
`;
const Description = styled.Text`
   font-size: 16px;
   margin: 8px 0;
`;
const RegistrationView = styled.View`
   display: flex;
   align-items: center;
   height: 100%;
`;
const Box = styled.View`
   display: flex;
   justify-content: flex-start;
   width: 100%;
   padding: 8px 15px;
`;
const ButtonContainer = styled.TouchableOpacity`
    margin-top: 15px;
	width: 93%;
	height: 40px;
	padding: 8px 15px;
	border-radius: 8px;
    background-color: black;
    display: flex;
    align-items: center;
`;

const ButtonText = styled.Text`
	font-size: 16px;
	color: white;
	text-align: center;
`;
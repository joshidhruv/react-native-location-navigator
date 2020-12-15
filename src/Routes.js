import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import HomeScreen from './screens/Home';
import MapScreen from './screens/Map';
import SignIn from './screens/signIn';
import SignUp from './screens/signUp';
const Routes = () => {
  return <Main />
}

export default Routes;

const Main = () => {
  let { authenticated_user } = useSelector(state => state.auth);
  return (authenticated_user) ? <PrivateView /> : <PublicView />
}

const Stack = createStackNavigator();
const PublicView = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const PrivateView = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
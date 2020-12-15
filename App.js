import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './mystore';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleSheet, View, Text } from 'react-native';
import Routes from './src/Routes';

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
    )
  }
}

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo';
import { AppContainer } from 'react-navigation';
import { Start } from './src/Start';
import { Configuracion } from './src/Configuracion';
import { Test } from './src/Test';
import { MejorPuntaje } from './src/MejorPuntaje';
import store from './src/Reducers';

const AppNavigator = createStackNavigator({
  Start: {
    screen: Start    
  },
  Test: {
    screen: Test
  },
  Scoreboard: {
    screen: MejorPuntaje
  },
  Settings: {
    screen: Configuracion
  }
},
  {
    initialRoute: "Start"
  }
);

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
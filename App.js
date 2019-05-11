import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import  Start  from './src/Start';
import  Configuracion  from './src/Configuracion';
import  Test  from './src/Test';
import  MejorPuntaje  from './src/MejorPuntaje';

const AppNavigator = createStackNavigator({
  Start: Start,
  Test: Test,
  Scoreboard: MejorPuntaje,
  Settings: Configuracion
},
  {
    initialRoute: "Start"
  }
);

export default createAppContainer(AppNavigator);
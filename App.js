import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo';
import { createAppContainer } from 'react-navigation';
import { Inicio } from './src/Inicio';
import { Configuracion } from './src/Configuracion';
import { Test } from './src/Test';
import { MejorPuntaje } from './src/MejorPuntaje';

const AppNavigator = createStackNavigator({
  Start: {
    screen: Inicio,
  },
  Juego: {
    screen: Test
  },
  Puntaje: {
    screen: MejorPuntaje
  },
  Configuracion: {
    screen: Configuracion
  }
});

export default createAppContainer(AppNavigator);

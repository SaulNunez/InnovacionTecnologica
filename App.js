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

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state= {fontLoaded: false};
  }
  async componentDidMount(){
    await Font.loadAsync({
      'Lato-Regular': require('./assets/fonts/lato/Lato-Regular.ttf'),
      'yikes_medium': require('./assets/fonts/yikes/Yikes_medium.ttf'),
    });
    this.setState({fontLoaded: true})
  }

  render(){
    return (<AppContainer />);
  }
}
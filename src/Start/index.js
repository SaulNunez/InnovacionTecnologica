import React from 'react';
import { View } from 'react-native';

export default class Start extends React.Component {
    //No deberia haber un header en la pantalla de inicio
    static navigationOptions={
        header: null
    };

    render() {
        <View>
            <h1>Aprender Matemáticas</h1>
            <div onPress={() => this.props.navigation.navigate('Test')}>Iniciar juego</div>
            <div onPress={() => this.props.navigation.navigate('Scoreboard')}>Mejor puntaje</div>
            <div onPress={() => this.props.navigation.navigate('Settings')}>Configuración</div>
        </View>
    }
}
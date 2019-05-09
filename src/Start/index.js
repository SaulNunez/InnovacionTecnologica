import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { Touchable } from 'react-native-platform-touchable';

export default class Start extends React.Component {
    //No deberia haber un header en la pantalla de inicio
    static navigationOptions = {
        header: null
    };

    render() {
        <View>
            <h1>Aprender Matemáticas</h1>
            <div>
                <Touchable onPress={() => this.props.navigation.navigate('Test')}>
                    <div >Iniciar juego</div>
                </Touchable>
                <Touchable onPress={() => this.props.navigation.navigate('Scoreboard')}>
                    <div >Mejor puntaje</div>
                </Touchable>
                <Touchable onPress={() => this.props.navigation.navigate('Settings')}>
                    <div >Configuración</div>
                </Touchable>
            </div>
        </View>
    }
}
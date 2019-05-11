import React, { PropTypes, } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  Touchable from 'react-native-platform-touchable';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
    bigBoi: {
        fontSize:48,
    }
});

export default class Start extends React.Component {
    constructor(props) {
        super(props);
    }

    //No deberia haber un header en la pantalla de inicio
    static navigationOptions = {
        header: null
    };

    render() {
        return(
        <View>
            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.bigBoi}>Aprender Matemáticas</Animatable.Text>
            <View>
                <Touchable onPress={() => this.props.navigation.navigate('Test')}>
                    <View><Text>Iniciar juego</Text></View>
                </Touchable>
                <Touchable onPress={() => this.props.navigation.navigate('Scoreboard')}>
                    <View><Text>Mejor puntaje</Text></View>
                </Touchable>
                <Touchable onPress={() => this.props.navigation.navigate('Settings')}>
                    <View><Text>Configuración</Text></View>
                </Touchable>
            </View>
        </View>
        );
    }
}

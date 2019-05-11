import React, { PropTypes, } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  Touchable from 'react-native-platform-touchable';
import * as Animatable from 'react-native-animatable';
import base from '../styles.js';

const styles = StyleSheet.create({
    bigBoi: {
        fontSize: 48,
        textAlign: 'center',
        marginTop: 64,
        marginBottom: 64
    },
    normal: {
        fontSize: 16,
        textAlign: 'center'
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
    },
    button: {
        borderWidth: 4,
        borderStyle:'solid',
        width:'100%',
        backgroundColor: '#0000ff',
        borderColor: '#000000',
        margin: 16,
        paddingVertical: 30,
        paddingHorizontal: 80,
        minHeight: 48,
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
        <View style={styles.centeredView}>
            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.bigBoi}>Aprender Matemáticas</Animatable.Text>
            <View>
                <Touchable onPress={() => this.props.navigation.navigate('Test')} styles={styles.button}>
                    <Text style={styles.normal}>Iniciar juego</Text>
                </Touchable>
                <Touchable onPress={() => this.props.navigation.navigate('Scoreboard')} styles={styles.button}>
                    <Text style={styles.normal}>Mejor puntaje</Text>
                </Touchable>
                <Touchable onPress={() => this.props.navigation.navigate('Settings')} styles={styles.button}>
                    <Text style={styles.normal}>Configuración</Text>
                </Touchable>
            </View>
        </View>
        );
    }
}

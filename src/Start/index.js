import React, { PropTypes, } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
    bigBoi: {
        fontSize: 48,
        textAlign: 'center',
        marginTop: 64,
        marginBottom: 64
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
    },
    button: {
        borderWidth: 2,
        borderStyle:'solid',
        backgroundColor: 'yellow',
        borderColor: '#000000',
        marginVertical: 16,
        padding: 16,
        minHeight: 48,
        textAlign: 'center',
        fontSize: 24,
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
                <Touchable onPress={() => this.props.navigation.navigate('Test')} background={Touchable.Ripple('yellow')}>
                    <Text style={styles.button}>Iniciar juego</Text>
                </Touchable>
                
                <Touchable onPress={() => this.props.navigation.navigate('Scoreboard')} background={Touchable.Ripple('yellow')}>
                    <Text style={styles.button}>Mejor puntaje</Text>
                </Touchable>
                <Touchable onPress={() => this.props.navigation.navigate('Settings')} background={Touchable.Ripple('yellow')}>
                    <Text style={styles.button}>Configuración</Text>
                </Touchable>
            </View>
        </View>
        );
    }
}

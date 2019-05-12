import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    betterView:{
        maxWidth: 1024,
        margin: 16
    }
});

export default class Configuracion extends React.Component {
    static navigationOptions={
        title: 'Configuración'
    };

    render() {
        return(
            <View style={styles.betterView}>
                <Text>Música</Text>
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                />
                <Text>Efectos de Sonido</Text>
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                />
            </View>
        );
    }
}
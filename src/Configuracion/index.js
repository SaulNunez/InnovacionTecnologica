import React from 'react';
import { ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';

export default class Configuracion extends React.Component {
    static navigationOptions={
        title: 'Configuración'
    };

    render() {
        <ScrollView>
            <p>Música</p>
            <Slider
                minimumValue={0}
                maximumValue={100}
                step={1}
            />
            <p>Efectos de Sonido</p>
            <Slider
                minimumValue={0}
                maximumValue={100}
                step={1}
            />
        </ScrollView>
    }
}
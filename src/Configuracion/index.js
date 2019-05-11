import React from 'react';
import { ScrollView, Text } from 'react-native';
import {Slider} from 'expo';

export default class Configuracion extends React.Component {
    static navigationOptions={
        title: 'Configuración'
    };

    render() {
        return(
            <ScrollView>
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
            </ScrollView>
        );
    }
}
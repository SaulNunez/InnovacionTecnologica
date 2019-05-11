import React from 'react';
import { View, ScrollView, Text } from 'react-native';

export default class MejorPuntaje extends React.Component {
    static navigationOptions = {
        title:'Puntaje'
    };
    
    render(){
        return(
        <View>
            <ScrollView>
                <View>
                    <Text>Mejor puntaje</Text>
                    <Text>N/a</Text>

                    <View>
                        <Text>Sesion 12:34</Text>
                        <Text>Puntaje: N/a</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
        );
    }
}
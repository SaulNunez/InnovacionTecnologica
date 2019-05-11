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
                <div>
                    <Text>Mejor puntaje</Text>
                    <Text>N/a</Text>

                    <div>
                        <Text>Sesion 12:34</Text>
                        <Text>Puntaje: N/a</Text>
                    </div>
                </div>
            </ScrollView>
        </View>
        );
    }
}
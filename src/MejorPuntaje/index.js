import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import getDifficulty, {getStatistics, purgeCurrentData} from '../Shared/Stats';
import Touchable from 'react-native-platform-touchable';

const styles = StyleSheet.create({
    title: {
        fontSize: 48
    },
    display: {
        fontSize: 32
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

export default class MejorPuntaje extends React.Component {
    static navigationOptions = {
        title:'Puntaje'
    };

    constructor(props){
        this.state = {
            bestScore: getStatistics(),
            difficulty: getDifficulty()
        };
    }
    
    render(){
        return(
        <View>
            <ScrollView>
                <View>
                    <Text style={styles.title}>Mejor puntaje</Text>
                    <text style={styles.display}>{this.state.bestScore}</text>
                    <Text style={styles.title}>Dificultad actual</Text>
                    <text style={styles.display}>{this.state.difficulty}</text>
                </View>
                <Touchable onPress={() => purgeCurrentData()} background={Touchable.Ripple('yellow')}>
                    <Text style={styles.button}>Borrar datos</Text>
                </Touchable>
            </ScrollView>
        </View>
        );
    }
}
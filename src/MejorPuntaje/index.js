import React from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground } from 'react-native';
import getDifficulty, { getStatistics, purgeCurrentData } from '../Shared/Stats';
import Touchable from 'react-native-platform-touchable';

const styles = StyleSheet.create({
    title: {
        fontSize: 48,
        color: 'white'
    },
    display: {
        fontSize: 32,
        color:'white'
    },
    button: {
        borderWidth: 2,
        borderStyle: 'solid',
        backgroundColor: 'yellow',
        borderColor: '#000000',
        marginVertical: 16,
        padding: 16,
        minHeight: 48,
        textAlign: 'center',
        fontSize: 24,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
    },
});

export default class MejorPuntaje extends React.Component {
    static navigationOptions = {
        title: 'Puntaje'
    };

    constructor(props) {
        super(props);

        this.state = {
            bestScore: 0,
            difficulty: 0
        };
    }

    async componentDidMount(){
        this.setState({bestScore: await getDifficulty()});
        this.setState({difficulty: await getStatistics()});
    } 

    render() {
        return (
            <ImageBackground source={require('../../assets/page.png')} style={{ width: '100%', height: '100%' }}>
                <ScrollView contentContainerStyle={styles.centeredView}>
                    <View>
                        <Text style={styles.title}>Mejor puntaje</Text>
                        <Text style={styles.display}>{this.state.bestScore.toString()}</Text>
                        <Text style={styles.title}>Dificultad actual</Text>
                        <Text style={styles.display}>{this.state.difficulty.toString()}</Text>
                    </View>
                    <Touchable onPress={() => purgeCurrentData()} background={Touchable.Ripple('yellow')}>
                        <Text style={styles.button}>Borrar datos</Text>
                    </Touchable>
                </ScrollView>
            </ImageBackground>
        );
    }
}
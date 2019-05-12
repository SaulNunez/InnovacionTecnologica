import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import { getVolume, updateVolume } from '../Shared/Stats';

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
                    value={this.state.music}
                    step={1}
                />
                <Text>Efectos de Sonido</Text>
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    value={this.state.fx}
                    step={1}
                />
            </View>
        );
    }

    componentWillMount(){
        let volInfo = getVolume();
        this.setState({
            music: volInfo.music,
            fx: volInfo.fx
        });
    }

    componentWillUnmount(){
        updateVolume({music: this.state.music, fx: this.state.fx});
    }
}
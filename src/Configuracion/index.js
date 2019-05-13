import React from 'react';
import { View, Text, Slider, StyleSheet, ImageBackground } from 'react-native';
import { getVolume, updateVolume } from '../Shared/Stats';

const styles = StyleSheet.create({
    betterView:{
        maxWidth: 1024,
        margin: 16
    },
    text: {
        color: 'white'
    }
});

export default class Configuracion extends React.Component {
    static navigationOptions={
        title: 'Configuración'
    };

    constructor(props){
        super(props);

        this.state = {
            music: 0,
            fx: 0
        }
    }

    render() {
        return(
            <ImageBackground source={require('../../assets/page.png')} style={{width: '100%', height: '100%'}}>
            <View style={styles.betterView}>
                <Text style={styles.text}>Música</Text>
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    value={this.state.music}
                    onValueChange={(value) => this.setState({music: value})}
                    step={1}
                />
                <Text style={styles.text}>Efectos de Sonido</Text>
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    value={this.state.fx}
                    onValueChange={(value) => this.setState({fx: value})}
                    step={1}
                />
            </View>
            </ImageBackground>
        );
    }

    async componentDidMount(){
        let volInfo = await getVolume();
        this.setState({
            music: volInfo.music,
            fx: volInfo.fx
        });
    }

    componentWillUnmount(){
        updateVolume({music: this.state.music, fx: this.state.fx});
    }
}
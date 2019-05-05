import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import * as Progress from 'react-native-progress';

export default class Test extends React.Component {
    static navigationOptions = {
        header: () => {
            return(<Progress.Bar 
                progress={this.state.indicePregunta/this.state.preguntasToDo}
                animated={true}
                width={null} />);
        },
        headerBackTitle: null
    };

    constructor(props){
        super(props);
        this.state = {
            preguntasToDo: 10,
            preguntasCorrectas: 0,
            indicePregunta: 1,
            tiempoRestantePregunta: Infinity
        };
    }

    onComponentDidMount(){
        
    }

    render() {
        <KeyboardAvoidingView>
            
        </KeyboardAvoidingView>
    }
}
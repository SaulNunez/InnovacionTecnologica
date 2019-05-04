import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

export default class Test extends React.Component {
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
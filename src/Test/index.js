import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import * as Progress from 'react-native-progress';
import Question from './Question';

class Test extends React.Component {
    //Para que aparezca el timer de la jugada
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
    }

    onComponentDidMount(){
        
    }

    render() {
        <KeyboardAvoidingView>
            <p>Pregunta {this.state.indicePregunta}</p>
            <Question />
        </KeyboardAvoidingView>
    }
}
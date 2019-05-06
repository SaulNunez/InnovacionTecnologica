import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import * as Progress from 'react-native-progress';
import Question from './Question';
import { QuestionType } from '../Reducers/types.js';

class Test extends React.Component {
    //Para que aparezca el timer de la jugada
    static navigationOptions = {
        header: () => {
            return (<Progress.Bar
                progress={this.state.indicePregunta / this.state.preguntasToDo}
                animated={true}
                width={null} />);
        },
        headerBackTitle: null
    };

    render() {
        <KeyboardAvoidingView>
            <p>Pregunta {this.state.indicePregunta}</p>
            <Question question={this.props.question} />
        </KeyboardAvoidingView>
    }
}

const mapStateToProps = (state) => {
    const { timeLeft, question, mode } = state;
    return { timeLeft, question, mode };
}

export default connect(mapStateToProps)(Test);
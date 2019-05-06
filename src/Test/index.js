import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import * as Progress from 'react-native-progress';
import Question from './Question';
import { connect } from 'react-redux';
import { TIME_FOR_ANSWERING_DEFAULT } from '../Reducers';

class Test extends React.Component {
    //Para que aparezca el timer de la jugada
    static navigationOptions = {
        header: () => {
            return (<Progress.Bar
                progress={this.props.timeLeft.timeLeft / TIME_FOR_ANSWERING_DEFAULT}
                animated={true}
                width={null} />);
        },
        headerBackTitle: null
    };

    componentDidMount(){
        
    }

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
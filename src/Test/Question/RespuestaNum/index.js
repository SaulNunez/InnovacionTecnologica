import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

export default class RespuestaNum extends React.Component {
    constructor(props){
        super(props);
        this.state = { entrada: '' , error: false};
    }

    componentDidMount() {
        this.mathTextInput.focus();
    }

    onAnswerSubmit() {     
        const isRight = entrada.trim() == this.props.correctAnswer
        if(!isRight){
            this.setState({error: true});
        }

        if(this.props.onAnswerGiven){
            this.props.onAnswerGiven(isRight);
        }
    }

    render() {
        <>
            <TextInput keyboardType='numeric'
                enablesReturnKeyAutomatically={true}
                returnKeyType='done'
                ref={this.mathTextInput}
                onSubmitEditing={() => { onAnswerSubmit(); }}
                onChangeText={(text) => this.setState({entrada : text})}
            />
            <div onPress={() => { onAnswerSubmit(); }}>Siguiente</div>
        </>
    }
}

RespuestaNum.propTypes = {
    correctAnswer: PropTypes.string.isRequired,
    onAnswerGiven: PropTypes.func.isRequired
};

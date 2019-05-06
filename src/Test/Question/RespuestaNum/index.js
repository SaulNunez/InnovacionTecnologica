import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

export default class RespuestaNum extends React.Component {
    constructor(props){
        super(props);
        this.state = { entrada: '' };
    }

    componentDidMount() {
        this.mathTextInput.focus();
    }

    onAnswerSubmit() {
        if(this.props.onAnswerSubmit){
            this.props.onAnswerSubmit(this.state.entrada);
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
            <div onPress={() => { onAnswerSubmit(); }}>Next</div>
        </>
    }
}

RespuestaNum.propTypes = {
    onAnswerSubmit: PropTypes.func
};
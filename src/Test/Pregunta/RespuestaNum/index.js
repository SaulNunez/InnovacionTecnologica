import React from 'react';
import { TextInput } from 'react-native';

export default class RespuestaNum extends React.Component {
    componentDidMount() {
        this.mathTextInput.focus();
    }

    onAnswerSubmit() {

    }

    render() {
        <>
            <TextInput keyboardType='numeric'
                enablesReturnKeyAutomatically={true}
                returnKeyType='done'
                ref={this.mathTextInput}
                onSubmitEditing={() => { onAnswerSubmit(); }}
            />
            <div onPress={() => { onAnswerSubmit(); }}>Next</div>
        </>
    }
}
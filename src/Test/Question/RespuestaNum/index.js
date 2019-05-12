import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    input: {
        button: {
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#000000',
            marginVertical: 16,
            minHeight: 48,
            fontSize: 24,
        },
    },
    inputWrong: input | {
        borderColor: 'red',
    },
    inputRight: input | {
        borderColor: 'green'
    }
});

export default class RespuestaNum extends React.Component {
    constructor(props) {
        super(props);
        this.state = { entrada: '', error: false };
    }

    componentDidMount() {
        this.mathTextInput.focus();
    }

    onAnswerSubmit() {
        const isRight = entrada.trim() == this.props.correctAnswer;
        this.setState({ answerSubmited: true });
        if (!isRight) {
            this.setState({ error: true });
        }

        if (this.props.onAnswerGiven) {
            this.props.onAnswerGiven(isRight);
        }
    }

    render() {
        return (
            <>
                <TextInput keyboardType='numeric'
                    enablesReturnKeyAutomatically={true}
                    returnKeyType='done'
                    ref={this.mathTextInput}
                    onSubmitEditing={() => { onAnswerSubmit(); }}
                    style={this.state.answerSubmited ? (this.state.error ? styles.inputWrong : styles.inputRight) : styles.input}
                    onChangeText={(text) => this.setState({ entrada: text })}
                />
                <div onPress={() => { onAnswerSubmit(); }}>Siguiente</div>
            </>
        );
    }
}

RespuestaNum.propTypes = {
    correctAnswer: PropTypes.string.isRequired,
    onAnswerGiven: PropTypes.func.isRequired
};

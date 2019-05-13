import React from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import Touchable from 'react-native-platform-touchable';

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#000000',
        marginVertical: 16,
        minHeight: 48,
        fontSize: 24,
    },
    inputWrong: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'red',
        marginVertical: 16,
        minHeight: 48,
        fontSize: 24,
    },
    inputRight: {
        borderWidth: 2,
        borderStyle: 'solid',
        marginVertical: 16,
        minHeight: 48,
        fontSize: 24,
        borderColor: 'green'
    },
    button: {
        borderWidth: 2,
        borderStyle: 'solid',
        backgroundColor: 'yellow',
        borderColor: '#000000',
        marginVertical: 16,
        padding: 16,
        minHeight: 48,
        textAlign: 'center',
        fontSize: 24,
    }
});

export default RespuestaNum = (props) => {
    return (
        <>
            <TextInput keyboardType='numeric'
                enablesReturnKeyAutomatically={true}
                returnKeyType='done'
                onSubmitEditing={() => {
                    props.onAnswerGiven();
                }}
                value={props.textInputValue}
                style={props.onRevisionMode ?
                    (parseInt(props.correctAnswer) !== parseInt(props.textInputValue) ? styles.inputWrong : styles.inputRight) : styles.input}
                onChangeText={(text) => props.onTextInputChange(text)}
            />
            <Touchable onPress={() => {
                props.onAnswerGiven();
            }}
                background={Touchable.Ripple('yellow')}>
                <Text style={styles.button}>Siguiente</Text>
            </Touchable>
        </>
    );
};

RespuestaNum.propTypes = {
    onAnswerGiven: PropTypes.func.isRequired,
    onRevisionMode: PropTypes.bool.isRequired,
    textInputValue: PropTypes.string.isRequired,
    onTextInputChange: PropTypes.func.isRequired,
};

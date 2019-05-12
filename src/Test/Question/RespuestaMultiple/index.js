import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Touchable from 'react-native-platform-touchable';

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderStyle: 'solid',
        backgroundColor: '#89CFF0',
        borderColor: '#000000',
        marginVertical: 16,
        padding: 16,
        minHeight: 48,
        textAlign: 'center',
        fontSize: 24,
    },
    buttonSelected: button | {
        backgroundColor: '#77B5FE',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    }
});

export default class RespuestaMultiple extends React.Component {
    opcionElegida(index) {
        this.setState({optionSelected: index});
        if (this.props.onOptionSelected) {
            const isRight = index === this.props.question.correctIndex;
            this.props.onOptionSelected(isRight);
        }
    }

    render() {
        return (
            <>
                {this.props.question.answers.map(function (opcion, index, array) {
                    return (
                        <Touchable key={index} onPress={() => { opcionElegida(index) }} background={Touchable.Ripple('89CFF0')} disabled={!this.state.optionSelected}>
                            <Text style={this.state.optionSelected && this.state.optionSelected === index? styles.buttonSelected:styles.button}>{opcion}</Text>
                        </Touchable>
                    );
                })}
            </>
        );
    }
}

RespuestaMultiple.propTypes = {
    question: PropTypes.object.isRequired,
    onOptionSelected: PropTypes.func.isRequired,
};
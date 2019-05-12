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
        marginVertical: 4,
        padding: 16,
        minHeight: 48,
        textAlign: 'center',
        fontSize: 18,
    },
    buttonSelected: {
        borderWidth: 2,
        borderStyle: 'solid',
        backgroundColor: '#89CFF0',
        borderColor: '#000000',
        marginVertical: 4,
        padding: 16,
        minHeight: 48,
        textAlign: 'center',
        fontSize: 18,
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
    constructor(props) {
        super(props);
        this.state = { indexSelected: -1, question: props.question };
    }

    render() {
        return (
            <>
                {this.props.question.answers.map((opcion, index, array) => {
                    return (
                        <Touchable key={index} onPress={() => {
                            this.setState({ indexSelected: index });
                            if (this.props.onOptionSelected) {
                                const isRight = index === this.props.question.correctIndex;
                                this.props.onOptionSelected(isRight);
                            }
                        }} 
                        background={Touchable.Ripple('89CFF0')} 
                        disabled={this.state.indexSelected !== -1}>
                            <Text style={this.state.indexSelected === index ? styles.buttonSelected : styles.button}>{opcion}</Text>
                        </Touchable>
                    );
                })}
            </>
        );
    }

    //Esto esta mal, si nos sale la pregunta dos veces seguida
    //(una probabilidad de tal vez 1/24, 1/48 doble si consideraramos 50/50 que salga una pregunta teorica vs una practica)
    //Pero probablemente solo lo provemos una o dos veces
    //Y no permitira que el usuario eliga la sig. respuesta
    static getDerivedStateFromProps(props, state){
        if(props.question.question != state.question.question && state.indexSelected === -1){
            return { indexSelected: -1 };
        }

        return null;
    }
}

RespuestaMultiple.propTypes = {
    question: PropTypes.object.isRequired,
    onOptionSelected: PropTypes.func.isRequired,
};
import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../../Reducers';

class RespuestaNum extends React.Component {
    constructor(props){
        super(props);
        this.state = { entrada: '' , error: false};
    }

    componentDidMount() {
        this.mathTextInput.focus();
    }

    onAnswerSubmit() {
        //Primero revisamos si la respuesta fue la correcta
        //Segundo, cambiamos los estilos de los elementos y cambiamos estados locales
        //Tercero, ponemos timeout para cambiar a la sig. pregunta
        if(entrada.trim() === this.props.correctAnswer){
            //Añadir respuesta correcta
        } else {
            this.setState({error: true});
        }

        setTimeout(() => {
            store.dispatch();
        }, 3000);
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


const mapStateToProps = (state) => {
    const { timeLeft, question, mode } = state;
    return { timeLeft, question, mode };
}

export default connect(mapStateToProps)(RespuestaNum);
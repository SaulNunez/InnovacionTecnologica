import React from 'react';
import PropTypes from 'prop-types';
import Touchable from 'react-native-platform-touchable';

export default class RespuestaMultiple extends React.Component {
    opcionElegida(index){
        if(this.props.onOptionSelected){
            const isRight = index === this.props.question.correctIndex;
            this.props.onOptionSelected(isRight);
        }
    }

    render(){
        <>
        {this.props.question.answers.map(function(opcion, index, array){
            return (
                <Touchable key={index} onPress={()=>{opcionElegida(index)}}>
                    <div>{opcion}</div>
                </Touchable>
            );
        })}
        </>
    }
}

RespuestaMultiple.propTypes= {
    question: PropTypes.object.isRequired,
    onOptionSelected: PropTypes.func.isRequired,
};
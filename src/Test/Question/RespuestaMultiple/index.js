import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
                <div key={index} onPress={()=>{opcionElegida(index)}}>{opcion}</div>
            );
        })}
        </>
    }
}

RespuestaMultiple.propTypes= {
    question: PropTypes.object.isRequired,
    onOptionSelected: PropTypes.func.isRequired,
};
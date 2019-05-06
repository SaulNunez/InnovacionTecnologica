import React from 'react';
import PropTypes from 'prop-types';

export default class RespuestaMultiple extends React.Component {
    opcionElegida(index){
        if(this.props.onOptionSelected){
            this.props.onOptionSelected(index);
        }
    }

    render(){
        <>
        {this.props.respuestas.map(function(opcion, index, array){
            return (
                <div key={index} onPress={()=>{opcionElegida(index)}}>{opcion}</div>
            );
        })}
        </>
    }
}

RespuestaMultiple.propTypes= {
    respuestas: PropTypes.arrayOf(PropTypes.string).isRequired,
    onOptionSelected: PropTypes.func.isRequired
};
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RespuestaMultiple extends React.Component {
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
    onOptionSelected: PropTypes.func.isRequired,
    correctIndex: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
    const { timeLeft, question, mode } = state;
    return { timeLeft, question, mode };
}

export default connect(mapStateToProps)(RespuestaMultiple);
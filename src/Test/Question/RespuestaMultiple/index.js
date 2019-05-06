import React from 'react';

export default class extends React.Component {
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
import React from 'react';

export default class extends React.Component {
    _opcionElegida(){

    }

    render(){
        <>
        {this.props.respuestas.map(function(opcion, index, array){
            return (
                <div key={index}>{opcion}</div>
            );
        })}
        </>
    }
}
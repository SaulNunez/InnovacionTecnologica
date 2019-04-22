import React from 'react';
import { Image } from 'react-native';
import { RespuestaMultiple } from './RespuestaMultiple';
import { RespuestaNum } from './RespuestaNum';

export default class Pregunta extends React.Component {
    render() {
        <div>
            <p>{this.props.pregunta}</p>
            <Image source={{ uri: '' }} />
            {this.props.multiple? <RespuestaMultiple />: <RespuestaNum/>}
        </div>
    }
}
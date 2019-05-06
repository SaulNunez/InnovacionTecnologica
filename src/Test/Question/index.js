import PropTypes from 'prop-types'
import React from 'react';
import { Image } from 'react-native';
import { RespuestaMultiple } from './RespuestaMultiple';
import { RespuestaNum } from './RespuestaNum';

export default class Question extends React.Component {
    render() {
        <div>
            <p>{this.props.pregunta}</p>
            {
                () => {
                    if (this.props.imagen) {
                        return (<Image source={{ uri: this.props.imagen }} />);
                    }
                }
            }
            {this.props.multiple ? <RespuestaMultiple preguntas={this.props.preguntas} onOptionSelected={(index) => {}}/> : <RespuestaNum onAnswerSubmit={(answer) => {}}/>}
        </div>
    }
}


Question.propTypes = {
    pregunta: PropTypes.string.isRequired,
    imagen: PropTypes.string,
    multiple: PropTypes.arrayOf(PropTypes.string)
};
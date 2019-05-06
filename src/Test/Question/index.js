import PropTypes from 'prop-types'
import React from 'react';
import { RespuestaMultiple } from './RespuestaMultiple';
import { RespuestaNum } from './RespuestaNum';
import { QuestionType } from '../../Reducers/types.js'

export default class Question extends React.Component {
    getQuestion() {
        let question = '';
        switch (this.props.question.type) {
            case QuestionType.THEORY:
                question.concat(this.props.question.question);
                break;
            case QuestionType.PRACTICE:
                const { a, operator, b } = this.props.question;
                question.concat(a, operator, b);
        }
        return question;
    }

    render() {
        <div>
            <p>{this.props.question}</p>
            {this.props.question.type === QuestionType.THEORY ? 
                <RespuestaMultiple respuestas={this.props.question.respuestas} correctIndex={this.props.question.respuestaCorrecta}/> 
                : <RespuestaNum correctAnswer={question.result}/>}
        </div>
    }
}

Question.propTypes = {
    question: PropTypes.object.isRequired,
};
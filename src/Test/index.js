import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import * as Progress from 'react-native-progress';
import Question from './Question';
import { Audio } from 'expo';
import getPracticeQuestion from '../GetPracticeQuestion';
import getTheoryQuestion from '../GetTheoryQuestion';
import RespuestaMultiple from './Question/RespuestaMultiple';
import RespuestaNum from './Question/RespuestaNum';


const MAX_AVAILABLE_TIME = 100;
const GAME_MODE_QUESTION = 'QUESTION';
const GAME_MODE_REVISION = 'REVISION';

const QUESTION_TYPE_THEORY = 'THEORY';
const QUESTION_TYPE_PRACTICE = 'PRACTICE';

export default class Test extends React.Component {
    //Para que aparezca el timer de la jugada
    static navigationOptions = {
        header: () => {
            return (<Progress.Bar
                progress={this.state.timeLeft / MAX_AVAILABLE_TIME}
                animated={true}
                width={null} />);
        },
        headerBackTitle: null
    };

    constructor(props) {
        super(props);

        this.state = {
            mode: GAME_MODE_QUESTION,
            question: null,
            difficultyLevel: 0,
            correctAnswerCount: 0,
            questionNumber: 1,
            timeLeft: MAX_AVAILABLE_TIME,
            questionType: ''
        }
    }

    getNewQuestion() {
        //Obteniendo una pregunta random
        //MAGIA NEGRA-----
        //Javascript tiene valores falsy (o sea valores que puede usar implicitamente como booleanos)
        //Estoy usando un número random (que creo que no es imparcial, puede irse mas a un lado que a otro)
        //Y de ello obteniendo un valor 0 o 1 que espero que pueda usar como true o false
        this.setState({ question: Math.round(Math.random()) ? getTheoryQuestion() : getPracticeQuestion(difficultyLevel) });
    }

    componentDidMount() {
        this.correctAnswerSound = new Audio.Sound();
        try {
            await this.correctAnswerSound.loadAsync(require('../../assets/sounds/411088__inspectorj__bell-candle-damper-a-h4n.wav'));
        } catch (error) {
            console.log(error);
        }

        this.badAnswerSound = new Audio.Sound();
        try {
            await this.badAnswerSound.loadAsync(require('../../assets/sounds/331912__kevinvg207__wrong-buzzer.wav'));
        } catch (error) {
            console.log(error);
        }

        //Contador de la partida, cuando llegue a cero, se acaba
        setInterval(() => {
            this.setState({ timeLeft: this.state.timeLeft - 1 });
            if (this.state.timeLeft > 0) {
                mode: GAME_MODE_REVISION
            }
        }, 1000);
    }

    onQuestionAnswered(isRight) {
        this.setState({ questionNumber: questionNumber + 1 });

        if (isRight) {
            this.setState({ correctAnswerCount: this.state.correctAnswerCount + 1 });
            this.correctAnswerSound.playAsync();
            this.setState({ difficultyLevel: Math.floor(this.state.questionNumber / 10) });
        } else {
            this.badAnswerSound.playAsync();
        }

        setTimeout(() => {
            getNewQuestion();
        }, 3600);
    }

    render() {
        <KeyboardAvoidingView>
            <p>Pregunta {this.state.indicePregunta}</p>
            <p>{this.state.questionType == QUESTION_TYPE_THEORY ?
                this.state.question.pregunta :
                this.state.question.a + this.state.question.operator + this.state.question.b}</p>
            {() => {
                switch (this.state.questionType) {
                    case QUESTION_TYPE_THEORY:
                        return (
                            <>
                                <RespuestaMultiple respuestas={this.state.question.question} correctIndex={this.state.question.correctIndex} onOptionSelected={(right) => { }} />
                            </>
                        );
                        break;
                    case QUESTION_TYPE_PRACTICE:
                        return (
                            <>
                                <RespuestaNum correctAnswer={this.state.question.result} onAnswerGiven={(right) => { }} />
                            </>
                        );
                        break;
                }
            }}
        </KeyboardAvoidingView>
    }
}
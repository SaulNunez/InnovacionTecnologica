import React from 'react';
import { KeyboardAvoidingView, Alert, StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';
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

const styles = StyleSheet.create({
    questionNumber: {
        fontSize: 16
    },
    questionTitle: {
        fontSize: 32
    },
});

export default class Test extends React.Component {

    //Para que aparezca el timer de la jugada
    static navigationOptions = {
        header: () => {
            return (<Progress.Bar
                progress={100 / MAX_AVAILABLE_TIME}
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
            timeLeft: 100,
            questionType: '',
            end: false
        }
    }

    getNewQuestion() {
        //Obteniendo una pregunta random
        //MAGIA NEGRA-----
        //Javascript tiene valores falsy (o sea valores que puede usar implicitamente como booleanos)
        //Estoy usando un número random (que creo que no es imparcial, puede irse mas a un lado que a otro)
        //Y de ello obteniendo un valor 0 o 1 que espero que pueda usar como true o false
        let getTheoryQuestion = Math.round(Math.random());
        this.setState({
            question: getTheoryQuestion ? getTheoryQuestion() : getPracticeQuestion(difficultyLevel),
            questionType: getTheoryQuestion ? QUESTION_TYPE_THEORY : QUESTION_TYPE_PRACTICE
        });
    }

    componentDidMount() {
        const initSounds = async () => {
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
        }
        initSounds();

        //Contador de la partida, cuando llegue a cero, se acaba
        setInterval(() => {
            this.setState({ timeLeft: this.state.timeLeft - 1 });
            if (this.state.timeLeft > 0) {
                this.setState({ mode: GAME_MODE_REVISION, end: true });

                setTimeout(() => {
                    onEndGame();
                }, 1000);
            }
        }, 1000);
    }

    onQuestionAnswered(isRight) {
        this.setState({ questionNumber: questionNumber + 1 });
        this.setState({ mode: GAME_MODE_REVISION });

        if (isRight) {
            this.setState({ correctAnswerCount: this.state.correctAnswerCount + 1 });
            this.correctAnswerSound.playAsync();
            this.setState({ difficultyLevel: Math.floor(this.state.questionNumber / 10) });
        } else {
            this.badAnswerSound.playAsync();
        }

        setTimeout(() => {
            getNewQuestion();
            this.setState({ mode: GAME_MODE_QUESTION });
        }, 2600);
    }

    onEndGame() {
        Alert.alert('Nivel superado!',
            `Pasaste el nivel con ${this.state.correctAnswerCount} de ${this.state.questionNumber}`,
            [{
                text: 'OK', onPress: () => {
                    this.props.navigation.popToTop();
                }
            }]);
    }

    render() {
        <KeyboardAvoidingView>
            <Text style={styles.questionNumber}>Pregunta {this.state.indicePregunta}</Text>
            <Text style={styles.questionTitle}>{this.state.questionType == QUESTION_TYPE_THEORY ?
                this.state.question.pregunta :
                this.state.question.a + this.state.question.operator + this.state.question.b}</Text>
            {() => {
                switch (this.state.questionType) {
                    case QUESTION_TYPE_THEORY:
                        return (
                            <>
                                <RespuestaMultiple question={this.state.question} onOptionSelected={(right) => { }} />
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
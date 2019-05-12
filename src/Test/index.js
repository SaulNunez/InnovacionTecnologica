import React from 'react';
import { KeyboardAvoidingView, Alert, StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import { Audio } from 'expo';
import RespuestaMultiple from './Question/RespuestaMultiple';
import RespuestaNum from './Question/RespuestaNum';
import getNewQuestion, { QUESTION_TYPE_PRACTICE, QUESTION_TYPE_THEORY } from '../GetQuestion';
import getDifficulty from '../Shared/Stats';


const MAX_AVAILABLE_TIME = 100;
const GAME_MODE_QUESTION = 'QUESTION';
const GAME_MODE_REVISION = 'REVISION';



const styles = StyleSheet.create({
    questionNumber: {
        fontSize: 16
    },
    questionTitle: {
        fontSize: 32
    },
});

export default class Test extends React.Component {
    getTestProgress() {
        return (<Progress.Bar
            progress={100 / MAX_AVAILABLE_TIME}
            animated={true}
            width={null} />);
    }

    constructor(props) {
        super(props);

        const question = getNewQuestion(getDifficulty());
        console.log(question);

        this.state = {
            mode: GAME_MODE_QUESTION,
            question: question.question,
            difficultyLevel: 0,
            correctAnswerCount: 0,
            questionNumber: 1,
            timeLeft: 100,
            questionType: question.questionType,
            end: false
        };
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
        this.timeout = setInterval(() => {
            this.setState({ timeLeft: this.state.timeLeft - 1 });
            if (this.state.timeLeft <= 0) {
                this.setState({ mode: GAME_MODE_REVISION, end: true });

                if(this.state.end){
                    setTimeout(() => {
                        Alert.alert('Nivel superado!',
                            `Pasaste el nivel con ${this.state.correctAnswerCount} de ${this.state.questionNumber}`,
                            [{
                                text: 'OK', onPress: () => {
                                    this.props.navigation.popToTop();
                                }
                            }]);
                    }, 1000);
                }
            }
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timeout);
    }

    _onQuestionAnswered(isRight) {
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
            const newQuestion = getNewQuestion(this.state.difficultyLevel);
            this.setState({
                mode: GAME_MODE_QUESTION,
                question: newQuestion.question,
                questionType: newQuestion.questionType
            });
        }, 2600);
    }

    render() {
        return (
            <KeyboardAvoidingView>
                <Text style={styles.questionNumber}>Pregunta {this.state.questionNumber}</Text>
                <Text style={styles.questionTitle}>{this.state.questionType == QUESTION_TYPE_THEORY ?
                    this.state.question.question :
                    this.state.question.a + this.state.question.operator + this.state.question.b}</Text>
                {
                    this.state.questionType === QUESTION_TYPE_THEORY? <RespuestaMultiple question={this.state.question} onOptionSelected={(right) => { this.onQuestionAnswered(right) }} />
                    : <RespuestaNum correctAnswer={this.state.question.result} onAnswerGiven={(right) => { this.onQuestionAnswered(right) }} />
                }
            </KeyboardAvoidingView>
        );
    }
}
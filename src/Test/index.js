import React from 'react';
import { KeyboardAvoidingView, Alert, StyleSheet, Text, ImageBackground } from 'react-native';
import * as Progress from 'react-native-progress';
import { Audio } from 'expo';
import RespuestaMultiple from './Question/RespuestaMultiple';
import RespuestaNum from './Question/RespuestaNum';
import getNewQuestion, { QUESTION_TYPE_PRACTICE, QUESTION_TYPE_THEORY } from '../GetQuestion';
import getDifficulty, { setDifficulty, updateStatistics } from '../Shared/Stats';


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
    paddedView: {
        padding: 16
    }
});

export default class Test extends React.Component {
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
            end: false,
            selectedAnswer: null
        };
    }

    componentDidMount() {
        const initSounds = async () => {
            this.correctAnswerSound = new Audio.Sound();
            try {
                await this.correctAnswerSound.loadAsync(require('../../assets/sounds/right_ding.wav'));
            } catch (error) {
                console.log(error);
            }

            this.badAnswerSound = new Audio.Sound();
            try {
                await this.badAnswerSound.loadAsync(require('../../assets/sounds/wrong_buzzer.wav'));
            } catch (error) {
                console.log(error);
            }
        }
        initSounds();

        //Contador de la partida, cuando llegue a cero, se acaba
        this.timeout = setInterval(() => {
            this.setState({ timeLeft: this.state.timeLeft - 1 });
            if (this.state.timeLeft <= 0) {
                clearInterval(this.timeout);
                this.setState({ mode: GAME_MODE_REVISION, end: true });

                if (this.state.end) {
                    setTimeout(() => {
                        Alert.alert('Nivel superado!',
                            this.state.correctAnswerCount / this.state.questionNumber > 0.6 ? `Pasaste el nivel con ${this.state.correctAnswerCount} de ${this.state.questionNumber}` :
                                `Pansaste el nivel con ${this.state.correctAnswerCount} de ${this.state.questionNumber}`,
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

    componentWillUnmount() {
        clearInterval(this.timeout);
        updateStatistics(this.state.correctAnswerCount);
        setDifficulty(this.state.difficultyLevel);
    }

    _onQuestionAnswered(isRight) {
        this.setState({ questionNumber: this.state.questionNumber + 1 });
        this.setState({ mode: GAME_MODE_REVISION });

        if (isRight) {
            this.setState({
                correctAnswerCount: this.state.correctAnswerCount + 1,
                difficultyLevel: Math.floor(this.state.questionNumber / 10),
                timeLeft: this.state.timeLeft + 3
            });
            try {
                this.correctAnswerSound.playAsync();
            } catch (error) {
                console.error(error.message);
            }
        } else {
            this.setState({ timeLeft: this.state.timeLeft - 3 });
            try {
                this.badAnswerSound.playAsync();
            } catch (error) {
                console.error(error.message);
            }
        }

        setTimeout(() => {
            const newQuestion = getNewQuestion(this.state.difficultyLevel);
            this.setState({
                mode: GAME_MODE_QUESTION,
                question: newQuestion.question,
                questionType: newQuestion.questionType,
                selectedAnswer: null
            });
        }, 1000);
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/page.png')} style={{ width: '100%', height: '100%' }}>
                <KeyboardAvoidingView style={styles.paddedView}>
                    <Progress.Bar
                        progress={this.state.timeLeft / MAX_AVAILABLE_TIME}
                        animated={true}
                        width={null} />
                    <Text style={styles.questionNumber}>Pregunta {this.state.questionNumber}</Text>
                    <Text>Correctas - {this.state.correctAnswerCount}</Text>
                    <Text style={styles.questionTitle}>{this.state.questionType == QUESTION_TYPE_THEORY ?
                        this.state.question.question :
                        `${this.state.question.operation}`}</Text>
                    {
                        this.state.questionType === QUESTION_TYPE_THEORY ?
                            <RespuestaMultiple question={this.state.question}
                                onAnswerSelected={(index) => {
                                    let isRight = index === this.state.question.correctIndex;
                                    this._onQuestionAnswered(isRight);
                                    this.setState({ selectedAnswer: index });
                                }}
                                indexSelected={"selectedAnswer" in this.state.question ? this.state.selectedAnswer : null} /> :
                            <RespuestaNum
                                onAnswerGiven={() => {
                                    let isRight = parseInt(this.state.selectedAnswer) === this.state.question.result; 
                                    this._onQuestionAnswered(isRight);
                                }}
                                onRevisionMode={this.state.mode === GAME_MODE_REVISION}
                                textInputValue={this.state.selectedAnswer === null ? '' : this.state.selectedAnswer}
                                onTextInputChange={(text) => this.setState({ selectedAnswer: text })} />
                    }
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}
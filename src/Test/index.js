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
                clearInterval(this.timeout);
                this.setState({ mode: GAME_MODE_REVISION, end: true });

                if (this.state.end) {
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

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    _onQuestionAnswered(isRight) {
        this.setState({ questionNumber: this.state.questionNumber + 1 });
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
        }, 1000);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.paddedView}>
                <Progress.Bar
                    progress={this.state.timeLeft / MAX_AVAILABLE_TIME}
                    animated={true}
                    width={null} />
                <Text style={styles.questionNumber}>Pregunta {this.state.questionNumber}</Text>
                <Text style={styles.questionTitle}>{this.state.questionType == QUESTION_TYPE_THEORY ?
                    this.state.question.question :
                    this.state.question.a.toString() + this.state.question.operator + this.state.question.b.toString()}</Text>
                {
                    //Tal vez te preguntes porque las keys
                    //Es un patron de React donde hay comportamiento del que tiene propiedad el componente
                    //Y para "resetear" el componente cuando cambien los props
                    //Puedes usar la llave para decir que es un elemento distinto y crea un nuevo componente
                    //En lugar de reusarlo
                    //YO DEL FUTURO
                    //No estoy seguro, pero talvez no funciono como esperaba
                    //En lugar, segun recomendación oficial
                    //Hay un metodo que ocurre antes de renderizar y vamos a usarlo
                    //Para al detectar un cambio de props, resetear el estado del componente
                    this.state.questionType === QUESTION_TYPE_THEORY ? <RespuestaMultiple question={this.state.question} onOptionSelected={(right) => { this._onQuestionAnswered(right) }} key={this.state.questionNumber} />
                        : <RespuestaNum correctAnswer={this.state.question.result.toString()} onAnswerGiven={(right) => { this._onQuestionAnswered(right) }} key={this.state.questionNumber} />
                }
            </KeyboardAvoidingView>
        );
    }
}
import { createStore } from 'redux';
import getTheoryQuestion from '../GetTheoryQuestion';
import getPracticeQuestion from '../GetPracticeQuestion';

const ActionType = {
    THEORY: 'theory',
    PRACTICE: 'practice',
    SECOND_PASSED: 'second_passed',
    QUESTION_ANSWERED: 'question_answered'
}

const AppStates = {
    QUESTION = 'question',
    REVISION = 'revision'
}

function isAnswerCorrect(){

}

function mode(state={}, action){
    if(action.setState === AppStates.QUESTION){
        state.mode = AppStates.QUESTION;
    } else if(action.setState === AppStates.REVISION){
        state.mode = AppStates.REVISION;
    }

    return state;
}

function question(state={}, action){
    if(action.type === AppStates.QUESTION){
        switch(Math.round(Math.random())){
            case 0:
                state.question = getTheoryQuestion();
                state.questionType= ActionType.THEORY;
                break;
            case 1:
                state.question = getPracticeQuestion();
                state.questionType = ActionType.PRACTICE;
                break;
        }
    }

    return state;
}

function timeLeft(state={timeLeft:60}, action){
    switch(action.type){
        case ActionType.SECOND_PASSED:
            timeLeft -= 1;
            break;
        case ActionType.ANSWER_WRONG:
            timeLeft -= 3;
            break;
        case ActionType.ANSWER_RIGHT:
            timeLeft += 3;
            break;
    }

    return state;
}

function correctAnswers(state={}, action){
    if(action.type === ){
        
    }
}

function questionAnswer(state = {}, action){
    if(state.questionType === 'OPERACION_ARITMETICA'){
        switch(action.operacion.adivinar){
            case 'A':
                if(action.operacion.a === respuestaUsuario){
                    state.correctAnswerCount++;
                }
                break;
            case 'B':
                if(action.operacion.b === respuestaUsuario){
                    state.correctAnswerCount++;
                }
                break;
            case 'OPERADOR':
                if(action.operacion.c == respuestaUsuario){
                    state.correctAnswerCount++;
                }
                break;
        }
    } else if (state.questionType === 'OPCION_MULTIPLE'){
        if(action.correctAnswer === action.givenAnswer){
            state.correctAnswerCount++;
        }
    }

    return state;
}

let store = createStore(questionAnswer);
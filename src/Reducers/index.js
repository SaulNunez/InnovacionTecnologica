import { combineReducers } from 'redux';
import getTheoryQuestion from '../GetTheoryQuestion';
import getPracticeQuestion from '../GetPracticeQuestion';
import getDifficulty from '../Shared/Stats';

export const QuestionType = {
    THEORY: 'THEORY',
    PRACTICE: 'PRACTICE'
}

export const ActionType = {
    SECOND_PASSED: 'SECOND_PASSED',
    QUESTION_ANSWERED: 'QUESTION_ANSWERED',
    QUESTION_ANSWER_WRONG: 'QUESTION_ANSWER_WRONG',
    QUESTION_ANSWER_RIGHT: 'QUESTION_ANSWER_RIGHT'
}

export const AppStates = {
    QUESTION = 'question',
    REVISION = 'revision'
}

function mode(state = {}, action) {
    if (action.setState === AppStates.QUESTION) {
        state.mode = AppStates.QUESTION;
    } else if (action.setState === AppStates.REVISION) {
        state.mode = AppStates.REVISION;
    }

    return state;
}

function answer(state = { correctAnswerCount: 0 }, action) {
    if (action.type === ActionType.QUESTION_ANSWER_RIGHT) {
        state.correctAnswerCount++
    }

    return state
}

function question(state = {}, action) {
    if (action.type === AppStates.QUESTION) {
        switch (Math.round(Math.random())) {
            case 0:
                state.question = getTheoryQuestion();
                state.questionType = QuestionType.THEORY;
                break;
            case 1:
                state.question = getPracticeQuestion(Math.ceil(Math.random) * 5);
                state.questionType = QuestionType.PRACTICE;
                break;
        }
    }

    return state;
}

function timeLeft(state = { timeLeft: 60 }, action) {
    switch (action.type) {
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

//const rootReducer: Reducer<{
//    timeLeft: {
//        timeLeft: number;
//    };
//    question: {};
//    answer: {
//        correctAnswerCount: number;
//    };
//    mode: {
//    mode: String
//    };
//}, AnyAction>
const rootReducer = combineReducers({ timeLeft, question, answer, mode });
export default rootReducer;
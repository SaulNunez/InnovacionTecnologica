import { combineReducers } from 'redux';
import getTheoryQuestion from '../GetTheoryQuestion';
import getPracticeQuestion from '../GetPracticeQuestion';
import getDifficulty from '../Shared/Stats';
import { QuestionType, ActionType, AppStates } from '../Reducers/types.js';

export const TIME_FOR_ANSWERING_DEFAULT = 60;

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
        state.correctAnswerCount++;
    }

    return state
}

function question(state = {}, action) {
    if (action.type === AppStates.QUESTION) {
        switch (Math.round(Math.random())) {
            case 0:
                state = getTheoryQuestion();
                state.type = QuestionType.THEORY;
                break;
            case 1:
                state = getPracticeQuestion(Math.ceil(Math.random) * 5);
                state.type = QuestionType.PRACTICE;
                break;
        }
    }

    return state;
}

function timeLeft(state = { timeLeft: TIME_FOR_ANSWERING_DEFAULT }, action) {
    switch (action.type) {
        case ActionType.SECOND_PASSED:
            state.timeLeft -= 1;
            break;
        case ActionType.ANSWER_WRONG:
            state.timeLeft -= 3;
            break;
        case ActionType.ANSWER_RIGHT:
            state.timeLeft += 3;
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
import getPracticeQuestion from '../GetPracticeQuestion';
import getTheoryQuestion from '../GetTheoryQuestion';

export const QUESTION_TYPE_THEORY = 'THEORY';
export const QUESTION_TYPE_PRACTICE = 'PRACTICE';

export default function getNewQuestion(difficultyLevel) {
    //Obteniendo una pregunta random
    //MAGIA NEGRA-----
    //Javascript tiene valores falsy (o sea valores que puede usar implicitamente como booleanos)
    //Estoy usando un número random (que creo que no es imparcial, puede irse mas a un lado que a otro)
    //Y de ello obteniendo un valor 0 o 1 que espero que pueda usar como true o false
    let theoryQuestion = Math.round(Math.random());

    return {
        question: theoryQuestion ? getTheoryQuestion() : getPracticeQuestion(difficultyLevel),
        questionType: theoryQuestion ? QUESTION_TYPE_THEORY : QUESTION_TYPE_PRACTICE
    }
}


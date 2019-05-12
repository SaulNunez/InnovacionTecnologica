const questions = require('./preguntas_multiple.json');

export default function getTheoryQuestion(){
    //1.-Obtenemos una respuesta random a preguntar
    //2.-Buscamos el indice donde esta la respuesta correcta y la guardamos para poderla buscar luego
    //3.-Mezclamos las repuesta
    //4.-Buscamos donde se quedo la respuesta correcta

    let question = questions[Math.floor(Math.random() * questions.length)];
    //const correctAnswer = question.question[question.correctIndex];
    //question.answers.sort(()=> Math.random() - 0.5);
    //question.correctIndex = question.answers.findIndex((element) => element === correctAnswer);
    //if(question.correctIndex === -1){
    //    throw new Error('Algo paso y no pudimos encontrar la respuesta correcta');
    //}

    return question;
}
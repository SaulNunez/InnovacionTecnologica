const preguntas = require('./preguntas_multiple.json.js');

export default function ObtenerPregunta(){
    //1.-Obtenemos una respuesta random a preguntar
    //2.-Buscamos el indice donde esta la respuesta correcta y la guardamos para poderla buscar luego
    //3.-Mezclamos las repuesta
    //4.-Buscamos donde se quedo la respuesta correcta

    let pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
    const respuestaCorrecta = pregunta.respuestas[pregunta.respuestaCorrecta];
    pregunta.respuestas.sort(()=> Math.random() - 0.5);
    pregunta.respuestaCorrecta = pregunta.respuestas.findIndex((elemento) => elemento === respuestaCorrecta);
    if(pregunta.respuestaCorrecta === -1){
        throw new Error('Algo paso y no pudimos encontrar la respuesta correcta');
    }

    return pregunta;
}
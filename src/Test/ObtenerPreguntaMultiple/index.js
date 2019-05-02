const preguntas = require('./preguntas.json');

export default function ObtenerPregunta(){
    return preguntas[Math.floor(Math.random() * preguntas.length)];
}
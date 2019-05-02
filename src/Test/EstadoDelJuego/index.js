function preguntaContestada(estado = {}, action){
    if(action.type === 'OPERACION_ARITMETICA'){
        switch(action.operacion.adivinar){
            case 'A':
                if(action.operacion.a === respuestaUsuario){
                    estado.preguntasCorrectas++;
                }
                break;
            case 'B':
                if(action.operacion.b === respuestaUsuario){
                    estado.preguntasCorrectas++;
                }
                break;
            case 'OPERADOR':
                if(action.operacion.c == respuestaUsuario){
                    estado.preguntasCorrectas++;
                }
                break;
        }
    } else if (action.type === 'OPCION_MULTIPLE'){
        if(action.indiceCorrecto === action.indiceElegido){
            estado.preguntasCorrectas++;
        }
    }

    return estado;
}

function juego(state = {}, action){

}
export default function getPracticeQuestion(difficulty) {
    let a = Math.floor(Math.random() * 20) + difficulty;
    let b = Math.floor(Math.random() * 20) + difficulty;

    //Para seleccionar una operación, no puedes elegir un indice random en Javascript porque un objeto
    //Esta en cierta forma desordenado
    //Usar solo los valores funciona bien para nuestro uso
    const operations = ['+','-','*'];
    let operator = operations[Math.floor(operations.length * Math.random())];
    //Para el resultado, hay una forma de ejecutar un string en Javascript
    let operationRes = `${a} ${operator} ${b}`;
    console.log(operationRes);
    let result =  eval(operationRes);
    result = result.toString();

    return { a, b, operator, result, operation: operationRes };
}
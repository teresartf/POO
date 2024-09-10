"use strict";
//1. As três alternativas principais para tratamento de erros são: desconsideração de operação, exibição de mensagem 
// de erro e retorno de um código de erro. Aqui vai um exemplo de código que abrange as três formas:
class Calculadora {
    constructor(num1, num2) {
        this._num1 = num1;
        this._num2 = num2;
    }
    //desconsideração de operação
    dividir() {
        if (this._num2 === 0) {
            return null;
        }
        return this._num1 / this._num2;
    }
    // exibição de mensagem de erro
    multiplicar() {
        if (this._num2 === 0) {
            console.error("\nNão foi possível realizar operação: Um dos números não é válido.");
            return 0;
        }
        else {
            return this._num1 * this._num2;
        }
    }
    //retorno de código de erro
    subtrair() {
        if (this._num1 < this._num2) {
            return false;
        }
        else {
            const resultado = this._num1 - this._num2;
            console.log("\nResultado:", resultado);
            return true;
        }
    }
}
//Testando
let calculator = new Calculadora(10, 20);
console.log("\nEXEMPLO UM");
console.log("\nD:", calculator.dividir()); // retorna valor válido: 0.5
console.log("M:", calculator.multiplicar()); // retorna valor válido: 200
console.log("S:", calculator.subtrair()); // retorna false 
console.log("\nEXEMPLO DOIS");
let calc = new Calculadora(12, 0);
console.log("\nD:", calc.dividir()); // retorna null
console.log("M:", calc.multiplicar()); // retorna mensagem de erro
console.log("S:", calc.subtrair()); // retorna resultado e valor válido: 12
//2. O maior problema de desconsiderar operação é que ao chamar o método em questão não temos certeza se a operação foi bem 
// sucedida ou não. 
// Ao exibir a mensagem de erro, dependemos muito da interface texto, se fosse uma interface gráfica, o usuário não seria
// capaz de notar a mensagem pois não iria olhar o terminal.
// O problema no retorno de código de erro é que devemos testar o valor. Acaba sendo um má prátiica pois ao usar flags ou
// números mágicos, podemos causar uma mudança do tipo de retorno do método.

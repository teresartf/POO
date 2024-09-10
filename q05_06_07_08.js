"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelos_1 = require("./modelos");
const banco_1 = require("./banco");
let bank = new banco_1.Banco();
let cliente1 = new modelos_1.Cliente(1, "Ana");
let cliente2 = new modelos_1.Cliente(2, "Marcelo");
let conta1 = new modelos_1.Conta("111-1", 100, cliente1);
let conta2 = new modelos_1.Conta("111-2", 230, cliente2);
bank.inserir(conta1);
bank.inserir(conta2);
try {
    bank.transferir("111-1", "111-2", 150);
}
catch (error) {
    console.error("\nErro no sistema:", error.message);
}
//Resposta da 5: SIM. Se um erro ocorre no método tranferir da conta, a exceção é propagada do método transferir da conta origem 
// para o método tranferir do banco. Do método transferir ele é propapagado até o script, onde o método é chamado.
//questão 06.
let cliente3 = new modelos_1.Cliente(3, "Dario");
let conta3 = new modelos_1.Conta("111-3", 400, cliente3);
bank.inserir(conta3);
try {
    //sacando valor negativo
    conta3.sacar(-80);
}
catch (error) {
    console.error("\nErro no sistema:", error.message);
}
try {
    //depositando valor negativo
    conta3.depositar(-40);
}
catch (error) {
    console.error("\nErro no sistema:", error.message);
}
//07-08
try {
    //transferindo para conta inexistente
    bank.transferir("111-3", "111-9", 20);
}
catch (error) {
    console.error("\nErro no sistema:", error.message);
}

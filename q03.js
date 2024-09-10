"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelos_1 = require("./modelos");
let cliente = new modelos_1.Cliente(1, "Lygia");
let conta = new modelos_1.Conta("111-1", 100, cliente);
try {
    //saque para saldo negativo
    conta.sacar(120);
}
catch (error) {
    if (error instanceof Error) {
        console.error("\nErro no sistema:", error.message);
    }
    else {
        console.error("\nErro no sistema não identificado. Contate-nos!");
    }
}

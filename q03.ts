import {Conta, Cliente} from './modelos';

let cliente = new Cliente(1, "Lygia");
let conta = new Conta("111-1", 100, cliente);

try {
    //saque para saldo negativo
    conta.sacar(120);
} catch(error: any) {
    if( error instanceof Error){
        console.error("\nErro no sistema:", error.message);
    }
    else{
        console.error("\nErro no sistema não identificado. Contate-nos!");
    }
}
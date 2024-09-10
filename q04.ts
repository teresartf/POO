import {Conta, Cliente} from './modelos';

let cliente1 = new Cliente(1, "Reginaldo");
let conta1 = new Conta("111-1", 100, cliente1);

let cliente2 = new Cliente(2, "Leticia");
let conta2 = new Conta("222-2", 50, cliente2);

try {
    //transferir com saldo insuficiente
    conta2.transferir(conta2, 120);
} catch(error: any) {
    if( error instanceof Error){
        console.error("\nErro no sistema:", error.message);
    }
    else{
        console.error("\nErro no sistema não identificado. Contate-nos!");
    }
}
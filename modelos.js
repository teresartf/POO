"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaImposto = exports.Poupanca = exports.Conta = exports.Cliente = void 0;
const excecoes_1 = require("./excecoes");
class Cliente {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}
exports.Cliente = Cliente;
class Conta {
    constructor(numero, saldo, cliente) {
        this.numero = numero;
        this.cliente = cliente;
        this.validarValor(saldo);
        //questão 10
        //this.depositar(saldo);
        this._saldo = saldo;
    }
    //questão 11
    sacar(valor) {
        this.validarValor(valor);
        if (this._saldo < valor) {
            throw new excecoes_1.SaldoInsuficienteError(`Saldo insuficiente na conta ${this.numero}. Saldo atual: ${this._saldo}`);
        }
        this._saldo -= valor;
    }
    validarValor(valor) {
        if (valor <= 0 || isNaN(valor)) {
            throw new excecoes_1.ValorInvalidoError('Valor inválido: ' + valor);
        }
    }
    depositar(valor) {
        this.validarValor(valor);
        this._saldo = this._saldo + valor;
    }
    get saldo() {
        return this._saldo;
    }
    /*
    consultarSaldo(): number {
        return this._saldo;
    }*/
    transferir(contaDestino, valor) {
        /*
        this.saldo = this.saldo - valor;
        contaDestino.saldo = contaDestino.saldo + valor;
        */
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}
exports.Conta = Conta;
class Poupanca extends Conta {
    constructor(numero, saldo, cliente, taxaDeJuros) {
        super(numero, saldo, cliente);
        this._taxaDeJuros = taxaDeJuros;
    }
    get taxaDeJuros() {
        return this._taxaDeJuros;
    }
    renderJuros() {
        let juros = this.saldo * this._taxaDeJuros / 100;
        this.depositar(juros);
    }
}
exports.Poupanca = Poupanca;
class ContaImposto extends Conta {
    constructor(numero, saldo, cliente, taxaImposto) {
        super(numero, saldo, cliente);
        this._taxaDeDesconto = 0;
        this._taxaDeDesconto = taxaImposto;
    }
    sacar(valor) {
        super.sacar(valor);
        let valorImposto = valor * this._taxaDeDesconto / 100;
        super.sacar(valorImposto);
    }
    get taxaDeDesconto() {
        return this._taxaDeDesconto;
    }
}
exports.ContaImposto = ContaImposto;

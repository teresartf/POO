"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = void 0;
const excecoes_1 = require("./excecoes");
const modelos_1 = require("./modelos");
class Banco {
    constructor() {
        this._contas = [];
    }
    inserir(conta) {
        // let contaProcurada: Conta = this.consultar(conta.numero);
        //if (!contaProcurada) {
        this._contas.push(conta);
        //}
    }
    consultar(numero) {
        let contaProcurada;
        for (let i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                contaProcurada = this._contas[i];
                break;
            }
        }
        if (contaProcurada == null) {
            throw new excecoes_1.ContaInexistenteError('Conta não encontrada: ' + numero);
        }
        return contaProcurada;
    }
    alterar(conta) {
        let contaProcurada = this.consultar(conta.numero);
        let saldoTemporario = contaProcurada.saldo;
        contaProcurada.sacar(saldoTemporario);
        contaProcurada.depositar(conta.saldo);
        contaProcurada.cliente = conta.cliente;
    }
    //questão 09: métodos antes da modificação dos ifs/elses
    // alterarPorIndice(conta: Conta) {
    //     let indice: number = this.consultarPorIndice(conta.numero);
    //     if (indice != -1) {
    //         this._contas[indice] = conta;
    //     }
    // }
    //9.
    alterarPorIndice(conta) {
        let indice = this.consultarPorIndice(conta.numero);
        this._contas[indice] = conta;
    }
    consultarPorIndice(numero) {
        let indiceProcurado = -1;
        for (let i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }
        if (indiceProcurado == -1) {
            throw new excecoes_1.ContaInexistenteError('Conta não encontrada: ' + numero);
        }
        return indiceProcurado;
    }
    excluir(numero) {
        let indice = this.consultarPorIndice(numero);
        for (let i = indice; i < this._contas.length; i++) {
            this._contas[i] = this._contas[i + 1];
            console.log(this._contas);
        }
        this._contas.pop();
        console.log(this._contas);
    }
    // sacar(numero: string, valor: number): void {
    //     let conta: Conta = this.consultar(numero);
    //     if (conta != null) {
    //         conta.sacar(valor);
    //     }
    // }
    sacar(numero, valor) {
        let conta = this.consultar(numero);
        conta.sacar(valor);
    }
    // depositar(numero: string, valor: number): void {
    //     let conta: Conta = this.consultar(numero);
    //     if (conta != null) {
    //         conta.depositar(valor);
    //     }
    // }
    depositar(numero, valor) {
        let conta = this.consultar(numero);
        conta.depositar(valor);
    }
    transferir(numero, numeroContaDestino, valor) {
        let contaOrigem = this.consultar(numero);
        let contaDestino = this.consultar(numeroContaDestino);
        contaOrigem.transferir(contaDestino, valor);
    }
    obterQuantidadeDeContas() {
        return this._contas.length;
    }
    obterTotalDeSaldos() {
        let total = 0;
        for (let conta of this._contas) {
            total += conta.saldo;
        }
        return total;
    }
    obterMediaDeSaldos() {
        return this.obterTotalDeSaldos() / this.obterQuantidadeDeContas();
    }
    executarOrdemDePagamento(numeroContaOrigem, valor, ...numerosContasDestino) {
        let contaOrigem = this.consultar(numeroContaOrigem);
        contaOrigem.validarValor(valor);
        let todasContasDestinoExistem = true;
        let contasDestino = [];
        for (let numeroContaDestino of numerosContasDestino) {
            let contaDestino = this.consultar(numeroContaDestino);
            contasDestino.push(contaDestino);
        }
        todasContasDestinoExistem = todasContasDestinoExistem && contaOrigem != null;
        let numeroDeContasDestino = (numerosContasDestino.length);
        if (contaOrigem.saldo >= valor * numeroDeContasDestino && todasContasDestinoExistem) {
            contaOrigem.sacar(valor * numeroDeContasDestino);
            for (let contaDestino of contasDestino) {
                contaDestino.depositar(valor);
            }
        }
    }
    consultarSaldo(numero) {
        let conta = this.consultar(numero);
        return conta.saldo;
    }
    //questão 9
    renderJuros(numero) {
        let conta = this.consultar(numero);
        //questão 12
        if (!(conta instanceof modelos_1.Poupanca)) {
            throw new excecoes_1.PoupancaInvalidaError('Conta não é uma poupança: ' + numero);
        }
        conta.renderJuros();
    }
    get contas() {
        return this._contas;
    }
}
exports.Banco = Banco;

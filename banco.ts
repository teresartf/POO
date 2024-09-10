import { ContaInexistenteError, PoupancaInvalidaError } from './excecoes';
import {Cliente, Conta, Poupanca, ContaImposto} from './modelos';

class Banco {
    private _contas: Conta[] = [];

    inserir(conta: Conta) {
       // let contaProcurada: Conta = this.consultar(conta.numero);
        
        //if (!contaProcurada) {
            this._contas.push(conta);
        //}
    }

    consultar(numero: string): Conta {
        let contaProcurada!: Conta;
        for (let i: number = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                contaProcurada = this._contas[i];
                break;
            }
        }

        if (contaProcurada == null) {
            throw new ContaInexistenteError('Conta não encontrada: ' + numero);
        }
        return contaProcurada;
    }

    alterar(conta: Conta) {
        let contaProcurada: Conta = this.consultar(conta.numero);
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
    alterarPorIndice(conta: Conta){
        let indice: number = this.consultarPorIndice(conta.numero);
        this._contas[indice] = conta;
    }

    private consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;
        for (let i: number = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }

        if (indiceProcurado == -1) {
            throw new ContaInexistenteError('Conta não encontrada: ' + numero);
        }

        return indiceProcurado;
    }

    excluir(numero: string): void {
        let indice: number = this.consultarPorIndice(numero);
        for (let i: number = indice; i < this._contas.length; i++) {
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

    sacar(numero:string, valor: number): void{
        let conta: Conta = this.consultar(numero);
        conta.sacar(valor);
    }
    
    // depositar(numero: string, valor: number): void {
    //     let conta: Conta = this.consultar(numero);
    //     if (conta != null) {
    //         conta.depositar(valor);
    //     }
    // }

    depositar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
       conta.depositar(valor);
    }

    transferir(numero: string, numeroContaDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultar(numero);
        let contaDestino: Conta = this.consultar(numeroContaDestino);

        contaOrigem.transferir(contaDestino, valor);
        
    }

    obterQuantidadeDeContas(): number {
        return this._contas.length;
    }

    obterTotalDeSaldos(): number {
        let total: number = 0;
        for (let conta of this._contas) {
            total += conta.saldo;
        }

        return total;
    }
    
    obterMediaDeSaldos(): number {
        return this.obterTotalDeSaldos() / this.obterQuantidadeDeContas();
    }
    
    executarOrdemDePagamento(numeroContaOrigem: string, valor: number, ...numerosContasDestino: string[]) {
        
        let contaOrigem: Conta = this.consultar(numeroContaOrigem);
        contaOrigem.validarValor(valor);
        let todasContasDestinoExistem: boolean = true;
        let contasDestino: Conta[] = [];
       
        for (let numeroContaDestino of numerosContasDestino) {
            let contaDestino: Conta = this.consultar(numeroContaDestino);
            
            contasDestino.push(contaDestino);

        }
        todasContasDestinoExistem = todasContasDestinoExistem && contaOrigem != null;
                
        let numeroDeContasDestino = (numerosContasDestino.length);
        if (contaOrigem.saldo >= valor * numeroDeContasDestino && todasContasDestinoExistem) {
            contaOrigem.sacar(valor * numeroDeContasDestino);
            for(let contaDestino of contasDestino){
                contaDestino.depositar(valor);
            }
        }
    }

    consultarSaldo(numero: string): number {
        let conta: Conta = this.consultar(numero);
        return conta.saldo;
    }

    //questão 9
    renderJuros(numero: string): void {
        let conta: Conta = this.consultar(numero);

        //questão 12
        if (!(conta instanceof Poupanca)) {
            throw new PoupancaInvalidaError('Conta não é uma poupança: ' + numero); 
        }

        conta.renderJuros();
    }

    get contas(): Conta[] {
      return this._contas;
    }
}

export {Banco};
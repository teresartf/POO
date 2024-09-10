"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoupancaInvalidaError = exports.ValorInvalidoError = exports.AplicacaoException = exports.SaldoInsuficienteError = exports.ContaInexistenteError = exports.AplicacaoError = void 0;
//questão 07
//AplicacaoError
class AplicacaoError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.AplicacaoError = AplicacaoError;
//ContaInexistenteError
class ContaInexistenteError extends AplicacaoError {
    constructor(message = 'Conta inexistente.') {
        super(message);
    }
}
exports.ContaInexistenteError = ContaInexistenteError;
//SaldoInsuficienteError
class SaldoInsuficienteError extends AplicacaoError {
    constructor(message = 'Saldo insuficiente.') {
        super(message);
    }
}
exports.SaldoInsuficienteError = SaldoInsuficienteError;
//questão 10
class AplicacaoException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.AplicacaoException = AplicacaoException;
//questão 14
class ValorInvalidoError extends AplicacaoException {
    constructor(message = 'Valor inválido.') {
        super(message);
    }
}
exports.ValorInvalidoError = ValorInvalidoError;
//questão 12
class PoupancaInvalidaError extends AplicacaoException {
    constructor(message) {
        super(message);
    }
}
exports.PoupancaInvalidaError = PoupancaInvalidaError;

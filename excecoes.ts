//questão 07
//AplicacaoError
class AplicacaoError extends Error {
    constructor(message: string) {
      super(message);
    }
  }
  
  //ContaInexistenteError
  class ContaInexistenteError extends AplicacaoError {
    constructor(message: string = 'Conta inexistente.') {
      super(message);
    }
  }
  
  //SaldoInsuficienteError
  class SaldoInsuficienteError extends AplicacaoError {
    constructor(message: string = 'Saldo insuficiente.') {
      super(message);
    }
  }


//questão 10
class AplicacaoException extends Error {
  constructor(message: string) {
      super(message);
  }
}

//questão 14
class ValorInvalidoError extends AplicacaoException {
  constructor(message: string = 'Valor inválido.') {
      super(message);
  }
}

//questão 12
class PoupancaInvalidaError extends AplicacaoException {
  constructor(message: string) {
      super(message);
  }
}

export{AplicacaoError, ContaInexistenteError, SaldoInsuficienteError, AplicacaoException, ValorInvalidoError, PoupancaInvalidaError}
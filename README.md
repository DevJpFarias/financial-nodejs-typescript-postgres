Iniciando o projeto
===========================

1. Instala as dependências = yarn 
2. Iniciar o container no docker = docker-compose up -d 
3. Rodar as migrations = yarn typeorm migration:run -d src/data-source.ts 
4. Rodar os testes = yarn test
5. Iniciar o servidor = yarn dev

Rotas
===========================

Users
---------------------------
1. Post (Create User)
  URl: http://localhost:4000/register
  Logged: false
  Parameters: {
    Body: {
      username: string
      password: string
    }
  }

2. Post (Login)
  URl: http://localhost:4000/login
    Logged: false
    Parameters: {
      Body: {
        username: string
        password: string
      }
    }

Accounts
---------------------------
1. Get (Get Balance)
  URl: http://localhost:4000/balance
  Logged: true
  Parameters: {
    Token: {
      userId: string
    }
  }

Transactions
---------------------------
1. Post (Transfer-CashOut)
  URl: http://localhost:4000/transfer
  Logged: true
  Parameters: {
    Token: {
      userId: string
    }
    Body: {
      username: string
      value: number
    }
  }

2. Get (Get Transactions)
  URl: http://localhost:4000/transactions
  Logged: true
  Parameters: {
    Token: {
      userId: string
    }
  }

3. Get (Get Transactions CashIn)
  URl: http://localhost:4000/transactions/cashIn
  Logged: true
  Parameters: {
    Token: {
      userId: string
    }
  }

4. Get (Get Transactions CashOut)
  URl: http://localhost:4000/transactions/cashOut
  Logged: true
  Parameters: {
    Token: {
      userId: string
    }
  }

5. Get (Get Transactions by Date)
  URl: http://localhost:4000/transactions/date/{date}
  Logged: true
  Parameters: {
    Token: {
      userId: string
    }
    Params: {
      date: {
        type: string,
        format: 'yyyy-mm-dd'
      }
    }
  }

6. Get (Get Transactions by Date and CashIn)
  URl:
  Logged: true
  Parameters: {
    Token: {
      userId: string
    }
    Params: {
      date: {
        type: string,
        format: 'yyyy-mm-dd'
      }
    }
  }

7. Get (Get Transactions by Date and CashOut)
  URl:
  Logged: true
  Parameters: {
    Token: {
      userId: string
    }
    Params: {
      date: {
        type: string,
        format: 'yyyy-mm-dd'
      }
    }
  }
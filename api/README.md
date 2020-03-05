API da aplicação de apropriação de horas

## Setup do ambiente de desenvolvimento

## Pré-requisitos
 - mysql
 - nodejs

## Instruções

1. Acesse o seu mysql local e crie um banco
2. A partir do arquivo `.env` crie o arquivo `env.development` incluindo as suas credenciais de acesso
3. Instale as dependências

```
npm install
```

4. Inclua dados definidos pelos arquivos em `/seed`
```
npm run seed
```

5. Inicie o ambiente. O comando também irá criar os modelos definido em `src/models/`
```
npm run dev
```

6. Com o browser acesse a base da api [localhost:5000/](http://localhost:5000/)
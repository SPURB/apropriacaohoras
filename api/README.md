API da aplicação de apropriação de horas

## Setup do ambiente de desenvolvimento

## Pré-requisitos
 - mysql
 - nodejs

## Instruções

1. Instale as dependências

```
npm install
```

2. A partir do arquivo `.env` crie o arquivo `.env.development` incluindo as suas credenciais de acesso ao banco de dados mysql

3. Crie o banco de dados
```
npm run db:create
```

4. Inicie o ambiente. O comando também irá criar os modelos definido em `src/models/`
```
npm run dev
```

5. Inclua dados definidos pelos arquivos em `/seed` para auxiliar no desenvolvimento. Abra uma nova janela do terminal e inicie o comando:
```
npm run db:seed
```

6. Acesse a base da api [localhost:5000/](http://localhost:5000/)

7. Mantenha a atualizada documentação com [postman](https://www.postman.com/) - `apropriacao-de-horas.postman_collection.json`

> veja a documentação do [sequelize](https://sequelize.org/master/manual/) para detalhamento do contexto e detalhamento do ORM utilizado.
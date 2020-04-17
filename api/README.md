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

2. A partir do arquivo `.env` crie o arquivo `.env.development` incluindo as suas credenciais de acesso ao seu banco de dados mysql. `.env.development`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=apropriacaohoras
```
3. Inicie o banco de dados. Este comando irá criar o banco, iniciar a migration e incluir dados no diretório `seeders/
```
npm run db:init
```

4. Inicie o ambiente de desenvolvimento da api. 
```
npm run dev
```

5. Acesse a base da api [localhost:5000/](http://localhost:5000/)

6. Mantenha a atualizada documentação com [postman](https://www.postman.com/) - `apropriacao-de-horas.postman_collection.json`

> veja a documentação do [sequelize](https://sequelize.org/master/manual/) para detalhamento do contexto e detalhamento do ORM utilizado.
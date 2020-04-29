API da aplicação de apropriação de horas

## Setup do ambiente de desenvolvimento

## Pré-requisitos
 - mysql
 - nodejs

## Instruções de setup

1. Instale as dependências

```
npm install
```

2. Ignore alterações no arquivo .env
```
git update-index --assume-unchanged .env
```

3. Altere o arquivo .env com as configurações de acesso ao banco mysql. Arquivo `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=apropriacaohoras
```

4. Inicie o banco de dados. Este comando irá criar o banco, iniciar a migration e incluir dados no diretório `seeders/`
```
npm run db:init
```

## desenvolvimento
1. Inicie o ambiente de desenvolvimento da api. 
```
npm run dev
```

2. Acesse a base da api [localhost:5000/](http://localhost:5000/)

Para reiniciar o servidor com alterações no model rode o comando  `npm run db:reset`.
> Antes de alterar o modelo atualize também os arquivos de `/migrations` e o `/seeders`

## produção
1. Compile o código
```
npm run build
```

2. Inicie a aplicação
```
npm run start
```

### documentação 
Mantenha a atualizada documentação com [postman](https://www.postman.com/) - `apropriacao-de-horas.postman_collection.json`

> veja a documentação do [sequelize](https://sequelize.org/master/manual/) para detalhamento do contexto e detalhamento do ORM utilizado.
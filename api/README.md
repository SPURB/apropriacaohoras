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
SERVICE_EMAIL=http://url/do/servico/de/envio/email
```

4. Inicie o banco de dados. Este comando irá criar o banco, iniciar a migration e incluir dados no diretório `seeders/`
```
npm run db:init
```

## Desenvolvimento
1. Inicie o ambiente de desenvolvimento da api. 
```
npm run dev
```

2. Acesse a base da api [localhost:5000/aproriacaohoras/api/0.0.1](http://localhost:5000/aproriacaohoras/api/0.0.1)

Para reiniciar o servidor com alterações no model rode o comando  `npm run db:reset`.
> Antes de alterar o modelo atualize também os arquivos de `/migrations` e o `/seeders`

## Produção
1. Compile o código
```
npm run build
```

2. Inicie a aplicação
```
npm run start
```

## Backup
Para fazer um backup do banco rode o comando abaixo
```
npm run db:dump
```
Este comando irá criar um arquivo comprimido do banco especificado em `.env` (equivalente ao comando [myslqldump](https://dev.mysql.com/doc/refman/5.7/en/mysqldump.html)):

<img src="https://user-images.githubusercontent.com/4117768/88560876-10978200-d005-11ea-8518-dbeb408ae657.gif" style="border: 1px solid grey">


___

**Ambiente de homologação da api**
Uma versão da API está publicada para desenvolvimento do frontend. As enpoints abaixo equivalem ao último commit das branches `master` ou `dev/api`.
```
https://apropriacaohoras.herokuapp.com/aproriacaohoras/api/0.0.1
https://apropriacaohoras.herokuapp.com/aproriacaohoras/api/0.0.1/horas
https://apropriacaohoras.herokuapp.com/aproriacaohoras/api/0.0.1/usuarios
https://apropriacaohoras.herokuapp.com/aproriacaohoras/api/0.0.1/projetos
https://apropriacaohoras.herokuapp.com/aproriacaohoras/api/0.0.1/fases
https://apropriacaohoras.herokuapp.com/aproriacaohoras/api/0.0.1/grupos
https://apropriacaohoras.herokuapp.com/aproriacaohoras/api/0.0.1/subatividades
https://apropriacaohoras.herokuapp.com/aproriacaohoras/api/0.0.1/usuarios-projetos
```
___

### Documentação
Mantenha a atualizada documentação com [postman](https://www.postman.com/) - `apropriacao-de-horas.postman_collection.json`

> veja a documentação do [sequelize](https://sequelize.org/master/manual/) para detalhamento do contexto e detalhamento do ORM utilizado.
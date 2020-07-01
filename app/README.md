```sh
# instalar dependencias
npm i

# desevolver o app usando a api de homologação rodando no heroku
npm run dev

# desenvolver com api local (veja as instruções para iniciar a api localmente api/README.md)
npm run dev:local
```

### testes

pode-se rodar os testes de duas formas: 
1. Com api local (melhor)

```sh
# cria build com requisições apontando para localhost:5000 (veja as instruções para iniciar a api localmente api/README.md)
npm run build:local

# inicia app e testes e2e
npm run test:e2e

```

2. Com api de Homologação
```sh
# cria build com requisições apontando para heroku
npm run build:homolog

# inicia app e testes e2e
npm run test:e2e
```

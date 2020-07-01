# Apropriação de horas [![Build Status](https://travis-ci.org/SPURB/apropriacaohoras.svg?branch=master)](https://travis-ci.org/SPURB/apropriacaohoras)
Sistema de apropriação de horas trabalhadas, gerenciamento de pessoal e relatoria de trabalho da SP Urbanismo.

## pré-requisitos para desenvolvimento
 - mysql
 - node^12

### api
Veja as instruções completas para desenvolvimento do backend no [api/README](api/README.md).
```
cd api
npm i
npm run dev
```

### app
Veja as instruções completas para desenvolvimento do frontend no [app/README](app/README.md).
```
cd app
npm i
npm run dev
```


### testes
1. Rode localmente a api
```
cd api
npm run dev
```

2. Crie um build do app usando a api local
```
cd app
npm run build:local
```

3. Rode os testes e2e do app
```
npm run test:e2e
```


### ci

1. :fire: **Importante** 
Se o seu ambiente é windows, altere a configuração padrão de ignorar caixas (padrão do windows) para evitar conflitos no build no travis-ci (ubuntu/xenial). No seu git bash:
```
git config core.ignorecase false
```

2. Valide `.travis.yml` antes de commitar
```bash
# Instale o ci do travis
gem install travis --no-rdoc --no-ri

# valide o arquivo de configuração deste diretório
travis lint ./.travis.yml
```

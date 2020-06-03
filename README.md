# Apropriação de horas [![Build Status](https://travis-ci.org/SPURB/apropriacaohoras.svg?branch=master)](https://travis-ci.org/SPURB/apropriacaohoras)
Sistema de apropriação de horas trabalhadas, gerenciamento de pessoal e relatoria de trabalho da SP Urbanismo.

### testes
Antes de fazer a pull request rode os testes

```bash
$ bash tests.sh
```

### api
Veja as instruções para desenvolvimento do backend no [api/README](api/README.md).
```
cd api
```
___

**Ambiente de homologação da api**
Uma versão da API está publicada para desenvolvimento do frontend. As enpoints abaixo equivalem ao último commit das branches `master` ou `staging/api`.
```
https://apropriacaohoras.herokuapp.com/
https://apropriacaohoras.herokuapp.com/horas
https://apropriacaohoras.herokuapp.com/usuarios
https://apropriacaohoras.herokuapp.com/projetos
https://apropriacaohoras.herokuapp.com/fases
https://apropriacaohoras.herokuapp.com/subatividades
https://apropriacaohoras.herokuapp.com/usuarios-projetos
```

___
### app
Veja as instruções para desenvolvimento do frontend no [app/README](app/README.md).
```
cd app
```

___
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
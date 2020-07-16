---
title: Objetivos
---

# Objetivos
 - Criar uma ferramenta de gestão de projetos, equipes e custos
 - Sistematizar a expertise da empresa em banco de dados
 - Criar base de dados para precificação dos projetos
 - Promover melhoria na gestão do tempo e equipes
 - Garantir aos colaboradores ferramenta pessoal de controle de horas dedicadas aos projetos

## Metodologia
 - [x] Diálogo com os colaboradores da GPU (Gerência de Projetos Urbanos) sobre os requisitos de uma plataforma para apropriação de horas
 - [x] Monitoramento piloto através de atualização mensal dos colaboradores em uma planilha<sup>1</sup>
 - [x] Desenho da arquitetura do sistema
 - [x] Lançamento aplicação versão beta com grupo de controle (_estamos aqui_)<i class="icon icon-aceitar"></i>
 - [ ] Expansão da aplicação para os demais deparamentos (GPU, GEP, GDP, GGP, GJU)

<h3 class="section-border">Como isso é feito hoje</h3>

Foi feito uma planilha com uma relação de horas trabalhadas em cada projeto. <br>A partir dela possível fazer uma estimativa do custo de cada projeto.

<figure>
    <img src="https://user-images.githubusercontent.com/4117768/87574250-81a17600-c6a4-11ea-9e7d-88121263f8b4.png">
    <figcaption>1. Planilha disponível na intranet da São Paulo Urbanismo: \\spurbsp01\gestao_projetos\Projetos\00_Portfolio_Projetos_Gestao_2017-2020\2020\6_Apropriacao_Horas</figcaption>
</figure>

### Problemas que a planilha resolve
 - Cria um levantamento de horas trabalhadas
 - Permite fazer uma estimativa do custo de cada projeto

<div class='danger'>
  <h3>Problemas que planilha não resolve</h3>
  <ul>
    <li>Os dados obtidos são pouco detalhados</li>
    <li>Não é possível separar horas por fases e subatividades</li>
    <li>A geração de relatórios é feito a partir de extração manual dos dados que pode ocasionar erros e imprecisões</li>
    <li>Não há controle de acessos</li>
    <li>Não é possível fazer atualizações simultâneas</li>
  </ul>
</div>

Aplicação se divide em quatro partes _autenticação_, _registro_, _gerenciamento_ e _relatórios_. Cada uma delas resolve os problemas levantados não resolvidos pela planilha.

<h3 class="section-border">Autenticação</h3>

_Quais problemas isso resolve?_

 - Não há controle de acessos
 - Não é possível fazer atualizações simultâneas

_Como resolve?_

Com um sistema de autenticação podemos associar os inputs de horas ao colaborador. A publicação em uma página web permite a inclusão simultânea dos dados.

<figure>
  <img src="https://user-images.githubusercontent.com/4117768/87709108-26da4e00-c77a-11ea-8155-1d2ba2519b83.gif">
  <figcaption>Acessando o sistema</figcaption>
</figure>


<h3 class="section-border">Registro</h3>

_Quais problemas isso resolve?_

 - Os dados obtidos são pouco detalhados
 - Não é possível separar horas por fases e subatividades


_Como resolve?_<br>
Com um formulário web no qual o colaborador _necessariamente_ atribui uma fase e subatividade de um projeto com rapidez e praticidade.

<figure>
  <img src="https://user-images.githubusercontent.com/4117768/87710310-fc899000-c77b-11ea-933e-3c9517e91a9b.gif">
  <figcaption>Inclusão de horas do formulário de registro</figcaption>
</figure>


<figure>
    <img src="https://user-images.githubusercontent.com/4117768/87710726-83d70380-c77c-11ea-8950-cd9de84553f8.gif">
    <figcaption>Na interação acima o fomulário traz uma visualização automática do projeto ao selecionar o dia para inclusão da hora trabalhada.
</figcaption>
</figure>

<h3 class="section-border">Gerenciamento</h3>

_Quais problemas isso resolve?_
 - Os dados hoje obtidos são pouco detalhados. Não é possível separar horas por fases e subatividades

_Como resolve?_<br>
O gerente de projeto tem acesso a um formulário para criar, alterar e deletar as atividades das equipes.
<template>
  <div class="card__projeto" :class="classPerfil">
    <section class="card__header">
      <h2>{{ projeto.nome }}</h2>
    </section>
    <section class="card__body">
      <div class="card__element" v-if="!isPerfil">
        <i class="icon icon-tempo"></i>
        <div class="text">
          <p class="subtitle__element tempo">{{ projeto.desdeInicio }}</p>
          <p class="message__element">horas trabalhadas desde o início</p>
        </div>
      </div>

      <div class="card__element" v-if="!isPerfil">
        <i class="icon icon-seta_esquerda"></i>
        <div class="text">
          <p class="subtitle__element">{{ projeto.ultimoMes }}</p>
          <p class="message__element">horas trabalhadas no último mês</p>
        </div>
      </div>

      <div class="card__element" v-if="!isPerfil">
        <i class="icon icon-pessoa-outline"></i>
        <div class="text">
          <p class="subtitle__element">{{ projeto.minhasHoras }}</p>
          <p class="message__element">
            horas trabalhadas só por você desde o início
          </p>
        </div>
      </div>

      <div class="card__element" v-if="isPerfil">
        <i class="icon icon-pessoa-outline"></i>
        <div class="text">
          <p class="subtitle__element">
            {{ projeto.minhasHoras }} <span>horas</span>
          </p>
        </div>
      </div>

      <div class="card__element" v-if="isPerfil">
        <i class="icon icon-lista"></i>
        <div class="text">
          <p class="subtitle__element">
            {{ projeto.minhasHoras }} <span>registros</span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    isPerfil: {
      type: Boolean,
      required: true,
      default: false
    },
    projeto: {
      type: Object,
      required: true
    }
  },
  computed: {
    classPerfil () {
      if (this.isPerfil) return 'isPerfil'
    }
  }
}
</script>

<style lang="scss" scoped>
.isPerfil {
  margin: 15px;
  width: auto !important;
  height: 200px !important;

  .card__element > .text > .subtitle__element span {
    opacity: 0.4;
    font-size: 13pt;
  }
  .card__header {
    height: 40% !important;
  }
  .card__body {
    height: 60% !important;
  }
  .card__element {
    .icon {
      align-self: flex-start;
    }
    .text {
      align-self: flex-end;
    }
  }
}

.card__projeto {
  background-color: $verde;
  border-radius: 7px;
  box-shadow: $s-4-8-24;
  color: #fff;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
  &:first-child {
    margin-left: 3rem;
  }

  .card__header {
    align-items: flex-end;
    display: flex;
    height: 30%;
    width: 100%;

    h2 {
      margin: 7px;
      font-size: 15pt;
      max-width: 100%;
    }
  }

  .card__body {
    background-color: #fff;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    justify-self: flex-end;
    height: 70%;
    width: 100%;
    padding: 10px;

    .card__element {
      color: $preto;
      display: flex;
      max-height: 100%;
      max-width: 100%;

      .icon {
        color: $verde-claro;
        font-size: 1.7rem;
        margin-top: 7px;
      }

      p {
        margin: 2px;
      }

      p.subtitle__element {
        font-weight: bold;
        font-size: 16pt;

        &.tempo {
          font-size: 20pt;
        }
      }

      p.message__element {
        font-size: 10pt;
        opacity: 0.5;
      }
    }
  }
}
</style>

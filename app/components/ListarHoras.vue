<template>
  <div class="show-horas">
    <section class="grupo__barra horas">
      <div class="data">{{ formateDate }}</div>
      <div
        class="bar bar__horas"
        @click="showPH = !showPH"
        :style="{
          width: customWidths(1, totalHoras),
          backgroundColor: backgrounds(registro.res.type)
        }"
        :class="showPH ? 'auto__larg' : `forced__height`"
      >
        <transition-group
          v-if="showPH"
          tag="ul"
          class="show-horas__projetos"
          name="show-horas__projetos"
        >
          <li
            class="show-horas__projetos-item"
            :key="`projeto-${index}`"
            v-for="(projeto, index) in projetosHoras"
          >
            {{ projeto.nome }}
          </li>
        </transition-group>
      </div>

      <router-link
        v-if="showPH && routeHidden"
        class="btn__editar"
        tag="div"
        :to="`/editar?data=${this.registro.data}`"
      >
        <i class="icon icon-editar"></i>
      </router-link>
      <div></div>
      <div class="hora">{{ totalHoras }}h</div>
    </section>

    <section class="grupo__barra extras" v-if="totalExtras > 0">
      <div
        class="bar bar__extras"
        @click="showPE = !showPE"
        :class="showPE ? 'auto__larg' : 'forced__height'"
      >
        <ul v-if="showPE">
          <li
            :key="`projeto-${index}`"
            v-for="(projeto, index) in projetosExtras"
          >
            {{ projeto.nome }}
          </li>
        </ul>
      </div>
      <div class="hora">
        {{ totalExtras }}
      </div>
    </section>
  </div>
</template>

<script>
import Lib from '~/libs/'
export default {
  name: 'ListarHoras',
  props: {
    registro: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showPH: false, // Prop que cuida do show dos projetos com horas
      showPE: false, // Prop que cuida do show dos projetos com horas extras
      valuesDate: []
    }
  },
  computed: {
    formateDate () {
      const date = Lib.splitDate(this.registro.data)
      return `${date.sDay}/${date.sMonth}`
    },
    totalHoras () {
      return this.registro.res.horas.total
    },
    totalExtras () {
      return this.registro.res.extras.total
    },
    projetosHoras () {
      return this.registro.res.horas.projetos
    },
    projetosExtras () {
      return this.registro.res.extras.projetos
    },
    routeHidden () {
      const route = this.$route.path
      if (route !== '/registrar') return false
      return true
    }
  },
  methods: {
    customWidths (etapa, horas) {
      if (etapa === 1) {
        switch (horas) {
          case 1:
            return '15%'
          case 2:
            return '25%'
          case 3:
            return '37.5%'
          case 4:
            return '50%'
          case 5:
            return '62.2%'
          case 6:
            return '75%'
          case 7:
            return '87.5%'
          case 8:
            return '100%'
        }
      } else {
        switch (horas) {
          case 1:
            return '25%'
          case 2:
            return '50%'
          case 3:
            return '75%'
          case 4:
            return '100%'
        }
      }
    },
    backgrounds (classe) {
      switch (classe) {
        case 'warning':
          return '#FFAE4D'
          break
        case 'success':
          return '#008375'
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.show-horas {
  display: flex;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  &__projetos-item {
    opacity: 0;
    transition: opacity 0.3s ease-in;
    transition-delay: 0.5s;
  }
  .grupo__barra {
    display: flex;
    align-items: center;
    width: 100%;

    &.horas {
      width: 70%;
    }
    &.extras {
      width: 30%;
    }

    .bar {
      margin-left: 10px;
      cursor: pointer;

      ul {
        padding-left: 10px;
        list-style-type: none;
      }

      &__extras {
        content: '';
        margin-left: 50px;
        width: 100%;
        background-color: $verde-claro;
      }
    }

    .hora {
      margin-left: 10px;
    }
    .btn__editar {
      align-items: center;
      background-color: #ff9a20;
      display: flex;
      justify-content: center;
      height: 100%;
      width: 30px;

      .icon {
        font-size: 1.5rem;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.forced__height {
  height: 15px;
  transition: all 0.3s ease-in;
  transform-origin: bottom;
}

.auto__larg {
  height: 50x;
  padding-right: 15px;
  transition: all 0.3s ease-out;
  transform-origin: top;
  .show-horas__projetos-item {
    opacity: 1;
  }
}
</style>

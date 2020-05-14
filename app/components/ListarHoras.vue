<template>
  <div class="show__horas">
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
        <ul v-if="showPH">
          <li
            :key="`projeto-${index}`"
            v-for="(projeto, index) in projetosHoras"
          >
            {{ projeto.nome }}
          </li>
        </ul>
      </div>

      <div class="hora">
        {{ totalHoras }}
      </div>
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
.show__horas {
  display: flex;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;

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
      margin: 0px 10px;
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
  }
}

.forced__height {
  height: 15px !important;
  transition: transform 0.3s ease-in; // note that we're transitioning transform, not height!
  transform-origin: bottom;
  transform: scaleY(1); // *squish*
}

.auto__larg {
  height: auto !important;
  padding-right: 15px;
  transition: transform 0.3s ease-out; // note that we're transitioning transform, not height!
  transform-origin: top;
  transform: scaleY(1.2); // implicit, but good to specify explicitly
}
</style>

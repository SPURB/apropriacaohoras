<template>
  <div class="show__horas">
    <section class="grupo__barra horas">
      <div class="data">03/12</div>
      <div
        class="bar bar__horas"
        @click="showPH = !showPH"
        :class="showPH ? 'auto__height' : 'forced__height'"
      >
        <ul v-if="showPH">
          <li>PIU Anhembi</li>
          <li>PIU Anhembi</li>
          <li>PIU Anhembi</li>
        </ul>
      </div>

      <div class="hora">
        8h
      </div>
    </section>

    <section class="grupo__barra extras">
      <div
        class="bar bar__extras"
        @click="showPE = !showPE"
        :class="showPE ? 'auto__height' : 'forced__height'"
      >
        <ul v-if="showPE">
          <li>PIU Anhembi</li>
          <li>PIU Anhembi</li>
          <li>PIU Anhembi</li>
        </ul>
      </div>
      <div class="hora">
        4h
      </div>
    </section>
  </div>
</template>

<script>
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
    align-items: flex-end;
    width: 100%;

    &.horas {
      width: 70%;
    }
    &.extras {
      width: 30%;
    }

    .data {
      align-self: flex-start;
    }
    .bar {
      margin: 0px 10px;
      cursor: pointer;

      &__horas {
        content: '&nbsp;';
        width: 100%;
        background-color: $laranja;
      }

      &__extras {
        content: '&nbsp;';
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

.auto__height {
  height: auto !important;
  transition: transform 0.3s ease-out; // note that we're transitioning transform, not height!
  transform-origin: top;
  transform: scaleY(1.2); // implicit, but good to specify explicitly
}
</style>

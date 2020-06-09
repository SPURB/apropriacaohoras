<template>
  <fieldset class="time-input">
    <label for="horas">{{ titulo }}</label>
    <div class="time-input__main">
      <button :disabled="value == 1" type="button" @click="denc">-</button>
      <input
        :value="value"
        class="input-horas"
        type="number"
        min="1"
        max="12"
        ref="hours"
      />
      <button :disabled="value == 12" type="button" @click="inc">+</button>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'TimeInput',
  data () {
    return {
      value: 0
    }
  },
  props: {
    titulo: {
      type: String,
      required: true
    },
    valueInit: {
      type: Number,
      required: true
    }
  },
  mounted () {
    this.value = this.valueInit
  },
  methods: {
    inc () {
      this.value = this.value + 1
      this.$emit('timeInput', this.value)
    },
    denc () {
      this.value = this.value - 1
      this.$emit('timeInput', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.time-input {
  padding: 0;
  border: 0;

  label {
    display: block;
    @include color-white-alpha(0.4);
    font-size: 0.75rem;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  &__main {
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 50px;
    padding: 8px;

    button {
      background-color: #008375;
      border: none;
      border: 2px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.48);
      cursor: pointer;
      color: inherit;
      font-size: 15pt;
      width: 30px;

      &:first-child {
        border-radius: 1.5rem 0 0 1.5rem;
        left: 0.5rem;
      }
      &:last-child {
        right: 0.5rem;
        border-radius: 0 1.5rem 1.5rem 0;
      }
    }

    input[type='number'] {
      background-color: transparent;
      border: none;
      color: inherit;
      font-family: inherit;
      font-size: 1.5rem;
      text-align: center;
      -moz-appearance: textfield;
      caret-color: transparent;
      padding: 0;
      margin: 0;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
</style>

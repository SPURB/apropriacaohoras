<template>
  <fieldset>
    <label>{{ title }}</label>
    <input type="date" v-model="value" class="relatorio-detalhado__date" />
  </fieldset>
</template>

<script>
export default {
  name: 'InputDate',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      value: ''
    }
  },
  watch: {
    value () {
      this.$emit('date', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset {
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

  input {
    background-color: rgba(255, 255, 255, 0.08);
    border: none;
    border-radius: 24px;
    align-self: flex-end;
    cursor: pointer;
    margin-left: 7px;
    color: #fff;
    height: 3rem;
    padding: 5px;

    &::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  }

  @media (max-width: 874px) {
    margin-top: 10px;
    input {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="select-options">
    <button
      class="select-options__toggler"
      :class="[typeBackground, typeDisabled]"
      @click.prevent="open = !open"
      data-cy="btn__options"
      :disabled="disabled"
    >
      <div>{{ selected }}</div>
      <i class="icon icon-expandir" :class="{ open }"></i>
    </button>
    <transition name="fade">
      <ul class="select-options__select" v-show="open">
        <li
          class="select-options__options"
          v-for="(option, index) in options"
          :value="option.value"
          :key="index"
        >
          <button
            @click.prevent="setSelectedValue(option)"
            data-cy="select__option"
          >
            {{ option.title }}
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'InputOptions',
  data () {
    return {
      open: false,
      selected: ''
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    type: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    typeBackground () {
      if (!this.type) {
        return 'default'
      } else {
        return 'forms'
      }
    },
    typeDisabled () {
      if (!this.disabled) {
        return ''
      } else {
        this.selected = this.options[0].title
        return 'disabled'
      }
    }
  },
  created () {
    this.selected = this.options[0].title
  },
  methods: {
    setSelectedValue (option) {
      this.selected = option.title
      this.open = false
      this.$emit('setOptionValue', option.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.select-options {
  &__select {
    list-style-type: none;
    margin: 0 0 2rem 0;
    padding: 0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
    li:first-child {
      display: none;
    }
  }

  button {
    height: 48px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    border: 0;
    font-family: $grot;
    font-size: 1rem;
    padding-left: 1.75rem;
    transition: background-color ease-in-out 0.35s;

    &.default {
      background-color: rgba(255, 255, 255, 0.05);
      color: #fff;
      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }
    }

    &.disabled {
      cursor: not-allowed;
      background-color: #ccc;

      &:hover {
        background-color: #ccc;
      }
    }

    &.forms {
      background-color: rgba(0, 0, 0, 0.08);
      color: #000;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    &:focus {
      outline: none;
    }
  }

  &__toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 20px;
    margin-bottom: 10px;
    .icon {
      font-size: 40px;
      transition: transform ease-in-out 0.15s;
      &.open {
        transform: rotate(180deg);
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div>
    <div class="select-box">
      <div class="select-box__current" tabindex="1">
        <div
          v-for="(option, index) in options"
          class="select-box__value"
          :key="index"
        >
          <input
            class="select-box__input"
            type="radio"
            :id="index"
            :value="option.value"
            name="Ben"
            checked="checked"
          />
          <p class="select-box__input-text">{{ option.title }}</p>
        </div>
        <svg
          class="select-box__icon"
          fill="#fff"
          x="0px"
          y="0px"
          viewBox="0 0 1000 1000"
          enable-background="new 0 0 1000 1000"
          xml:space="preserve"
        >
          <g>
            <path
              d="M500,775.4L10,287.2l64.4-62.6L500,650.2l425.6-425.6l64.4,62.6L500,775.4z"
            />
          </g>
        </svg>
      </div>
      <ul class="select-box__list">
        <li v-for="(option, index) in options" :key="index">
          <label
            class="select-box__option"
            :for="index"
            aria-hidden="aria-hidden"
            @click="setSelectedValue(option.value)"
            >{{ option.value }}</label
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputOptions',
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    setSelectedValue (value) {
      this.$emit('setOptionValue', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  color: #fff;
  position: relative;
  display: block;
  font-family: $grot;
  background-color: rgba(255, 255, 255, 0.08);
  padding: 0 0.75rem;
  margin-top: 8px;
  height: 3rem;
  border-radius: 24px;

  &__current {
    position: relative;
    box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
    cursor: pointer;
    outline: none;

    &:focus {
      & + .select-box__list {
        opacity: 1;
        animation-name: none;

        .select-box__option {
          cursor: pointer;
        }
      }

      .select-box__icon {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    width: 22px;
    transition: 0.2s ease;
  }

  &__value {
    display: flex;
  }

  &__input {
    display: none;

    &:checked + .select-box__input-text {
      display: block;
      margin-right: 2rem;
    }
  }

  &__input-text {
    display: none;
    width: 100%;
    margin: 0;
    padding: 15px;
  }

  &__list {
    position: absolute;
    width: 100%;
    padding: 0;
    list-style: none;
    opacity: 0;

    animation-name: HideList;
    animation-duration: 0.5s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: step-start;
    box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.3);
  }

  &__option {
    display: block;
    padding: 15px;

    &:hover,
    &:focus {
      color: #546c84;
    }
  }
}

@keyframes HideList {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0);
  }
}
</style>

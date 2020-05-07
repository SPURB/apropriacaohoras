<template>
  <router-link tag="a" :to="to" class="card-horizontal">
    <h3 class="card-horizontal__title">{{ title }}</h3>
    <p class="card-horizontal__subtitle" v-if="subtitle">
      <i v-if="subtitleIconClass" :class="subtitleIconClass"></i>
      {{ subtitle }}
    </p>
  </router-link>
</template>
<script>
export default {
  name: 'CardRouter',
  props: {
    to: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    subtitleIconClass: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.card-horizontal {
  width: 100%;
  margin: 0;
  flex-direction: column;
  height: max-content;
  background: #fff;
  display: flex;
  border-radius: 12px;
  padding: 1.25rem 1.25rem 1.25rem 1rem;
  font-family: $grot;
  text-decoration: none;
  line-height: 2;
  border-left: $verde solid 12px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
  transition: all ease-in-out 0.35s;
  &__title,
  &__subtitle {
    margin: 0;
  }
  &__title {
    color: $preto;
    font-weight: 700;
    padding-left: 0.42rem;
  }
  &__subtitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: $cinza1;
    .icon {
      color: $verde;
      font-size: 26px;
    }
  }
  &:hover {
    box-shadow: 1px 5px 9px rgba(0, 0, 0, 0.48);
    transform: translate(1px, -1px);
  }
}
</style>

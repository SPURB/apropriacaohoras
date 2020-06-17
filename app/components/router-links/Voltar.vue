<template>
  <router-link class="voltar" tag="button" :to="to">
    <i class="icon icon-abrir_esquerda"></i>
    Voltar
  </router-link>
</template>
<script>
export default {
  name: 'Voltar',
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.voltar {
  display: flex;
  align-items: center;
  text-align: left;
  font-family: $grot;
  color: #fff;
  font-size: 1rem;
  border: 0;
  height: 55px;
  background-color: $verde;
  transition: background-color 0.2s ease-in-out;
  &.voltar > i {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    margin-left: 0.1rem;
  }
  &:hover {
    cursor: pointer;
    background-color: #00a896;
  }
}
</style>

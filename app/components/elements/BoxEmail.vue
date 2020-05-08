<template>
  <p class="message">
    {{ titulo }}
    <br />
    <a
      class="message__action"
      :href="`https://correioweb.prefeitura.sp.gov.br/exchange/${email}`"
    >
      {{ email }}
    </a>
  </p>
</template>

<script>
export default {
  name: 'BoxEmail',
  props: {
    email: {
      type: String,
      require: true
    },
    titulo: {
      type: String,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  line-height: 2;
  &__action {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.04);
    padding: 0.2rem 0.7rem;
    transition: all ease-in-out 0.15s;
  }
  &__action:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
  @media (max-width: $phone) {
    font-size: small;
  }
}
</style>

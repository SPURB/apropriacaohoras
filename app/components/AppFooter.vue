<template>
  <footer>
    <div>
      <span>Dúvidas e sugestões</span> &middot; Ramal 7533 &middot;
      desenvolvimento@spurbanismo.prefeitura.sp.gov.br
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss">
footer {
  background-color: $verde;
  color: #fff;
  padding: 2.5rem 0;
  margin: 6rem 0 0;
  line-height: 1.4;
  div {
    max-width: $desktop;
    margin: 0 auto;
    span {
      font-weight: bold;
    }
  }
  @media (max-width: $desktop) {
    padding-right: 1rem;
    padding-left: 1rem;
  }
  @media (max-width: $tablet) {
    font-size: small;
  }
}
</style>

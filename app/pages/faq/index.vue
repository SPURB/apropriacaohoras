<template>
  <div class="faq-index">
    <h1 class="faq-index__title">Perguntas frequentes</h1>
    <p>Qual a sua dúvida?</p>
    <ul class="faq-index__cards">
      <li v-for="({ to, title, subtitle }, index) in doubts" :key="index">
        <card-horizontal :to="to" :title="title" :subtitle="subtitle" />
      </li>
    </ul>
    <h3 class="faq-index__title">Não encontrou o que precisava?</h3>
    <p>
      Ajude-nos a melhorar a plataforma descrevendo um bug ou propondo melhorias
      preenchendo
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSeH408T9GgqKn1Yft31KfQGZqBEdxezZwF9Pbj7jaLyphexcg/viewform?usp=sf_link"
        target="_blank"
        >este formulário</a
      >. Ou entre contato com a sua dúvida em
      <a
        href="mailto:desenvolvimento@spurbanismo.prefeitura.sp.gov.br?subject=Apropriacao%20de%20horas"
        >desenvolvimento@spurbanismo.prefeitura.sp.gov.br</a
      >
    </p>
  </div>
</template>
<script>
import CardHorizontal from '~/components/router-links/CardHorizontal'

export default {
  name: 'FaqIndex',
  layout: 'faq',
  components: {
    CardHorizontal
  },
  async asyncData ({ $content }) {
    const { doubts } = await $content('/faq/index').fetch()
    return {
      doubts
    }
  }
}
</script>
<style lang="scss" scoped>
.faq-index {
  max-width: $desktop;
  margin: auto;
  &__cards {
    text-decoration: none;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  h3 {
    margin-top: 3rem;
  }
  li {
    margin-bottom: 1rem;
  }
  a {
    color: white;
  }
}
</style>

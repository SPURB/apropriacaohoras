<template>
  <div class="faq-content">
    <nuxt-content :document="page"></nuxt-content>
  </div>
</template>
<script>
export default {
  name: 'FaqContent',
  layout: 'faq',
  async asyncData ({ $content, params }) {
    const { content } = params
    const page = await $content(`/faq/${content}`).fetch()
    return {
      page
    }
  }
}
</script>
<style lang="scss">
.faq-content {
  padding-bottom: 10rem;
  .danger {
    border-top: 3px solid $vermelho;
    border-bottom: 3px solid $vermelho;
    margin-top: 2rem;
    padding: 1.5rem 0;
    h3 {
      padding: 0 0 0.5rem;
    }
  }
  max-width: $desktop;
  margin: 3rem auto 0;
  p,
  h1,
  h2,
  h3,
  ul {
    max-width: 750px;
    margin: auto;
    font-family: $grot;
    line-height: 1.62;
  }
  h2,
  h3,
  h4 {
    padding: 2rem 0 0.25rem;
  }
  h1 {
    padding: 0 0 1.5rem 0;
  }
  h3 {
    font-size: 1.3rem;
  }
  p,
  ul {
    margin-bottom: 1rem;
    font-size: 19px;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
  ul {
    padding: 0;
    list-style-type: square;
  }
  li {
    margin-bottom: 0.5rem;
  }
  img {
    max-width: 100%;
  }
  figcaption {
    font-style: italic;
    font-size: small;
    padding: 0.5rem 0;
  }
}
</style>

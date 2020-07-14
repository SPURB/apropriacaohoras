<template>
  <div class="faq-content">
    <nuxt-content :document="page" />
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
<style lang="scss" scoped>
.faq-content {
  max-width: $desktop;
  margin: 3rem auto 0;
}
</style>

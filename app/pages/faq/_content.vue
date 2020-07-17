<template>
  <div class="faq-content">
    <nuxt-content :document="page"></nuxt-content>
  </div>
</template>
<script>
import { get } from 'axios'
export default {
  name: 'FaqContent',
  layout: 'faq',
  data () {
    return {
      page: {}
    }
  },
  async fetch () {
    const { content } = this.$route.params
    this.page = await this.$content(`/faq/${content}`).fetch()
  },
  created () {
    process.env.NODE_ENV === 'development'
      ? this.$fetch()
      : this.fetchLocalPage()
  },
  methods: {
    async fetchLocalPage () {
      const { content } = this.$route.params
      try {
        const { data } = await get(
          `${process.env.appBase}_nuxt/content/db.json`
        )
        const { _data } = data._collections[0]
        this.page = _data.find(item => item.slug === content)
      } catch (err) {
        throw new Error(err) // https://github.com/nuxt/content/issues?q=is%3Aissue+static
      }
    }
  }
}
</script>
<style lang="scss">
.faq-content {
  padding-bottom: 10rem;
  .danger {
    border-left: 5px solid $vermelho;
    background-color: $cinza1;
    border-radius: 8px;
    margin: 2rem 0;
    padding: 1.5rem 0;
    h3 {
      padding: 0 0 0.5rem;
    }
    @media (max-width: $tablet) {
      padding: 2rem 3rem;
    }
  }
  .task-list-item {
    list-style: none;
    input {
      margin-left: -1rem;
    }
  }
  .section-border {
    margin-top: 5rem;
    padding-top: 2rem;
    border-top: solid 5px white;
  }
  .admin-list {
    ul {
      font-family: $grot;
      font-size: small;
      padding: 1rem 0 1rem 2rem;
      background-color: $cinza1;
      border-radius: 8px;
    }
  }
  max-width: $desktop;
  margin: 3rem auto 0;
  p,
  h1,
  h2,
  h3,
  h4,
  ul {
    max-width: 680px;
    margin: auto;
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
    font-size: 18px;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
  ul {
    padding: 0;
    list-style-type: square;
  }
  li {
    margin-bottom: 0.5rem;
  }
  a {
    color: white;
  }
  img {
    max-width: 100%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
  }
  figure {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  figcaption {
    font-style: italic;
    font-size: small;
    padding: 0.5rem 0;
  }
}
</style>

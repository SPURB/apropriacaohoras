<template>
  <div class="pagination">
    <button
      type="button"
      class="pagination__button"
      :key="page"
      @click="pageGo(page - 1, $event)"
      v-for="page in pageCount"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageCount: {
      type: Number,
      required: true
    }
  },
  methods: {
    removeActive (classe) {
      let els = document.querySelectorAll(`.${classe}`)
      els.forEach(el =>
        el.classList.contains(classe) ? el.classList.remove(classe) : false
      )
    },
    pageGo (val, el) {
      this.removeActive('active__page')
      el.target.classList.add('active__page')
      this.$emit('pageNumber', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  padding: 15px;
  display: inline;

  &__button {
    border: none;
    border: 1px solid #fff;
    background-color: transparent;
    border-radius: 100%;
    color: #fff;
    margin: 7px;
    width: 40px;
    height: 40px;

    &:hover {
      background-color: #fff;
      border-color: $verde-claro;
      color: $verde;
      cursor: pointer;
    }
    &.active__page {
      background-color: #fff;
      border-color: $verde-claro;
      color: $verde;
    }
  }
}
</style>

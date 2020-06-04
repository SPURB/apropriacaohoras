<template>
  <table class="tabela__projeto">
    <thead class="tabela__header">
      <tr>
        <th
          :key="index"
          v-for="(th, index) in thead"
          class="tabela__celula forced-color icon"
          @click="activeOrder(th.nameOrder, $event)"
        >
          {{ th.titulo }}
        </th>
      </tr>
    </thead>
    <tbody class="tabela__body">
      <tr
        :key="index"
        class="tabela__linha"
        :class="classLinha(index)"
        v-for="(projeto, index) in paginatedData"
      >
        <td class="tabela__celula">
          {{ projeto.nome }}
        </td>
        <td class="tabela__celula">
          {{ projeto.registros }}
        </td>
        <td class="tabela__celula">
          {{ projeto.fase }}
        </td>
        <td class="tabela__celula">
          {{ projeto.subatividade }}
        </td>
      </tr>
    </tbody>
    <tfoot class="pagination">
      <button
        type="button"
        class="pagination__button"
        :key="page"
        @click="pageGo(page - 1, $event)"
        v-for="page in pageCount"
      >
        {{ page }}
      </button>
    </tfoot>
  </table>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'TabelaUsuariosProjetos',
  data () {
    return {
      pageNumber: 0
    }
  },
  props: {
    projetos: {
      type: Array,
      required: true
    },
    thead: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 9
    }
  },
  computed: {
    pageCount () {
      let l = this.projetos.length,
        s = this.size
      return Math.ceil(l / s)
    },
    paginatedData () {
      const start = this.pageNumber * this.size,
        end = start + this.size
      return this.projetos.slice(start, end)
    }
  },
  methods: {
    ...mapActions('relatorios', ['orderBy']),
    removeActive (classe) {
      let els = document.querySelectorAll(`.${classe}`)
      els.forEach(el =>
        el.classList.contains(classe) ? el.classList.remove(classe) : false
      )
    },
    activeOrder (val, el) {
      this.removeActive('active__order')
      el.target.classList.add('active__order')
      this.orderBy(val)
    },
    pageGo (val, el) {
      this.removeActive('active__page')
      el.target.classList.add('active__page')
      this.pageNumber = val
    },
    classLinha (val) {
      return val % 2 === 0 ? 'linha__clara' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.tabela__projeto {
  width: 100%;
  color: #fff !important;
  border-collapse: collapse !important;

  .icon-tempo {
    font-size: 1.3rem;
  }

  .tabela__header {
    margin: 30px 0px;
    text-transform: uppercase;
    tr,
    th {
      text-align: left;
    }
    th {
      padding: 5px;
      cursor: pointer;
    }

    th::after {
      content: '\f12a';
      display: inline-block;
      font-size: 15px;
    }

    th.active__order {
      font-weight: 700;

      &::after {
        content: '\f129';
        display: inline-block;
        font-size: 15px;
      }
    }
  }

  .tabela__body {
    tr,
    td {
      border-radius: 0;
      color: #fff !important;
      width: 100%;
      text-align: left;

      &:hover {
        background-color: rgba(255, 255, 255, 0.04);
      }
    }
    td {
      padding: 5px;
    }
  }

  .tabela__linha .tabela__celula span {
    margin: 2px 0.5rem;
  }

  .forced-color {
    color: #fff !important;
  }

  .linha__clara {
    @include bg-white-alpha(0.1);
  }

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
}
</style>

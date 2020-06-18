<template>
  <table class="tabela-projeto">
    <thead class="tabela-projeto__header">
      <tr>
        <th
          :key="index"
          v-for="(th, index) in thead"
          class="tabela-projeto__celula forced-color icon"
          @click="activeOrder(th.nameOrder, $event)"
        >
          {{ th.titulo }}
        </th>
      </tr>
    </thead>
    <tbody class="tabela-projeto__body">
      <tr
        :key="index"
        class="tabela-projeto__linha"
        :class="classLinha(index)"
        v-for="(projeto, index) in projetos"
      >
        <td class="tabela-projeto__celula">
          {{ projeto.nome }}
        </td>
        <td class="tabela-projeto__celula">
          {{ projeto.registros }}
        </td>
        <td class="tabela-projeto__celula">
          {{ projeto.fase }}
        </td>
        <td class="tabela-projeto__celula">
          {{ projeto.subatividade }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'TabelaUsuariosProjetos',
  props: {
    projetos: {
      type: Array,
      required: true
    },
    thead: {
      type: Array,
      required: true
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
    classLinha (val) {
      return val % 2 === 0 ? 'linha__clara' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.tabela-projeto {
  width: 100%;
  color: #fff !important;
  border-collapse: collapse !important;

  .icon-tempo {
    font-size: 1.3rem;
  }

  &__header {
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

  &__body {
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

  &__linha &__celula span {
    margin: 2px 0.5rem;
  }

  .forced-color {
    color: #fff !important;
  }

  .linha__clara {
    @include bg-white-alpha(0.1);
  }

  @media (max-width: 874px) {
    width: auto !important;
  }
}
</style>

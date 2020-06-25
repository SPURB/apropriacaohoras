<template>
  <div class="default__div">
    <table class="tabela__projeto">
      <thead class="tabela__header">
        <tr>
          <th class="tabela__celula forced-color">
            Todos os projetos
          </th>
          <th class="tabela__celula forced-color">
            <span>
              <i class="icon icon-tempo"></i>
              Horas trabalhadas totais
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="tabela__body">
        <tr
          :key="index"
          class="tabela__linha"
          :class="classLinha(index)"
          v-for="(projeto, index) in projetos"
        >
          <td class="tabela__celula" colspan="2">
            <span class="projeto">{{ projeto.nome }}</span>
            <span class="hora">{{ projeto.desdeInicio }}h</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TabelaProjeto',
  props: {
    projetos: {
      type: Array,
      required: true
    }
  },
  methods: {
    classLinha (val) {
      return val % 2 === 0 ? 'linha__clara' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.default__div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tabela__projeto {
  width: 100%;
  line-height: 2.4;
  border-collapse: collapse;

  .icon-tempo {
    font-size: 1.3rem;
  }

  .tabela__header {
    margin: 30px 0px;
  }

  .tabela__header,
  tr,
  td {
    border-radius: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
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
}
</style>

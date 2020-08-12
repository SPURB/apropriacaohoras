<template>
  <div class="pre-impressao-admin-section-2">
    <div v-for="(pagina, index) in fasesPaginadas" :key="index">
      <pre-impressao-a4
        :paginationIndex="index + 2"
        :paginationTotal="totalPages"
      >
        <div class="pre-impressao-admin__header--fases">
          <h2>{{ projeto }}</h2>
          <p>
            Horas totais registradas:<br />
            <span>{{ totalHoras }}</span>
          </p>
        </div>

        <div v-if="isReady" class="pre-impressao-admin__main">
          <div class="pre-impressao-projeto">
            <div class="pre-impressao-projeto__title">
              <h3>Horas totais por subatividades</h3>
            </div>
            <table
              :key="`fases-${index}`"
              class="pre-impressao-projeto__table pre-impressao-projeto__table--paginado"
              v-for="(fase, index) in pagina"
            >
              <thead>
                <th>{{ fase.nome }}</th>
                <th>Horas</th>
                <th></th>
              </thead>
              <tbody>
                <tr
                  :key="`fase-${index}`"
                  class="pre-impressao-projeto__fase"
                  v-for="(subatividade, index) in fase.subatividades"
                >
                  <td>{{ subatividade.nome }}</td>
                  <td>{{ subatividade.horas }}</td>
                  <td class="graf-barra">
                    <graf-bar
                      :base="0"
                      :current="subatividade.horas"
                      :total="totalHoras"
                      :height="30"
                      :width="200"
                      :background="'#fbfbfb'"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </pre-impressao-a4>
    </div>
  </div>
</template>
<script>
import PreImpressaoA4 from '~/components/sections/PreImpressaoA4'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'PreImpressaoAdminSection2',
  components: {
    PreImpressaoA4
  },
  computed: {
    ...mapState('admin/pre-impressao/section1', ['projeto', 'horas']),
    ...mapGetters('admin/pre-impressao/section1', [
      'totalHoras',
      'fasesComHoras'
    ]),
    ...mapGetters('admin/pre-impressao/section2', [
      'subatividadesFlat',
      'fasesPaginadas'
    ]),
    ...mapState('admin/pre-impressao/section2', ['subatividades']),
    ...mapGetters('admin/pre-impressao/section2', ['totalPages']),
    isReady () {
      return this.fasesPaginadas.length > 0
    }
  }
}
</script>

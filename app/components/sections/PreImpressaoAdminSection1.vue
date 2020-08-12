<template>
  <div class="pre-impressao-admin-section-1">
    <pre-impressao-a4 :paginationIndex="1" :paginationTotal="totalPages">
      <div class="pre-impressao-admin__header">
        <h2>{{ projeto }}</h2>
      </div>
      <div class="pre-impressao-admin__subheader">
        <p>
          Horas totais:<br />
          {{ totalHoras }}
        </p>
      </div>
      <div class="pre-impressao-admin__equipe">
        <h3>Equipe</h3>
        <section class="pre-impressao-admin__equipe--nomes">
          <p :key="`equipe-${index}`" v-for="(membro, index) in usuarios">
            {{ membro.nome }}
          </p>
        </section>
      </div>
      <div class="pre-impressao-admin__main">
        <div class="projeto">
          <div class="projeto__title">
            <h3>Horas totais por fases</h3>
          </div>
          <table class="projeto__table">
            <thead>
              <tr>
                <th>Fases</th>
                <th>Horas</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                :key="`fase-${index}`"
                class="projeto__fase"
                v-for="(fase, index) in fasesComHoras"
              >
                <td>{{ fase.nome }}</td>
                <td>{{ fase.totalHorasFase }}</td>
                <td class="graf-barra">
                  <graf-bar
                    :base="0"
                    :current="fase.totalHorasFase"
                    :total="totalHoras"
                    :height="30"
                    :width="200"
                    :background="'#fbfbfb'"
                  />
                </td>
              </tr>
              <tr class="projeto__soma">
                <td>total</td>
                <td>{{ totalHoras }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </pre-impressao-a4>
  </div>
</template>
<script>
import PreImpressaoA4 from '~/components/sections/PreImpressaoA4'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'PreImpressaoAdminSection1',
  components: {
    PreImpressaoA4
  },
  computed: {
    ...mapState('admin/pre-impressao/section1', [
      'fases',
      'projeto',
      'grupo',
      'usuarios',
      'horas'
    ]),
    ...mapGetters('admin/pre-impressao/section1', [
      'totalHoras',
      'fasesComHoras'
    ]),
    ...mapGetters('admin/pre-impressao/section2', ['totalPages'])
  }
}
</script>

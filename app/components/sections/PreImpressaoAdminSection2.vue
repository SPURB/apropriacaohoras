<template>
  <div class="pre-impressao-admin-section-2">
    <div v-for="(pagina, index) in fasesPaginadas" :key="index">
      <pre-impressao-a4 :paginationIndex="2" :paginationTotal="3">
        <div class="pre-impressao-admin__header--fases">
          <h2>{{ projeto }}</h2>
          <p>
            Horas totais registradas:<br />
            <span>{{ totalHoras }}</span>
          </p>
        </div>

        <div v-if="isReady" class="pre-impressao-admin__main">
          <div class="projeto">
            <div class="projeto__title">
              <h3>Horas totais por subatividades</h3>
            </div>
            <table
              :key="`fases-${index}`"
              class="projeto__table projeto__table--paginado"
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
                  class="projeto__fase"
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
    ...mapGetters('admin/pre-impressao/section2', ['subatividadesFlat']),
    ...mapState('admin/pre-impressao/section2', [
      'subatividades',
      'totalPages'
    ]),
    fasesPaginadas () {
      if (!this.fasesComHoras.length || !this.subatividadesFlat.length)
        return []

      let paginas = []
      let pagina = []

      let soma = 0
      const maxSoma = 18 // máximo de linhas de cada página

      this.fasesComHoras
        .map(({ nome, id, totalHorasFase }) => {
          const subatividades = this.subatividadesFlat
            .filter(subatividade => subatividade.fase === id)
            .map(subatividade => {
              const horas = this.horas
                .filter(hora => hora.subatividade === subatividade.id)
                .map(hora => hora.horas + hora.extras)
                .reduce((a, ac) => a + ac, 0)

              return {
                nome: subatividade.nome,
                horas
              }
            })

          return {
            nome,
            id,
            totalHorasFase,
            subatividades
          }
        })
        .forEach((item, index, array) => {
          const len = item.subatividades.length
          const currentSoma = len + soma

          if (currentSoma <= maxSoma) {
            pagina.push(item)
            soma = currentSoma
          } else {
            paginas.push(pagina)
            pagina = []
            pagina.push(item)
            soma = len
          }

          if (index === array.length - 1) {
            paginas.push(pagina)
          }
        })

      return paginas
    },
    isReady () {
      return this.fasesPaginadas.length > 0
    }
  }
}
</script>

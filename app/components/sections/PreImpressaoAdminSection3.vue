<template>
  <div class="pre-impressao-admin-section-3">
    <pre-impressao-a4 :paginationIndex="3" :paginationTotal="3">
      <div class="pre-impressao-admin__header--fases">
        <h2>{{ projeto }}</h2>

        <p>
          Horas totais registradas:<br />
          <span>{{ totalHoras }}</span>
        </p>
      </div>
      <div class="pre-impressao-admin__main">
        <div class="projeto">
          <div class="projeto__title">
            <h3>Horas totais por Funcionário</h3>
          </div>
          <table class="projeto__table">
            <thead>
              <tr>
                <th>Funcionário</th>
                <th>Horas</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                :key="`usuarios-${index}`"
                class="projeto__fase"
                v-for="(usuario, index) in usuarioComHoras"
              >
                <td>{{ usuario.nome }}</td>
                <td>{{ usuario.horas }}</td>
                <td class="graf-barra">
                  <graf-bar
                    :base="0"
                    :current="usuario.horas"
                    :total="totalHoras"
                    :height="32"
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
</template>
<script>
import PreImpressaoA4 from '~/components/sections/PreImpressaoA4'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'PreImpressaoAdminSection3',
  components: {
    PreImpressaoA4
  },
  computed: {
    ...mapState('admin/pre-impressao/section1', [
      'projeto',
      'horas',
      'usuarios'
    ]),
    ...mapGetters('admin/pre-impressao/section1', ['totalHoras']),
    usuarioComHoras () {
      if (!this.usuarios.length || !this.horas) return []

      return this.usuarios.map(({ id, nome }) => {
        const horas = this.horas
          .filter(hora => hora.usuario === id)
          .map(hora => hora.horas + hora.extras)
          .reduce((a, ac) => a + ac, 0)

        return { horas, nome }
      })
    }
  }
}
</script>

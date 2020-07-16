<template>
  <div class="pre-impressao-admin">
    <preloader v-if="fetching" />
    <btn-progresso class="pre-impressao-admin__navigation rotate" />

    <div class="pre-impressao-admin__container">
      <div v-if="isReady" class="pre-impressao-admin__projetos" id="printer">
        <pre-impressao-a4 :paginationIndex="1" :paginationTotal="13">
          <div class="pre-impressao-admin__header">
            <h2>PIU Jóquey Club</h2>
          </div>
          <div class="pre-impressao-admin__subheader">
            <p>
              Data da última atualização:<br />
              2020 06 13 às 13h42
            </p>
            <p>
              Horas totais:<br />
              7239
            </p>
          </div>
          <div class="pre-impressao-admin__equipe">
            <h3>Equipe</h3>
            <section class="pre-impressao-admin__equipe--nomes">
              <p>
                <span> Adalberto Villela </span>
                <span> Ajuricaba Bernardes </span>
                <span> Alarico Botica </span>
                <span> Aleixo Carlos </span>
                <span> Angelina Botica </span>
                <span> Antônia Mendoça </span>
              </p>
              <p>
                <span> Luzia Furquim </span>
                <span> Lázaro Vega </span>
                <span> Martinho Botelho </span>
                <span> Micael Fitas </span>
                <span> Nicolau Graça </span>
                <span> Otília Freyre </span>
              </p>
              <p>
                <span> Patrícia Canejo </span>
                <span> Paulina Ipiranga </span>
                <span> Quirina Vilhena </span>
                <span> Quitéria Meira </span>
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
                  <tr class="projeto__fase">
                    <td>Elementos prévios</td>
                    <td>3</td>
                    <td>
                      <graf-bar
                        :base="5"
                        :current="0"
                        :total="8"
                        :height="32"
                        :width="200"
                      />
                    </td>
                  </tr>
                  <tr class="projeto__soma">
                    <td>total</td>
                    <td>8</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="pre-impressao-admin__footer">
            <p
              class="pre-impressao-admin__legenda"
              style="border-color: #434343"
            >
              {{ nome }}
            </p>
            <p
              class="pre-impressao-admin__legenda"
              style="border-color: #DFDFDF"
            >
              Equipe
            </p>
          </div>
        </pre-impressao-a4>
      </div>
    </div>

    <btn-progresso class="pre-impressao-admin__navigation" />
  </div>
</template>

<script>
import Lib from '~/libs/'
import { mapState, mapActions, mapGetters } from 'vuex'
import PreImpressaoA4 from '~/components/sections/PreImpressaoA4'
import BtnProgresso from '~/components/elements/BtnProgresso'
import Preloader from '~/components/elements/Preloader'
import GrafBar from '~/components/elements/GrafBar'

export default {
  name: 'PreImpressaoAdmin',
  layout: 'pre-impressao',
  data () {
    return {
      page: 1,
      projeto: {}
    }
  },
  components: {
    PreImpressaoA4,
    BtnProgresso,
    Preloader,
    GrafBar
  },
  computed: {
    ...mapState('usuario', ['nome', 'projetos', 'id']),
    ...mapState('admin/pre-impressao', [
      'projetos',
      'usuarios',
      'usuariosProjetos',
      'fetching',
      'error',
      'err'
    ]),
    ...mapGetters('admin/pre-impressao', ['usuariosByProjetos']),
    isReady () {
      return !this.error && !this.fetching
    }
  },
  created () {
    this.setupOn()
  },
  methods: {
    ...mapActions('admin/pre-impressao', [
      'getFases',
      'getProjetos',
      'getUsuarios',
      'getUsuariosProjetos'
    ]),
    setupOn () {
      this.getFases()
      this.getProjetos()
      this.getUsuarios()
      this.getUsuariosProjetos()
    }
  }
}
</script>

<style lang="scss" scoped>
.pre-impressao-admin {
  display: flex;

  &__header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    h2 {
      font-weight: normal;
      margin-bottom: 0;
      font-size: 1.8rem;
    }
    span {
      font-size: 1rem;
    }
  }

  &__subheader {
    display: flex;
    justify-content: space-between;
  }

  &__equipe {
    border-top: solid 1px $cinza1;
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0;
    }

    &--nomes {
      display: flex;
      justify-content: space-between;
      p {
        display: flex;
        flex-direction: column;
      }
    }
  }

  &--align-right {
    text-align: right;
  }
  &__footer {
    border-top: solid 1px $cinza1;
    margin-top: auto;
    display: flex;
  }
  &__legenda {
    margin-right: 1rem;
    border-left: 1rem solid;
    padding-left: 0.25rem;
  }

  &__container {
    display: flex;
    justify-content: center;
    min-width: 80%;
  }

  &__projetos {
    width: 100%;
  }

  &__navigation {
    background: transparent;
    align-self: center;

    &.rotate {
      transform: rotate(180deg);
    }
  }
}
.projeto {
  margin-top: 1rem;

  &__title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid $cinza1;
    h3 {
      font-size: 1rem;
      font-weight: 500;
    }
  }
  &__table {
    border-collapse: collapse;
    width: 100%;
    th,
    td {
      text-align: right;
      height: 32px;
      padding-right: 1rem;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        display: flex;
        align-items: center;
        padding-right: 0;
      }
    }
  }
  &__fase {
    border-top: 1px solid #d2d2d2;
  }
  &__soma {
    background-color: #ececec;
    font-weight: bold;
    border-top: 2px grey solid;
    td {
      &:first-child {
        padding-left: 0.5rem;
      }
    }
  }
}
</style>

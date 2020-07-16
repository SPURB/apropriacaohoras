<template>
  <div class="projetos">
    <modal
      class="projetos__modal"
      v-if="modal.display"
      :title="modal.title"
      :error="modal.error"
      :description="modal.description"
      :action-description="modal.actionDescription"
      :action-text="modal.actionText"
      @setModalAction="modal.action"
    />

    <div class="row">
      <div class="column">
        <h3 class="projetos__group-title">{{ grupoName }}</h3>
        <p class="projetos__group-description">{{ grupoDescription }}</p>
        <nav class="nav">
          <h2 class="nav__title">
            {{ currentStep }}
            <span
              >{{ selectedProjeto.nome }}
              <i
                v-if="currentStep !== 'Projetos' && currentStep !== 'Fases'"
                class="icon icon-abrir_direita"
              ></i
            ></span>
            <span>{{ selectedFase.nome }}</span>
          </h2>
          <ol class="nav__breadcrumb" v-if="currentStep !== 'Projetos'">
            <li class="nav__breadcrumb--item">
              <router-link
                class="nav__breadcrumb--link"
                :class="{ 'nav__breadcrumb--not-allowed': false }"
                :to="{ path: '/admin/projetos', query: { grupo: idGrupo } }"
                >Projetos<i class="icon icon-abrir_direita"></i
              ></router-link>
            </li>
            <li class="nav__breadcrumb--item">
              <router-link
                class="nav__breadcrumb--link"
                :class="{ 'nav__breadcrumb--not-allowed': idFase < 0 }"
                :to="{ query: { projeto: idProjeto, grupo: idGrupo } }"
                >Fases <i class="icon icon-abrir_direita"></i
              ></router-link>
            </li>
            <li class="nav__breadcrumb--item">
              <span :class="{ disabled: currentStep !== 'Subatividades' }"
                >Subatividades</span
              >
            </li>
          </ol>
        </nav>
        <voltar :to="goBack" />
        <list-horizontal-nav
          v-if="currentStep === 'Projetos'"
          :routes="projetosRoutes"
          :action-type="'go'"
          :fetching="fetching"
          @updateField="updateField"
          data-cy="step__projetos"
        />
        <list-horizontal-nav
          v-if="currentStep === 'Fases'"
          :routes="fasesRoutes"
          :action-type="'go'"
          :fetching="fetching"
          @updateField="updateField"
          data-cy="step__fases"
        />
        <list-horizontal-nav
          v-if="currentStep === 'Subatividades'"
          :routes="subatividadesRoutes"
          :action-type="'close'"
          :fetching="fetching"
          @updateField="updateField"
          data-cy="step__subatividades"
        />
        <input-create
          :title="setFormTitle(this.currentStep)"
          :description="setFormDescription(this.currentStep)"
          @setValue="setFormValue"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ListHorizontalNav from '~/components/router-links/ListHorizontalNav'
import InputCreate from '~/components/forms/InputCreate'
import Modal from '~/components/sections/Modal'
import Voltar from '~/components/router-links/Voltar'

export default {
  name: 'Projetos',
  layout: 'admin',
  data () {
    return {
      goBackHover: false,
      pageTitle: 'Projetos',
      grupoName: '',
      grupoDescription: ''
    }
  },
  components: {
    ListHorizontalNav,
    InputCreate,
    Modal,
    Voltar
  },
  computed: {
    ...mapState('admin/projetos', [
      'projetos',
      'subatividades',
      'error',
      'type',
      'fetching',
      'message',
      'success',
      'fases'
    ]),
    ...mapState({
      email: state => state.usuario.usuario.email
    }),
    projetosRoutes () {
      return this.projetos.map(projeto => {
        return {
          to: { query: { projeto: projeto.id, grupo: this.idGrupo } },
          title: projeto.nome
        }
      })
    },
    fasesRoutes () {
      if (!this.fases.length) {
        return []
      }
      return this.fases.map(fase => {
        return {
          to: {
            query: {
              projeto: this.idProjeto,
              fase: fase.id,
              grupo: this.idGrupo
            }
          },
          title: fase.nome
        }
      })
    },
    subatividadesRoutes () {
      if (!this.subatividades.length) {
        return []
      }
      return this.subatividades.map(subatividade => {
        return {
          to: {
            query: {
              projeto: this.idProjeto,
              fase: this.IdFase,
              subatividade: subatividade.id,
              grupo: this.idGrupo
            }
          },
          title: subatividade.nome
        }
      })
    },
    idProjeto () {
      const id = this.$route.query.projeto
      return id ? id : 0
    },
    idFase () {
      const id = this.$route.query.fase
      return id ? id : 0
    },
    idGrupo () {
      const id = parseInt(this.$route.query.grupo)
      return id ? id : 0
    },
    selectedFase () {
      if (!this.idFase || !this.fases.length) return {}
      return this.fases.find(fase => fase.id === this.idFase)
    },
    selectedProjeto () {
      if (!this.idProjeto || !this.projetos.length) return { nome: '' }
      const selected = this.projetos.find(
        projeto => projeto.id === this.idProjeto
      )
      return selected ? selected : { nome: '' }
    },
    currentStep () {
      if (this.idProjeto && !this.idFase) {
        return 'Fases'
      } else if (this.idProjeto && this.idFase) {
        return 'Subatividades'
      } else {
        return 'Projetos'
      }
    },
    modal () {
      return {
        display: this.error || this.success,
        error: this.error,
        title: this.success
          ? `${this.currentStep.slice(0, -1)} ${this.type}`
          : 'Erro!',
        description: this.message,
        actionDescription: this.success
          ? ''
          : 'Tente realizar o login novamente',
        actionText: this.success ? '' : 'Tentar novamente',
        action: () => {
          if (this.error) {
            this.resetAsync()
            this.$router.push({ path: '/login', query: { email: this.email } })
          } else if (this.success && this.currentStep === 'Projetos') {
            this.getProjetos(this.idGrupo)
          } else if (this.success && this.currentStep === 'Fases') {
            this.getFases(this.idGrupo)
          } else if (this.success && this.currentStep === 'Subatividades') {
            this.getSubatividades(this.idFase)
          }
          this.reset()
        }
      }
    },
    goBack () {
      if (this.currentStep === 'Subatividades') {
        return `/admin/projetos?projeto=${this.idProjeto}&grupo=${this.idGrupo}`
      } else if (this.currentStep === 'Fases') {
        return `/admin/projetos?grupo=${this.idGrupo}`
      } else if (this.currentStep === 'Projetos') {
        return `/admin/grupos`
      } else {
        this.$router.go(-1)
      }
    }
  },
  watch: {
    currentStep (step) {
      const idProjeto = parseInt(this.idProjeto)
      const idFase = parseInt(this.idFase)

      return (this.pageTitle = {
        Projetos: () => 'Projetos',
        Fases: () =>
          this.projetos.find(projeto => projeto.id === idProjeto).nome,
        Subatividades: () => this.fases.find(fase => fase.id === idFase).nome
      }[step]())
    },
    idFase (id) {
      if (id) {
        this.getSubatividades(id)
      }
    }
  },
  methods: {
    ...mapActions('usuario', ['resetAsync']),
    ...mapActions('admin/projetos', [
      'getProjetos',
      'getFases',
      'getSubatividades',
      'postTableItem',
      'putTableItem',
      'reset'
    ]),
    updateField (data) {
      this.putTableItem(data)
    },
    setFormValue (nome) {
      const table = this.currentStep.toLowerCase()
      const data =
        table === 'subatividades'
          ? { fase: this.idFase, nome }
          : { nome, grupo: this.idGrupo }

      this.postTableItem({ table, data })
    },
    setFormTitle (step) {
      return `Criar ${step.slice(0, -1)}`
    },
    setFormDescription (step) {
      return `Inclua ${step.slice(0, -1)}`
    }
  },
  created () {
    const { grupoName, grupoDescription } = this.$route.query
    this.grupoName = grupoName
    this.grupoDescription = grupoDescription

    this.getProjetos(this.idGrupo)
    this.getFases(this.idGrupo)
  }
}
</script>
<style lang="scss" scoped>
.projetos {
  margin: 0 auto;
  min-height: calc(100vh - 200px);

  &__modal {
    top: 0;
    left: 0;
  }
  p,
  h3 {
    padding: 0.25rem;
    margin: 0;
  }

  @media screen {
    @media (max-width: $desktop) {
      max-width: 90%;
      margin: auto;
    }
  }
}

.row {
  max-width: $desktop;
  margin: 3rem auto;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: $tablet) {
    flex-direction: column;
    align-items: flex-start;
  }

  &__title > span {
    font-size: 1rem;
    font-weight: normal;
    color: $verde;
  }
  &__breadcrumb {
    display: flex;
    list-style-type: none;

    @media (max-width: $tablet) {
      padding: 0;
    }
  }
  &__breadcrumb--item {
    font-weight: 700;
    .icon {
      margin: 0 0.5rem;
    }
    &:hover {
      cursor: pointer;
    }
    .disabled {
      color: $verde;
    }
  }
  &__breadcrumb--link {
    text-decoration: none;
  }
  &__breadcrumb--not-allowed {
    cursor: not-allowed;
  }
  .nuxt-link-exact-active {
    color: #fff;
    opacity: 1;
  }
}

.list-horizontal-nav {
  margin-bottom: 8rem;
}
</style>

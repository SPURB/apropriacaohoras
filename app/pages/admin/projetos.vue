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
                :to="{ path: '/admin/projetos' }"
                >Projetos <i class="icon icon-abrir_direita"></i
              ></router-link>
            </li>
            <li class="nav__breadcrumb--item">
              <router-link
                class="nav__breadcrumb--link"
                :class="{ 'nav__breadcrumb--not-allowed': idFase < 0 }"
                :to="{ query: { projeto: idProjeto } }"
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
        <button class="projetos__btn voltar" @click.prevent="goBack">
          <i class="icon icon-abrir_esquerda"></i>Voltar
        </button>
        <list-horizontal-nav
          v-if="currentStep === 'Projetos'"
          :routes="projetosRoutes"
          :action-type="'go'"
          data-cy="step__projetos"
        />
        <list-horizontal-nav
          v-if="currentStep === 'Fases'"
          :routes="fasesRoutes"
          :action-type="'go'"
          data-cy="step__fases"
        />
        <list-horizontal-nav
          v-if="currentStep === 'Subatividades'"
          :routes="subatividadesRoutes"
          :action-type="'close'"
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
import Modal from '~/components/Modal'

export default {
  name: 'Projetos',
  layout: 'admin',
  data () {
    return {
      goBackHover: false,
      pageTitle: 'Projetos'
    }
  },
  components: {
    ListHorizontalNav,
    InputCreate,
    Modal
  },
  computed: {
    ...mapGetters('admin/equipes', ['projetos']),
    ...mapState('admin/projetos', [
      'subatividades',
      'error',
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
          to: { query: { projeto: projeto.id } },
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
              fase: fase.id
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
              subatividade: subatividade.id
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
    selectedFase () {
      if (!this.idFase || !this.fases.length) return {}
      return this.fases.find(fase => fase.id === this.idFase)
    },
    selectedProjeto () {
      if (!this.idProjeto || !this.projetos.length) return {}
      return this.projetos.find(projeto => projeto.id === this.idProjeto)
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
          ? `${this.currentStep.slice(0, -1)} cadastrado`
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
            this.getProjetos()
          } else if (this.success && this.currentStep === 'Fases') {
            this.getFases()
          } else if (this.success && this.currentStep === 'Subatividades') {
            this.getSubatividades(this.idFase)
          }

          this.reset()
        }
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
    ...mapActions('admin/equipes', ['getProjetos']),
    ...mapActions('admin/projetos', [
      'getFases',
      'getSubatividades',
      'postTableItem',
      'reset'
    ]),
    goBack () {
      if (this.currentStep === 'Subatividades')
        this.$router.push({ query: { projeto: this.idProjeto } })
      if (this.currentStep === 'Fases')
        this.$router.push({ path: '/admin/projetos' })
      if (this.currentStep === 'Projetos') this.$router.push({ path: '/admin' })
      else {
        this.$router.go(-1)
      }
    },
    setFormValue (nome) {
      const table = this.currentStep.toLowerCase()
      const data =
        table === 'subatividades' ? { fase: this.idFase, nome } : { nome }

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
    if (!this.projetos.length) {
      this.getProjetos()
    }

    if (!this.fases.length) {
      this.getFases()
    }
  }
}
</script>
<style lang="scss" scoped>
.projetos {
  margin: 0 auto;
  min-height: calc(100vh - 200px);

  &__modal {
    top: 0;
  }
  &__btn {
    display: flex;
    align-items: center;
    text-align: left;
    font-family: $grot;
    color: #fff;
    font-size: 1rem;
    border: 0;
    height: 55px;
    background-color: $verde;
    transition: background-color 0.2s ease-in-out;
    &.voltar > i {
      font-size: 1.5rem;
      margin-right: 0.5rem;
      margin-left: 0.1rem;
    }
    &:hover {
      cursor: pointer;
      background-color: #00a896;
    }
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
  margin: auto;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  &__title > span {
    font-size: 1rem;
    font-weight: normal;
    color: $verde;
  }
  &__breadcrumb {
    display: flex;
    list-style-type: none;
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

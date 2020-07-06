<template>
  <div class="equipes">
    <modal
      v-if="showModal"
      :title="errorTitle"
      :error="error"
      :description="apiMessage"
      :action-description="errorDescription"
      :action-text="actionText"
      @setModalAction="sair"
    />
    <div class="equipes__container">
      <div class="row">
        <div class="column">
          <h3>Gerenciar equipes de projeto</h3>
          <p class="equipes__subtitle">
            Associe um membro da equipe a um projeto
          </p>
        </div>
      </div>
      <div class="row">
        <div class="column projetos">
          <h4 class="projetos__title">Selecione um projeto</h4>
          <input-options :options="optionsGroups" @setOptionValue="setGrupo" />
          <input-options
            :options="options"
            :disabled="this.grupo > 0 && this.options.length > 1 ? false : true"
            @setOptionValue="setProjeto"
          />

          <template v-if="projeto">
            <h4>Equipe deste projeto</h4>
            <transition-group class="equipes__cards" name="list" tag="ul">
              <li
                class="card"
                v-for="usuario in validUsuarios"
                :key="usuario.id"
                data-cy="usuario__projeto"
              >
                <div class="card__info">
                  <user-profile-placeholder
                    class="card__profile-img"
                    :opacity="1"
                    :width="'60px'"
                  />
                  <label
                    class="card__label"
                    :for="`card__btn--${usuario.id}`"
                    >{{ usuario.nome }}</label
                  >
                </div>
                <button
                  :id="`card__btn--${usuario.id}`"
                  class="card__btn"
                  @click="removeUsuario({ idUsuario: usuario.id })"
                >
                  <i class="icon icon-incorreto"></i>
                </button>
              </li>
            </transition-group>
          </template>
        </div>
        <div class="column gutter"></div>
        <div class="column busca">
          <h4>Equipe disponível</h4>
          <input-search
            :list="usuarios"
            :options="{
              shouldSort: true,
              keys: ['nome']
            }"
            :placeholder="'Pesquise membro...'"
            :checkboxesDisabled="checkboxesDisabled"
            :checks="checks"
            @setCheckedItem="setUsuario"
          />
          <input-create
            title="Incluir usuário"
            description="Nome"
            :checkAndEmail="true"
            style="margin-top: 2rem;"
            @setValue="handleUsuarioPost"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import InputOptions from '~/components/forms/InputOptions'
import InputSearch from '~/components/forms/InputSearch'
import InputCreate from '~/components/forms/InputCreate'
import UserProfilePlaceholder from '~/components/elements/UserProfilePlaceholder'
import Modal from '~/components/sections/Modal'

export default {
  name: 'equipes',
  layout: 'admin',
  components: {
    InputOptions,
    InputSearch,
    InputCreate,
    UserProfilePlaceholder,
    Modal
  },
  data () {
    return {
      checkboxesDisabled: true,
      usuariosOfSelectedProjeto: [],
      projeto: 0,
      grupo: 0,
      usuario: {}
    }
  },
  computed: {
    ...mapGetters('admin/equipes', ['projetos', 'validUsuarios']),
    ...mapState('admin/equipes', [
      'usuarios',
      'error',
      'showModal',
      'apiMessage',
      'status'
    ]),
    ...mapState('usuario', ['token']),
    ...mapState('admin/grupos', ['grupos']),
    errorTitle () {
      const errors = {
        400: 'Erro na requisição',
        403: 'Erro na autenticação',
        500: 'Erro no servidor',
        200: 'Sucesso'
      }
      const title = errors[this.status]

      return title ? title : 'Erro'
    },
    errorDescription () {
      const errors = {
        403: 'Faça o login novamente',
        200: 'Registro realizado.'
      }
      const description = errors[this.status]
      return description
        ? description
        : 'Entre em contato com o desenvolvedor: \ndesenvolvimento@spurbanismo.sp.gov.br'
    },
    actionText () {
      const errors = {
        403: 'Voltar para login',
        200: 'Voltar'
      }
      const text = errors[this.status]
      return text ? text : 'Tentar novamente'
    },
    options () {
      const placeholder = [
        {
          title: 'Selecione um projeto',
          value: 0
        }
      ]
      if (!this.projetos.length) {
        return placeholder
      }

      let projetos = []

      if (this.grupo > 0) {
        this.projetos.filter(projeto => {
          if (projeto.grupo === this.grupo) {
            projetos.push({
              title: projeto.nome,
              value: projeto.id
            })
          }
        })
      }

      return placeholder.concat(projetos)
    },
    optionsGroups () {
      const placeholder = [
        {
          title: 'Filtre por um grupo',
          value: 0
        }
      ]
      if (!this.grupos.length) {
        return placeholder
      }
      const grupos = this.grupos.map(grupo => {
        return {
          title: grupo.nome,
          value: grupo.id
        }
      })
      return placeholder.concat(grupos)
    },
    checks: {
      get () {
        return this.validUsuarios.map(usuario => usuario.id)
      }
    }
  },
  watch: {
    grupo () {
      if (this.options.length <= 1) {
        this.reset_usuariosProjetos()
      }
    }
  },
  methods: {
    ...mapActions('usuario', ['logout']),
    ...mapActions('admin/grupos', ['getGrupos']),
    ...mapActions('admin/equipes', [
      'getProjetos',
      'getUsuarios',
      'getUsuariosProjetos',
      'removeUsuario',
      'createUsuariosProjetos',
      'createUsuario',
      'reset_usuariosProjetos',
      'reset'
    ]),
    setProjeto (idProjeto) {
      if (!idProjeto) {
        return
      }
      this.checkboxesDisabled = false
      this.getUsuariosProjetos({ idProjeto })
      this.projeto = idProjeto
    },
    setUsuario ({ id, checked }) {
      if (!checked) {
        this.removeUsuario({ idUsuario: id })
      } else {
        this.createUsuariosProjetos({ idUsuario: id, idProjeto: this.projeto })
      }
    },
    setGrupo (grupo) {
      this.grupo = grupo
    },
    sair () {
      if (this.status === 403) {
        this.logout(this.token)
        this.reset()
        this.$router.push('/login')
      } else {
        this.$router.go()
      }
    },
    handleUsuarioPost (param) {
      this.createUsuario(param)
    }
  },
  created () {
    if (!this.grupos.length) {
      this.getGrupos()
    }

    if (!this.projetos.length) {
      this.getProjetos()
    }

    if (!this.usuarios.length) {
      this.getUsuarios()
    }
  }
}
</script>
<style lang="scss" scoped>
.equipes {
  color: #fff;
  max-width: $desktop;
  min-width: 100%;
  &__container {
    max-width: $desktop;
    margin: 0 auto;
    @media screen {
      @media (max-width: $desktop) {
        max-width: 90%;
        margin: auto;
      }
    }
    @media screen {
      @media (max-width: 600px) {
        .column.gutter {
          display: none;
        }
      }
    }
  }
  &__subtitle {
    opacity: 0.5;
  }
  &__cards {
    margin: 0;
    padding: 1.5rem;
    background: #33756d;
    border-radius: 1rem;
  }
  h4 {
    font-weight: normal;
  }
}

.projetos {
  &__title {
    margin-bottom: 2.3rem;
  }
}

.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  opacity: 1;
  color: $preto;
  min-height: 92px;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 46px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.48);
  &__info {
    display: flex;
    align-items: center;
  }
  &__label {
    margin-left: 1rem;
  }
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    height: 24px;
    width: 24px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 2px solid #f07f7f;
    background-color: $vermelho;
    margin-right: 1rem;
    color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.48);
    cursor: pointer;
  }
  &.list-enter-active,
  &.list-leave-active {
    transition: all 0.2s;
  }
  &.list-enter,
  &.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}

.busca {
  &__title {
    margin-bottom: 1rem;
  }
}
</style>

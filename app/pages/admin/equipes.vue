<template>
  <div class="equipes">
    <div class="row">
      <div class="column">
        <h3>Gerenciar equipes de projeto</h3>
        <p class="equipes__subtitle">
          Selecione um projeto e arraste os membros entre as colunas para
          inserir ou remover na equipe de projeto
        </p>
      </div>
    </div>
    <div class="row">
      <div class="column busca">
        <input-options :options="options" @setOptionValue="setProjeto" />
        <h4>Equipe deste projeto</h4>
        <transition-group class="equipes__cards" name="list" tag="ul">
          <li
            class="card"
            v-for="(usuario, index) in validUsuarios"
            :key="usuario.id"
          >
            <div class="card__info">
              <user-profile-placeholder
                class="card__profile-img"
                :opacity="1"
                :width="'60px'"
              />
              <label class="card__label" :for="`card__btn--${usuario.id}`">{{
                usuario.nome
              }}</label>
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
      </div>
      <div class="column gutter"></div>
      <div class="column">
        <h4>Equipe disponível</h4>
        <input-busca
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
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import InputOptions from '~/components/elements/InputOptions'
import InputBusca from '~/components/elements/InputBusca'
import UserProfilePlaceholder from '~/components/elements/UserProfilePlaceholder'

export default {
  name: 'equipes',
  layout: 'admin',
  components: { InputOptions, InputBusca, UserProfilePlaceholder },
  data () {
    return {
      checkboxesDisabled: true,
      usuariosOfSelectedProjeto: [],
      projeto: 0
    }
  },
  computed: {
    ...mapGetters('admin/equipes', ['projetos', 'validUsuarios']),
    ...mapState('admin/equipes', ['usuarios']),
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
      const projetos = this.projetos.map(projeto => {
        return {
          title: projeto.nome,
          value: projeto.id
        }
      })
      return placeholder.concat(projetos)
    },
    checks: {
      get () {
        return this.validUsuarios.map(usuario => usuario.id)
      }
    }
  },
  methods: {
    ...mapActions('admin/equipes', [
      'getProjetos',
      'getUsuarios',
      'getUsuariosProjetos',
      'removeUsuario',
      'createUsuariosProjetos'
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
    }
  },
  created () {
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
  margin: 15px;
  color: #fff;
  max-width: $desktop;
  margin: 0 auto;
  min-height: calc(100vh - 200px);
  &__subtitle {
    opacity: 0.5;
  }
  &__cards {
    margin: 0;
    padding: 1.5rem;
    background: #33756d;
    border-radius: 1rem;
  }
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
  h4 {
    font-weight: normal;
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

<template>
  <div class="editar">
    <app-header />

    <modal
      v-if="modal.show"
      class="registrar__modal"
      :title="modal.title"
      :error="modal.error"
      :description="modal.description"
      :action-text="modal.actionText"
      @setModalAction="backToRegistrar"
    />

    <section class="editar__titulo">
      <router-link tag="h2" to="/registrar">
        Registrar hora
      </router-link>
      <h3>atualizar {{ data }}</h3>
    </section>

    <section class="editar__listar">
      <listar-horas :registro="countHoras" />
    </section>

    <section class="editar__horas">
      <editar-horas
        :key="index"
        v-for="(item, index) in registros"
        :registro="item"
        :index="index"
        :type="0"
        @status="getStatus"
      />

      <div v-if="novaAtividade.length > 0">
        <editar-horas
          :key="`${index}-nova`"
          v-for="(item, index) in novaAtividade"
          :registro="item"
          :index="index"
          :type="1"
          @status="getStatus"
        />
      </div>
    </section>

    <section class="editar__nova-atividade" @click="addAtividade">
      <i class="icon icon-adicionar"></i>
      Incluir atividade
    </section>
  </div>
</template>

<script>
import Lib from '~/libs/'
import Modal from '~/components/Modal'
import AppHeader from '~/components/AppHeader'
import ListarHoras from '~/components/ListarHoras'
import EditarHoras from '~/components/EditarHoras'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Editar',
  data () {
    return {
      data: '',
      modal: {
        show: false,
        title: '',
        error: true,
        errorAPI: false,
        description: '',
        descriptionList: [],
        actionText: ''
      }
    }
  },
  components: {
    Modal,
    AppHeader,
    ListarHoras,
    EditarHoras
  },
  computed: {
    ...mapState('editar', {
      registros: state => state.registros,
      countHoras: state => state.countHoras,
      novaAtividade: state => state.novaAtividade
    })
  },
  created () {
    this.RESET_REGISTROS()
    this.formateDate()
  },
  mounted () {
    this.getRegistros(this.$route.query.data)
  },
  methods: {
    ...mapActions('editar', ['getRegistros', 'addAtividade']),
    ...mapMutations('editar', ['RESET_REGISTROS']),
    formateDate () {
      const date = Lib.splitDate(this.$route.query.data)
      this.data = `${date.sDay}/${date.sMonth}/${date.sYear}`
    },
    getStatus (value) {
      this.getRegistros(this.$route.query.data)
      this.modal.title = value.title
      this.modal.description = value.description
      this.modal.actionText = value.actionText
      this.modal.error = value.error
      this.modal.show = true
    },
    backToRegistrar () {
      this.$router.push('/registrar')
    }
  }
}
</script>

<style lang="scss" scoped>
.editar {
  @include color-white-alpha(1);
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;

  &__titulo,
  &__listar,
  &__horas {
    padding: 15px 30px 5px 50px;
  }

  &__titulo {
    align-items: center;
    display: flex;
    width: 100%;

    h2 {
      @include color-white-alpha(0.8);

      &:hover {
        @include color-white-alpha(1);
        cursor: pointer;
      }
    }

    h3:before {
      background-color: $verde;
      content: '';
      display: inline-block;
      margin: 7px 7px -2px 7px;
      height: 20px;
      width: 3px;
    }
  }

  &__nova-atividade {
    align-self: center;
    align-items: center;
    background-color: $verde;
    color: #fff;
    display: flex;
    width: 90%;
    height: 113px;
    padding: 1rem;
    transition: ease-in-out 0.25s all;

    .icon {
      font-size: 1.2rem;
      margin-right: 1rem;
      transition: ease-in-out 0.25s all;
    }

    &:hover {
      cursor: pointer;
      background-color: #00a896;
      .icon {
        transform: rotate(90deg);
      }
    }
  }

  @media (max-width: $tablet) {
    &__titulo,
    &__listar,
    &__horas {
      padding: 15px 10px 5px 10px;
    }

    &__titulo {
      flex-direction: column;
      align-items: flex-start;
      h2,
      h3 {
        margin-bottom: 0;
      }

      h3 {
        margin-top: 5px;
      }
    }
  }
}
</style>

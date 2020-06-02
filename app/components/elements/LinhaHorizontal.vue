<template>
  <div>
    <section v-if="actionType === 'go'" class="linha-horizontal">
      <div
        @click="display = !display"
        class="editar"
        :class="index % 2 === 0 ? 'bg-5CD6C9' : 'bg-008375'"
        data-cy="btn__editar"
      >
        <i class="icon icon-editar"></i>
      </div>

      <router-link :to="link.to" class="linha-horizontal" tag="a">
        {{ link.title }}
      </router-link>
      <i class="icon icon-abrir_direita"></i>
    </section>

    <span v-else class="linha-horizontal disabled">
      <div
        @click="display = !display"
        class="editar"
        :class="index % 2 === 0 ? 'bg-5CD6C9' : 'bg-008375'"
        data-cy="btn__editar"
      >
        <i class="icon icon-editar"></i>
      </div>

      {{ link.title }}
    </span>

    <input-update
      class="input-update"
      :display="display"
      :description="'Editar'"
      :value="link.title"
      :step="step"
      @setUpdate="setFormValue"
    />
  </div>
</template>

<script>
import InputUpdate from '~/components/forms/InputUpdate'
export default {
  components: {
    InputUpdate
  },
  data () {
    return {
      display: false
    }
  },
  props: {
    link: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    actionType: {
      validator: value => ['go', 'close'].includes(value)
    },
    step: {
      type: String,
      required: true
    }
  },
  computed: {
    id () {
      switch (this.step) {
        case 'step__projetos':
          return this.link.to.query.projeto
        case 'step__fases':
          return this.link.to.query.fase
        case 'step__subatividades':
          return this.link.to.query.subatividade
      }
    }
  },
  methods: {
    setFormValue (field) {
      const table = this.step
      const data = { id: this.id, nome: field }
      this.$emit('setUpdate', { table, data })
      this.display = false
    }
  }
}
</script>

<style lang="scss" scoped>
.linha-horizontal {
  display: flex;
  align-items: center;
  color: #fff;
  opacity: 1;
  text-decoration: none;
  width: 100%;
  height: 55px;
  border: 0;
  transition: background-color 0.2s ease-in-out;

  .icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;

    &-abrir_direita {
      margin-left: auto;
    }
    &-editar {
      margin-right: 0;
    }
  }
  .editar {
    align-items: center;
    align-self: baseline;
    display: flex;
    justify-content: center;
    margin-right: 5px;
    width: 50px;
    height: 100%;
    &.bg-5CD6C9 {
      background-color: #5cd6c9;
    }
    &.bg-008375 {
      background-color: #008375;
    }

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  &:hover {
    background-color: #00a896;
  }
  &.disabled:hover {
    background-color: unset;
  }
}
</style>

<template>
  <div
    id="modal"
    :style="{ display: showModal ? 'flex' : 'none' }"
    @click="set(false)"
  >
    <div
      class="modal-content"
      :class="validateForm.disabled ? 'border-erro' : 'border-sucesso'"
    >
      <div id="sucesso" v-if="!validateForm.disabled">
        <h1>Horas registradas!</h1>
        <icon-sucesso style="max-width: 170px"></icon-sucesso>
        <ul>
          <li>
            <i class="icon icon-seta_esquerda"></i>
            Voltar ao início
          </li>
          <li>
            <i class="icon icon-lista"></i>
            Ver seus registros
          </li>
        </ul>
      </div>
      <div id="erro" v-else>
        <h1>Erro ao cadastrar!</h1>
        <icon-erro style="max-width: 170px"></icon-erro>
        <ul>
          <li :key="index" v-for="(item, index) in validateForm.msg">
            <i class="icon icon-incorreto"></i>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import IconSucesso from '~/components/elements/Sucesso'
import IconErro from '~/components/elements/Erro'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Modal',
  computed: {
    ...mapGetters('form-registrar-horas', ['showModal', 'validateForm'])
  },
  components: {
    IconSucesso,
    IconErro
  },
  methods: {
    ...mapMutations({
      set: 'form-registrar-horas/setShowModal'
    })
  }
}
</script>

<style lang="scss" scoped>
#modal {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.747);
  display: none;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: auto;
  z-index: 11;

  .modal-content {
    align-items: center;
    background-color: #fff;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    max-width: 400px;
    padding: 30px;

    #sucesso,
    #erro {
      width: 100%;
      align-items: center;
      display: flex;
      flex-direction: column;

      ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
          font-size: 20px;
          color: $verde;
        }
      }
    }
    #erro {
      ul {
        align-self: flex-start;
        li {
          color: $vermelho;
        }
      }
    }
  }

  .border-sucesso {
    border-top: 16px solid $verde;
  }
  .border-erro {
    border-top: 16px solid $vermelho;
  }
}
</style>

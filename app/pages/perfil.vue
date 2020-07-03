<template>
  <div class="perfil">
    <h1>Perfil</h1>

    <section class="perfil__forms">
      <a class="perfil__switch-display" @click="display = !display">
        <i class="icon icon-adicionar"></i>
        Atualizar dados cadastrais
      </a>
      <input-update
        description="Nome"
        value="Teste"
        :display="display"
        :checkAndEmail="true"
      />
    </section>
  </div>
</template>

<script>
import InputUpdate from '~/components/forms/InputUpdate'
export default {
  name: 'Perfil',
  layout: 'usuario',
  components: {
    InputUpdate
  },
  data () {
    return {
      display: false
    }
  }
}
</script>

<style lang="scss" scoped>
.perfil {
  padding: 2rem;

  h1 {
    color: #fff;
  }

  &__forms {
    width: 100%;
  }

  &__switch-display {
    background-color: $verde;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    color: #fff;
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
}
</style>

<template>
  <header>
    <div class="visible">
      <div class="logo">
        <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
      </div>
      <span class="title">
        <nuxt-link :to="admin ? '/admin' : '/'">
          <i class="icon icon-tempo"></i>
          <h1>Apropriação de horas</h1>
        </nuxt-link>
      </span>
      <ul class="user-menu" id="user-menu" :class="{ opened: userMenuState }">
        <li class="user-info" @click="userMenuState = !userMenuState">
          <span class="user-info__name">{{ nome }}</span>
          <div class="profile-placeholder">
            <user-profile-placeholder :opacity="1" />
          </div>
          <i class="icon icon-expandir"></i>
        </li>
        <template v-if="admin">
          <nuxt-link to="/admin/equipes" tag="li" class="class-user-info">
            <i class="icon icon-pessoa-outline"></i>
            <span>Equipes</span>
          </nuxt-link>

          <nuxt-link to="/admin/projetos" tag="li" class="class-user-info">
            <i class="icon icon-editar"></i>
            <span>Projetos</span>
          </nuxt-link>

          <nuxt-link to="/admin/relatorios" tag="li" class="class-user-info">
            <i class="icon icon-lista"></i>
            <span>Relatórios</span>
          </nuxt-link>
        </template>
        <template v-else>
          <nuxt-link to="/" tag="li" class="class-user-info">
            <i class="icon icon-lista"></i>
            <span>Relatórios</span>
          </nuxt-link>
        </template>
        <nuxt-link to="/registrar" tag="li" class="class-user-info">
          <i class="icon icon-tempo"></i>
          <span>Registrar horas</span>
        </nuxt-link>
        <li @click="sair" class="class-user-info">
          <span>Sair</span>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <div
        class="visible__shadow"
        v-if="userMenuState"
        @click="userMenuState = false"
      ></div>
    </transition>
  </header>
</template>

<script>
import LogoSpurb from '~/components/elements/LogoSpurb'
import UserProfilePlaceholder from '~/components/elements/UserProfilePlaceholder'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  data () {
    return {
      userMenuState: false
    }
  },
  components: { LogoSpurb, UserProfilePlaceholder },
  computed: {
    ...mapState({
      admin: state => state.usuario.admin,
      nome: state => state.usuario.nome,
      token: state => state.usuario.token
    })
  },
  watch: {
    $route (to, from) {
      this.userMenuState = false
    },
    userMenuState (state) {
      if (state) return true
      return false
    }
  },
  methods: {
    ...mapActions('usuario', ['logout']),
    sair () {
      this.logout(this.token)
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  box-shadow: $s-2-4-48;
  color: #000;
  .visible {
    max-width: 1200px;
    max-height: 6rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .logo {
      margin: auto 0;
      max-width: 135px;
      @media (max-width: $tablet) {
        display: none;
      }
    }
    .title {
      margin: 2rem 0;
      text-align: center;
      a {
        text-decoration: none;
        color: initial;
        .icon {
          color: $verde;
          font-size: 1.5rem;
        }
        h1 {
          display: inline;
          font-size: 1.25rem;
          line-height: 2rem;
          margin: 0;
          font-weight: normal;
        }
        @media (max-width: $tablet) {
          .icon {
            font-size: 1.25rem;
          }
          h1 {
            font-size: 1rem;
            line-height: 1rem;
          }
        }
      }
    }
    .user-menu {
      font-size: 1rem;
      white-space: nowrap;
      list-style-type: none;
      margin: 0.75rem 0 0;
      padding: 0;
      width: min-content;
      background-color: #fff;
      border-top-width: 1px;
      border-top-style: solid;
      border-top-color: transparent;
      border-radius: 0.25rem 2.25rem 0.25rem 0.25rem;
      transition: all ease-in-out 0.4s;
      z-index: 9;
      li,
      li > * {
        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
      }
      .user-info {
        display: flex;
        align-items: center;
        height: 4.5rem;
        padding: 0 0 0 1.25rem;
        cursor: pointer;
        transition: all ease-in-out 0.2s;
        border-radius: 0.25rem 2.25rem 0.25rem 0.25rem;
        &__name {
          @media (max-width: 500px) {
            display: none;
          }
        }
        .profile-placeholder {
          margin: 0 0 0 1rem;
          @media (max-width: 500px) {
            margin: 0 0 0 auto;
          }
        }
        .icon {
          margin-right: 0.25rem;
          transform: translateY(0);
          opacity: 1;
          transition: all ease-in-out 0.2s 0.4s;
        }
        &:hover {
          box-shadow: $s-2-4-48;
        }
      }
      .nuxt-link-exact-active {
        background: #ececec;
      }
      li:not(.user-info) {
        line-height: 2.5rem;
        max-height: 0;
        margin-top: -0.05rem;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: transparent;
        padding: 0 1rem;
        cursor: pointer;
        opacity: 0;
        transition: all ease-in-out 0.2s;
        .icon {
          color: $verde;
          font-size: 1.25rem;
          margin: 0 0.25rem 0 0;
        }
        &:hover {
          background-color: $lightborder;
          &.disabled {
            background-color: unset;
          }
        }
        &:last-child {
          border-radius: 0 0 0.25rem 0.25rem;
        }
      }
      &.opened {
        border-top-color: $lightborder;
        box-shadow: $s-2-4-48;
        li.user-info {
          .icon {
            opacity: 0;
            transform: translateY(-0.25rem);
          }
          &:hover {
            box-shadow: none;
          }
        }
        li:not(.user-info) {
          border-top-color: $lightborder;
          max-height: 2.5rem;
          margin-top: 0;
          opacity: 1;
          &.disabled {
            opacity: 0.5;
          }
        }
      }
    }
    &__shadow {
      z-index: 5;
      position: fixed;
      background-color: rgba(0, 0, 0, 0.4);
      height: 100vh;
      width: 100vw;
      &.fade-enter-active,
      &.fade-leave-active {
        transition: opacity 0.2s;
      }
      &.fade-enter,
      &.fade-leave-to {
        opacity: 0;
      }
    }
    @media (max-width: $tablet) {
      margin: 0 0.5rem;
    }
  }
}
</style>

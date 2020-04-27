<template>
  <header>
    <div class="visible">
      <div class="logo">
        <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
      </div>
      <span class="title">
        <nuxt-link to="/">
          <i class="icon icon-tempo"></i>
          <h1>Apropriação de horas</h1>
        </nuxt-link>
      </span>
      <ul class="user-menu" id="user-menu" :class="{ opened: userMenuState }">
        <li class="user-info" @click="tellParent">
          Nome Sobrenome
          <div class="profile-placeholder">
            <user-profile-placeholder :opacity="1" />
          </div>
          <i class="icon icon-expandir"></i>
        </li>
        <nuxt-link to="/registrar" tag="li" class="class-user-info">
          <i class="icon icon-editar"></i>
          <span>Registrar horas</span>
        </nuxt-link>
        <li class="disabled">
          <i class="icon icon-calendario_vazio"></i>
          <span>Agenda</span>
        </li>
        <li class="disabled">
          <i class="icon icon-lista"></i>
          <span>Registros</span>
        </li>
        <li class="disabled">
          <i class="icon icon-oficio"></i>
          <span>Relatórios</span>
        </li>
        <li class="disabled">
          <i class="icon icon-pessoa-outline"></i>
          <span>Gerenciar equipes</span>
        </li>
      </ul>
    </div>
    <div class="slideable" :class="{ hidden: !fullHeader }">
      <div class="user-info">
        <img class="prof120x120" src="" alt="Imagem de perfil 120x120" />
        <div>
          <h2>Nome Sobrenome</h2>
          <!-- from get -->
          <span>Cargo atribuído</span>
          <!-- from get -->
          <span>Gerência</span>
          <!-- from get -->
        </div>
      </div>
      <div class="ultimo-registro">
        <div class="label">
          <span> <i class="icon icon-lista"></i> Último registro </span>
          <a href=""> Ver todos <i class="icon icon-seta_direita"></i> </a>
        </div>
        <div class="data">
          <span class="date">Ontem &middot; 17/12/2019</span>
          <!-- from get -->
          <span class="time">
            4h &middot; PIU Jockey Club &rsaquo; Consolidação &rsaquo; Mapas e
            Quadros
          </span>
          <!-- from get -->
        </div>
      </div>
      <div class="a-registrar">
        <div class="label">
          <span> <i class="icon icon-editar"></i> À registrar </span>
          <a href="">
            Registrar horas <i class="icon icon-seta_direita"></i>
          </a>
        </div>
        <ul class="pendentes">
          <li>
            16/12/2019 &middot; 8h<button class="edit">
              <i class="icon icon-editar"></i>
            </button>
          </li>
          <li>
            17/12/2019 &middot; 4h<button class="edit">
              <i class="icon icon-editar"></i>
            </button>
          </li>
          <li>
            18/12/2019 &middot; 8h<button class="edit">
              <i class="icon icon-editar"></i>
            </button>
          </li>
          <li>
            19/12/2019 &middot; 8h<button class="edit">
              <i class="icon icon-editar"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import LogoSpurb from '~/components/elements/LogoSpurb'
import UserProfilePlaceholder from '~/components/elements/UserProfilePlaceholder'

export default {
  name: 'AppHeader',
  props: ['userMenuState', 'fullHeaderFromParent'],
  data () {
    return {}
  },
  components: { LogoSpurb, UserProfilePlaceholder },
  computed: {
    fullHeader () {
      return this.$props.fullHeaderFromParent
    }
  },
  methods: {
    tellParent () {
      this.$emit('toggle-menu', document.querySelector('#user-menu'))
    }
  }
}
</script>

<style lang="scss">
header {
  background-color: #fff;
  box-shadow: $s-2-4-48;
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
    }
    span.title {
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
      }
    }
    ul.user-menu {
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
      z-index: 10;
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
        .profile-placeholder {
          margin: 0 0 0 1rem;
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
      .nuxt-link-active {
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
  }
  .slideable {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    max-width: 1200px;
    height: calc(120px + 2rem);
    margin: 0 auto;
    padding-bottom: 2rem;
    overflow: hidden;
    transition: opacity ease-out 0.2s 0.4s, height ease-in-out 0.2s,
      padding-bottom ease-in-out 0.2s;
    & > div {
      width: calc((100% - 4rem) / 3);
      &:not(:last-child) {
        margin-right: 2rem;
      }
      &.user-info {
        display: flex;
        img.prof120x120 {
          width: 7.5rem;
          height: 7.5rem;
          border-radius: 100%;
          margin-right: 1rem;
          display: inline-block;
          background-color: grey;
        }
        & > div {
          display: inline-flex;
          flex-flow: column nowrap;
          justify-content: center;
          width: calc(100% - 120px - 1rem);
          height: 100%;
          h2 {
            font-size: 1.5rem;
            font-weight: normal;
            margin: 0 0 0.5rem;
          }
          span {
            display: block;
            color: $cinza1;
            margin-top: 0.25rem;
          }
        }
      }
      &.ultimo-registro,
      &.a-registrar {
        @include bg-black-alpha(0.06);
        border-radius: 1rem;
        padding: 1rem;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        .label {
          font-size: 0.75rem;
          line-height: 0.75rem;
          text-transform: uppercase;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          & > span {
            line-height: inherit;
            color: $cinza1;
            .icon {
              font-size: 1.25rem;
              line-height: 0.75rem;
              color: $verde;
              &:before {
                line-height: inherit;
                vertical-align: middle;
              }
            }
          }
          & > a {
            line-height: inherit;
            text-decoration: none;
            transition: all ease-in 0.1s;
            .icon:before {
              line-height: inherit;
              vertical-align: text-top;
            }
            &:hover {
              color: initial;
            }
          }
        }
      }
      &.ultimo-registro .data {
        span {
          display: block;
        }
        .date {
          font-size: 1.25rem;
        }
        .time {
          color: $cinza1;
          margin-top: 0.25rem;
        }
      }
      &.a-registrar .pendentes {
        list-style-type: none;
        padding: 0;
        margin: 0;
        column-count: 2;
        column-gap: 1rem;
        li {
          &:not(:nth-child(2n)) {
            margin-bottom: 0.75rem;
          }
          button {
            border: 0;
            background-color: $verde;
            color: #fff;
            padding: 0.06rem 0.05rem;
            border-radius: 2rem;
            cursor: pointer;
            margin-left: 0.25rem;
            .icon:before {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 0.75rem;
              height: 0.75rem;
            }
          }
        }
      }
    }
    &.hidden {
      height: 0;
      padding-bottom: 0;
      opacity: 0;
      z-index: -1;
      transition: opacity ease-out 0.2s, height ease-in-out 0.2s 0.4s,
        padding-bottom ease-in-out 0.2s 0.4s;
    }
  }
}
</style>

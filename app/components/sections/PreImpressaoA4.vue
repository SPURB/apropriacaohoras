<template>
  <div
    class="pre-impressao-a4"
    ref="a4"
    :style="
      `height: ${height}px; padding: ${paddingTop}px ${paddingRightLeft}px ${paddingBottom}px`
    "
  >
    <div class="pre-impressao-a4__header">
      <logo-spurb
        class="pre-impressao-a4__logo"
        :style="`max-width:${logoMaxWidth}px`"
        :fill-type="'#1D1D1B'"
        :fill-brand="'#038375'"
      />
      <p>{{ paginationIndex }} de {{ paginationTotal }}</p>
    </div>
    <div class="pre-impressao-a4__main" :style="`height:${mainHeight}`">
      <slot />
    </div>
    <div class="pre-impressao-a4__footer">
      <p>Verifique este documento<br />{{ origin }}</p>
      <p class="pre-impressao-a4__footer--right">
        Relatório gerado em <br />{{ now }}
      </p>
    </div>
  </div>
</template>
<script>
import LogoSpurb from '~/components/elements/LogoSpurb'
export default {
  name: 'PreImpressaoA4',
  components: {
    LogoSpurb
  },
  data () {
    return {
      origin: '',
      now: '',
      width: 800
    }
  },
  props: {
    paginationIndex: {
      type: Number,
      required: true
    },
    paginationTotal: {
      type: Number,
      required: true
    }
  },
  computed: {
    height () {
      return this.width * 1.51
    },
    logoMaxWidth () {
      return this.width * 0.179
    },
    paddingTop () {
      if (this.width < 638) {
        return 0
      }
      return this.height * 0.054
    },
    paddingRightLeft () {
      if (this.width < 638) {
        return 0
      }
      return this.width * 0.127
    },
    paddingBottom () {
      if (this.width < 638) {
        return 0
      }
      return this.height * 0.024
    },
    mainHeight () {
      if (this.width < 638) {
        return '100%'
      }
      return `${this.height * 0.8}px`
    }
  },
  mounted () {
    this.width = this.$refs.a4.offsetWidth
    this.$emit('getA4Width', this.width)
    this.origin = `${window.location.host}/apropriacaohoras/`

    const now = this.$moment()
    const dia = now.format('YYYY MM DD')
    const horario = now.format('hh:mm').replace(':', 'h')
    this.now = `${dia} às ${horario}`
  }
}
</script>
<style lang="scss" scoped>
.pre-impressao-a4 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  font-size: small;
  border: 1px solid #ebe6e6;
  box-shadow: 4px 4px 8px rgba(125, 124, 124, 0.25);
  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__header {
    padding-bottom: 1rem;
    border-bottom: 1px solid $cinza1;
    p {
      margin-top: 24px;
      margin-bottom: 0;
    }
  }
  &__main {
    display: flex;
    flex-direction: column;
  }
  &__footer {
    border-top: 1px solid $cinza1;
    &--right {
      text-align: right;
    }
  }
  @media (max-width: 669px) {
    border: unset;
    box-shadow: unset;
  }
}
</style>

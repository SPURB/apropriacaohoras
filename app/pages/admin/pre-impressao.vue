<template>
  <div class="pre-impressao-admin">
    <pre-impressao-a4 :paginationIndex="1" :paginationTotal="1">
      <h2>{{ nome }}</h2>
    </pre-impressao-a4>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import PreImpressaoA4 from '~/components/sections/PreImpressaoA4'
export default {
  name: 'PreImpressaoAdmin',
  layout: 'pre-impressao',
  components: {
    PreImpressaoA4
  },
  computed: {
    ...mapState('usuario', ['nome'])
  }
}
</script>

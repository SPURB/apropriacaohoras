<template>
  <div class="admin-list">
    <ul class="admins-list__list">
      <li v-for="(admin, index) in admins" :key="index">{{ admin }}</li>
    </ul>
  </div>
</template>
<script>
import Usuario from '~/services/api-usuario'

export default {
  name: 'AdminsList',
  data () {
    return {
      admins: []
    }
  },
  async created () {
    try {
      const { data } = await Usuario.get('admin=1')
      this.admins = data.data.map(admin => admin.nome).sort()
    } catch (err) {}
  }
}
</script>

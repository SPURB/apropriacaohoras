<template>
  <div class="admin-list">
    <ul class="admins-list__list">
      <li>1</li>
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
      const { data } = await Usuario.get('admin=true')
      this.admins = data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

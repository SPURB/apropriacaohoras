<template>
  <div>
    <section class="card-horizontal" :class="showEditable ? 'elevated' : ''">
      <router-link :to="to" tag="a" class="card-horizontal__left">
        <h3 class="card-horizontal__title">{{ title }}</h3>
        <p class="card-horizontal__subtitle" v-if="subtitle">
          <i v-if="subtitleIconClass" :class="subtitleIconClass"></i>
          {{ subtitle }}
        </p>
      </router-link>
      <div
        class="card-horizontal__right"
        v-if="isEditable.editable"
        @click="showEditable = !showEditable"
      >
        <i class="icon icon-editar"></i>
      </div>
    </section>
    <section class="card-horizontal__form" v-if="showEditable">
      <card-update
        :title="title"
        :description="subtitle"
        :id="isEditable.id"
        @updateCard="update"
        @cancel="closeCard"
      />
    </section>
  </div>
</template>

<script>
import CardUpdate from '~/components/forms/CardUpdate'
export default {
  name: 'CardRouter',
  components: {
    CardUpdate
  },
  data () {
    return {
      showEditable: false,
      bodyUpdate: {} // serve para disparar o emit pro pai
    }
  },
  props: {
    to: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    subtitleIconClass: {
      type: String,
      default: ''
    },
    display: {
      type: Boolean,
      required: false,
      default: false
    },
    isEditable: {
      type: Object,
      required: false,
      default: () => {
        return { editable: false, id: 0 }
      }
    }
  },
  computed: {
    entidade () {
      return this.isEditable.entidade
    }
  },
  watch: {
    bodyUpdate () {
      this.$emit('updateCard', {
        body: this.bodyUpdate
      })
    },
    watch: {
      display (val) {
        this.showEditable = val
      }
    }
  },
  methods: {
    update (value) {
      this.bodyUpdate = value
    },
    closeCard () {
      this.showEditable = false
    }
  }
}
</script>
<style lang="scss" scoped>
.card-horizontal {
  width: 100%;
  margin: 0;
  flex-direction: row;
  height: max-content;
  background: #fff;
  display: flex;
  border-radius: 12px;
  font-family: $grot;
  line-height: 1.62;
  border-left: $verde solid 12px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
  transition: all ease-in-out 0.35s;
  justify-content: space-between;

  &__left {
    padding: 1.5rem 1.25rem 1.5rem 1rem;
    width: 90%;
    text-decoration: none;
  }
  &__right {
    padding: 5px 7px 0px 0px;
    .icon {
      font-size: 1.8rem;
      color: $verde;
    }
  }
  &__form {
    margin-top: -15px;
    border-bottom-left-radius: 12px;
    border-left: $verde solid 12px;
  }
  &__title,
  &__subtitle {
    margin: 0;
  }
  &__title {
    color: $preto;
    font-weight: 700;
    // padding-left: 0.42rem;
  }
  &__subtitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: $cinza1;

    .icon {
      color: $verde;
      font-size: 26px;
      margin-left: -0.42rem;
    }
  }
  &:hover {
    box-shadow: 1px 5px 9px rgba(0, 0, 0, 0.48);
    transform: translate(1px, -1px);
  }

  &.elevated {
    transform: translate(0.2px, -1px);
  }
}
</style>

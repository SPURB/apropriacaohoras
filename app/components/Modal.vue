<template>
  <div id="modal"
    :style="{ display: showModal ? 'flex' : 'none' }"
  >      
    <div class="modal-content">

        <svg width="172" height="172" viewBox="0 0 172 172" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M86.0001 28.6667C54.3521 28.6667 28.6667 54.3521 28.6667 86.0001C28.6667 117.648 54.3521 143.333 86.0001 143.333C117.648 143.333 143.333 117.648 143.333 86.0001C143.333 54.3521 117.648 28.6667 86.0001 28.6667ZM74.5334 114.667L45.8667 86.0001L53.9507 77.9161L74.5334 98.4414L118.049 54.9254L126.133 63.0667L74.5334 114.667Z" fill="#038375"/>
        </svg>

        <h1>Horas registradas!</h1>

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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Modal',
    computed: {
        ...mapGetters(['showModal'])
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
        background-color: #FFF;
        border-radius: 16px;
        border-top: 16px solid $verde;
        display: flex;
        flex-direction: column;
        max-width: 400px;
        padding: 30px;

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
}
</style>
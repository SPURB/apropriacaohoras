<template>
    <div class="visible">
        <svg
            v-if="visible"
            width="30"
            height="30"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M24 9C14 9 5.46 15.22 2 24C5.46 32.78 14 39 24 39C34 39 42.54 32.78 46 24C42.54 15.22 34 9 24 9ZM24 34C18.48 34 14 29.52 14 24C14 18.48 18.48 14 24 14C29.52 14 34 18.48 34 24C34 29.52 29.52 34 24 34ZM24 18C20.68 18 18 20.68 18 24C18 27.32 20.68 30 24 30C27.32 30 30 27.32 30 24C30 20.68 27.32 18 24 18Z"
                fill="white"
            />
            <rect
                x="6.38647"
                y="6.08081"
                width="50.203"
                height="3.41099"
                transform="rotate(45 6.38647 6.08081)"
                fill="white"
            />
            <rect
                x="9.04004"
                y="3.427"
                width="50.2031"
                height="3.75306"
                transform="rotate(45 9.04004 3.427)"
                fill="#005249"
            />
        </svg>
        <svg
            v-else
            width="30"
            height="30"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M24 9C14 9 5.46 15.22 2 24C5.46 32.78 14 39 24 39C34 39 42.54 32.78 46 24C42.54 15.22 34 9 24 9ZM24 34C18.48 34 14 29.52 14 24C14 18.48 18.48 14 24 14C29.52 14 34 18.48 34 24C34 29.52 29.52 34 24 34ZM24 18C20.68 18 18 20.68 18 24C18 27.32 20.68 30 24 30C27.32 30 30 27.32 30 24C30 20.68 27.32 18 24 18Z"
                fill="white"
            />
        </svg>
    </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>
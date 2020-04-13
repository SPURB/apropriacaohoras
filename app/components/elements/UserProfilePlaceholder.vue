<template>
  <svg
    :opacity="opacity"
    class="user-profile-placeholder"
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
  >
    <circle cx="16.5078" cy="16" r="16" fill="#005249" />
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="33"
      height="32"
    >
      <circle cx="16.5078" cy="16" r="16" fill="#A3DFF5" />
    </mask>
    <g mask="url(#mask0)">
      <ellipse
        cx="16.5076"
        cy="12.7814"
        rx="6.38139"
        ry="6.3814"
        fill="#5CD6C9"
      />
      <path
        d="M16.5077 21.5938C10.4659 21.5938 5.56812 26.4916 5.56812 32.5333H27.4472C27.4472 26.4916 22.5494 21.5938 16.5077 21.5938Z"
        fill="#5CD6C9"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'UserProfilePlaceholder',
  props: {
    opacity: {
      type: Number,
      default: 1
    }
  }
}
</script>

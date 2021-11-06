<template>
  <div
    id="header-app"
    class="sticky-top px-3 bg-white"
  >
    <img
      :src="require('@/assets/images/logo.png')"
      class="img-logo"
      alt="logo"
    >  
  </div>
</template>

<script>
export default {
  name: 'header-web-app'
}
</script>

<style lang="scss">
.img-logo {
  height: 90px;
}
</style>
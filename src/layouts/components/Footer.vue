<template>
  <div  
    id="footer-app"
    class="bg-black text-white"
  >   
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        <div>
          <facebook-icon size="1.5x"/>
        </div>
        <div class="mx-4">
          <instagram-icon size="1.5x"/>
        </div>
        <div>
          <twitter-icon size="1.5x"/>
        </div>
      </div>
      <small>
        Terms & Condition
        <span class="mx-3">|</span>
        Copyright &copy; 2018. All rights reserved. PT Radya Gita Bahagi
      </small>
    </div>
  </div>
</template>

<script>
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'vue-feather-icons'

export default {  
  name: 'footer-web-app',
  components: {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon
  },
}
</script>

<style lang="scss">
#footer-app {
  padding: 30px 70px !important;
}
</style>
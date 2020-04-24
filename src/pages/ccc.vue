<template>
  <div style="width: 100vw;height: 100vh">
    <img src="./img/address.png" alt="" width="100%" height="100%">

    <div style="position: fixed;right: 101px;top:240px;;z-index: 2;font-size: 12px !important;" class="color_ccc">
      {{local}}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        local:'',
      }
    },
    watch: {},
    computed: {},
    created() {

    },
    mounted() {
      let date = new Date()
      let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      this.local = `${date.getFullYear()}.0${date.getMonth() + 1}.${date.getDate()} ${hours}:${minutes}:${seconds}`
    },
    methods: {

    },
    components: {}
  }
</script>

<style scoped>
.color_ccc{
  color: #989898;
}
</style>

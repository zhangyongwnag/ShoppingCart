<template>
  <div class="wrap">

    <div style="position: fixed;left: 122px;top:74px;z-index: 2;color: #666;font-size: 16px !important;">
      <div style="text-align: center">{{local}}</div>
      <div style="text-align: center">{{localTime}}</div>
    </div>

    <div class="img_wrap">
      <img src="./img/2222.png" alt="" v-if="status">
      <img src="./img/3.png" alt="" v-else>
    </div>

    <div style="position: fixed;right: 41px;bottom:245px;z-index: 2;color: #000;font-size: 15px !important;">
      {{timeStart}}
    </div>

    <div style="position: fixed;right: 41px;bottom:217px;;z-index: 2;color: red;font-size: 15px !important;">
      {{timeEnd}}
    </div>

    <div style="position: fixed;left:20px;right: 20px;bottom:136px;;z-index: 2;font-size: 15px !important;">
      <div class="button_back">返回首页</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'Hello Vue.js!',
        interval: '',
        local: '',
        localTime: '',
        timeEnd: '',
        status: true
      }
    },
    created() {
      this._getLocalTime()
      this._getTime()
      this._setImg()
    },
    methods: {
      _getLocalTime() {
        this.interval = setInterval(() => {
          let date = new Date()
          this.local = `${date.getFullYear()}年0${date.getMonth() + 1}月${date.getDate()}日`
          let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
          let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
          let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
          this.localTime = `${hours}:${minutes}:${seconds}`
        }, 1000)
      },
      _getTime() {
        let date = new Date()
        let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        this.timeStart = `${date.getMonth() + 1}-${date.getDate()} ${hours}:${minutes}`
        this.timeEnd = `${date.getMonth() + 1}-${date.getDate()} 24:00`
      },
      _setImg() {
        setInterval(() => {
          this.status = !this.status
        }, 300)
      }
    }
  }
</script>

<style scoped>
  .wrap{
    background-image: url(./img/bj.png);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-size: 100% 100%;
  }
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Micrxosoft YaHei" !important;
    user-select: none;
  }

  header {
    background-color: blue;
  }

  header div {
    display: flex;
    align-items: center;
  }

  header div img {
    width: 30px;
  }

  .button_back {
    width: 100%;
    background-color: #0B8CE7;
    color: #fff;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-radius: 6px;
    font-size: 17px;
  }

  .img_wrap {
    width: 200px;
    height: 200px;
    position: fixed;
    left: 80px;
    top: 123px;
    z-index: 2;
  }

  .img_wrap img {
    width: 100%;
    height: 100%;
  }

  .button_back:active {
    background-color: #ccc;
    color: #000;
  }
</style>

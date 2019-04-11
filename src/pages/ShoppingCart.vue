<template>
  <div>
    <header>
      <div class="headerTitlle">
        <p><</p>
        <p>购物车</p>
        <p @click="manageStatus = true" v-if="!manageStatus">管理</p>
        <p @click="manageStatus = false" v-else>完成</p>
      </div>
    </header>

    <section v-if="!loading">
      <div class="contentWrap" v-for="(item,index) in shoppingList" @click="changeChooiseStatus(item.id,index)">
        <div class="shoppingCheck" v-if="!manageStatus">
          <img src="../assets/true.png" alt="" v-if="item.chooiseStatus">
          <img src="../assets/false.png" alt="" v-else>
        </div>
        <div class="shoppingCheck" v-else>
          <img src="../assets/check.png" alt="" v-if="item.deleteStatus">
          <img src="../assets/checkbox.png" alt="" v-else>
        </div>
        <div class="shoppingInfo">
          <div class="shoppingImgWrap">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="goodsInfo">
            <p>{{item.title}}</p>
            <p>{{item.description}}</p>
            <p>￥{{item.price}} <span style="text-align: right;color: #666;">x{{item.count}}</span></p>
          </div>
        </div>
      </div>
    </section>

    <div class="spinner" style="margin-top: 200px;" v-else>
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>

    <div v-if="shoppingList.length">
      <footer v-if="!manageStatus">
        <div class="checkAll" @click="changeAllChooiseStatus">
          <img src="../assets/true.png" alt="" v-if="!changeAllStatus.length">
          <img src="../assets/false.png" alt="" v-else>
          全选
        </div>
        <div class="price">
          共：<span>￥{{price}}</span>
          <p @click="submit">立即结算</p>
        </div>
      </footer>

      <footer v-else>
        <div class="checkAll" @click="changeAllChooiseStatus">
          <img src="../assets/check.png" alt="" v-if="!changeAllDeleteStatus.length">
          <img src="../assets/checkbox.png" alt="" v-else>
          全选
        </div>
        <div class="price">
          共：<span>{{total.length}}件</span>
          <p @click="deleteGoods" style="background-color: #333333;">删除</p>
        </div>
      </footer>
    </div>

  </div>
</template>
<script>
  import {mapState,mapGetters} from 'vuex'
  export default {
    data() {
      return {
        loading:false,
        manageStatus:false,
      }
    },
    computed:{
      ...mapState({
        'shoppingList':state => state.shopping.shoppingList
      }),
      ...mapGetters(['changeAllStatus','price','changeAllDeleteStatus','total'])
    },
    created(){
      this.loading = true
      this.$store.dispatch('getShoppingList')
        .then(res => {
//          console.log(res)
          setTimeout(()=>{
            this.loading = false
          },1000)
        })
        .catch(err => {
          setTimeout(()=>{
            this.loading = false
          },1000)
        })
    },
    methods:{
      changeChooiseStatus(id,index){
        let data = {
          id:id,
          manageStatus:this.manageStatus
        }
        this.$store.dispatch('getChangeChooiseStatus',data)
      },
      changeAllChooiseStatus(){
        let data = {}
        if (!this.manageStatus){
          data = {
            status:this.changeAllStatus.length ? true : false,
            manageStatus:this.manageStatus
          }
        }else {
          data = {
            status:this.changeAllDeleteStatus.length ? true : false,
            manageStatus:this.manageStatus
          }
        }
        this.$store.dispatch('getAllChangeChooiseStatus',data)
      },
      submit(){
        let goodsIdList = []
        this.shoppingList.map(item => {
          item.chooiseStatus ? goodsIdList.push(item.id) : ''
        })
        goodsIdList.length ? alert(`商品ID：${goodsIdList.join(",")}`) : alert('请选择商品')
      },
      deleteGoods(){
        let goodsIdList = []
        this.shoppingList.map(item => {
          item.deleteStatus ? goodsIdList.push(item.id) : ''
        })
        //底部对话框
        layer.open({
          content: `确定删除${goodsIdList.length}个商品吗？`
          ,btn: ['删除', '取消']
          ,skin: 'footer'
          ,yes: index => {
            this.$store.dispatch('getDeleteGoods',goodsIdList)
            //底部提示
            layer.open({
              content: `成功删除${goodsIdList.length}个商品`
              ,skin: 'footer'
            });
          }
        });
      }
    }
  }
</script>
<style scoped>
  header{
    height:50px;
    border: 1px #eee solid;
    box-shadow: 0 0 10px 2px rgba(0, 2, 0, 0.1);
    padding: 0 10px;
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    top: 0;
    background-color: #fff;
    z-index: 1;
  }
  .headerTitlle{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .headerTitlle p:nth-child(3){
    color: dodgerblue;
    font-size: 14px;
  }

  section{
    margin:60px 0;
  }
  .contentWrap{
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
    height:80px;
    position: relative;
    border-radius: 5px;
    margin-top: 10px;
  }
  .contentWrap:nth-child(1){
    margin-top: 0px;
  }
  .contentWrap::before{
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    border-color: #000;
    background-color: #000;
    border-radius: inherit;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .contentWrap:active::before {
    opacity: 0.3;
  }
  .shoppingCheck{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height:100px;
  }
  .shoppingCheck img{
    width: 20px;
  }
  .shoppingInfo{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }
  .shoppingImgWrap{
    border: 1px #eee solid;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height:80px;
  }
  .shoppingInfo img{
    width: 60px;
    height:60px;
  }
  .goodsInfo{
    height:80px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-top: 50px;
    margin-left: 10px;
    width: calc(100% - 100px);
  }
  .goodsInfo p{
    /*display: inline-block;*/
    height:10px;
    margin-top: -35px;
  }
  .goodsInfo p:nth-child(2){
    font-size: 14px;
    color: #999;
    margin-bottom: 25px;
  }
  .goodsInfo p:nth-child(3){
    font-size: 18px;
    color: #f82a59;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .goodsInfo p:nth-child(3) span{
    font-size: 16px;
    color: #333;
  }

  footer{
    width: 100%;
    height:55px;
    border-top: 1px #eee solid;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0px 0 10px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .checkAll{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .checkAll img{
    width: 20px;
    margin-right: 5px;
  }
  .price{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .price span{
    font-size: 19px;
    color: #f82a59;
  }
  .price p{
    width: 70px;
    margin-left: 20px;
    background-color: #f82a59;
    height:55px;
    text-align: center;
    line-height: 55px;
    padding: 0 20px;
    color: #fff;
    position: relative;
  }
  .price p::before{
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    border-color: #000;
    background-color: #000;
    border-radius: inherit;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .price p:active::before {
    opacity: 0.3;
  }

  .spinner {
    margin: 100px auto 0;
    width: 150px;
    text-align: center;
  }

  .spinner > div {
    width: 20px;
    height: 20px;
    background-color: #f82a59;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 40% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
  }
</style>

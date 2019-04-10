import Vue from 'vue'
import store from '../index'
import axios from 'axios'

export default {
  state:{
    shoppingList:[]
  },
  getters:{
    changeAllStatus(state){
      return state.shoppingList.filter(item => !item.chooiseStatus)
    },
    price(state){
      return state.shoppingList.reduce((total,item) => total + (item.chooiseStatus ? item.price * item.count : 0),0)
    },
    changeAllDeleteStatus(state){
      return state.shoppingList.filter(item => !item.deleteStatus)
    },
    total(state){
      return state.shoppingList.filter(item => item.deleteStatus)
    },
  },
  mutations:{
    setShoppingList(state,data){
      state.shoppingList = data
      state.shoppingList.map(item => {
        item.chooiseStatus = false //结算选中的状态
        item.deleteStatus = false // 删除选中的状态
      })
    },
    setChangeChooiseStatus(state,data){
      for (let i in state.shoppingList){
        let item = state.shoppingList[i]
        if (item.id === data.id){
          data.manageStatus ? item.deleteStatus = !item.deleteStatus : item.chooiseStatus = !item.chooiseStatus
        }
        Vue.set(state.shoppingList,i,item)
      }
    },
    setAllChangeChooiseStatus(state,data){
      for (let i in state.shoppingList){
        let item = state.shoppingList[i]
        data.manageStatus ? item.deleteStatus = data.status :item.chooiseStatus = data.status
        Vue.set(state.shoppingList,i,item)
      }
    },
    setDeleteGoods(state,data){
      state.shoppingList = state.shoppingList.filter(item => (data.indexOf(item.id) == -1))
    }
  },
  actions:{
    getShoppingList({commit}){
      return new Promise((resolve,reject) => {
        axios.get('/shoppingList')
          .then(res => {
            if (res.data.code == 100){
              commit('setShoppingList',res.data.data.list)
              resolve(res.data.data.list)
            }else {
              reject(res.data)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getChangeChooiseStatus({commit},data){
      commit('setChangeChooiseStatus',data)
    },
    getAllChangeChooiseStatus({commit},data){
      commit('setAllChangeChooiseStatus',data)
    },

    getDeleteGoods({commit},data){
      commit('setDeleteGoods',data)
    }
  }
}

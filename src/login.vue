<template>
  <div>
    <x-header :left-options="{showBack: false}">欢迎登陆</x-header>
    <group class="title_group">
      <x-input title="用户名" placeholder="用户名/手机号/身份证号" v-model="model.username"></x-input>
      <x-input title="密码" placeholder="密码"   type="password"
               v-model="model.password"></x-input>
    </group>
    <div class="footer_div">
      <x-button class="submit_btn login_btn" @click.native="login">登陆</x-button>
      <a href="javascript:void(0)" class="register" @click="register">注册</a>
        <a href="javascript:void(0)" class="forget_psd">忘记密码?</a>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, XInput, XButton, PopupPicker} from 'vux'
import api from './router/api'

export default {
  components: {XHeader, Group, XInput, XButton, PopupPicker},
  data () {
    return {
      type: [],
      model: {
        username: '',
        password: '',
        usertype: '3'
      },
      list: [['身份证', '军官证']]
    }
  },
  mounted () {
    window.localStorage.clear()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.preUrl = from.fullPath
    })
  },
  methods: {
    login () {
      let name = document.getElementsByTagName('input')[0].value.trim()
      let pwd = document.getElementsByTagName('input')[1].value.trim()
      this.model.username = name
      this.model.password = pwd
      if (this.model.username === '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请输入证件号码'
        })
        return
      }
      if (this.model.password === '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请输入密码'
        })
      }
      this.$vux.loading.show({text: '登录中'})
      let params = api.getParam('s01', this.model)
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          // 保存身份证号码
          window.localStorage['aac002'] = data.data.aac002
          window.localStorage['token'] = data.data.token.token
          window.localStorage['nowPersonNo'] = data.data.userData.aac001
          window.localStorage['userInfo'] = JSON.stringify(data.data.userData)
          if (this.preUrl === '/') {
            this.$router.replace('/index')
          } else {
            if (history.length > 1 && this.preUrl !== '/register') {
              this.$router.replace(this.preUrl)
              history.go(-1)
            } else {
              this.$router.replace('/index')
            }
          }
          this.loadPersonAccount()
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 查询个人编号列表
    loadPersonAccount () {
      let params = api.getParam('F002.001.011')
      api.postData(this, params).then((data) => {
        if (data.code === 0) {
          window.localStorage['personNoList'] = JSON.stringify(data.data)
          // window.localStorage['nowPersonNo'] = data.data[0].AAC001
          // this.confirmAccount(data.data[0].AAC001)
        } else {
          // this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
      })
    },
    // 确认账户 根据个人编号
    /* confirmAccount (personNo) {
      let params = api.getParam('s32', {aac001: personNo})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    }, */
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped lang="less">
  .footer_div {
    padding: 0 15px;
    .login_btn {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    a {
      color: #777;
    }
    .forget_psd {
      float: right;
    }
  }
</style>

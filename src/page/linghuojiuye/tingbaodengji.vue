<template>
  <div class="tbdj">
    <x-header :left-options="{backText: ''}">停保登记</x-header>
    <div v-show="step===1">
      <div class="title ">
        <span>基本信息(1/2)</span>
      </div>
      <Group class="title_group">
        <cell title="姓名" :value="baseInfo.aac003"></cell>
        <cell title="性别" :value="fmtSex(baseInfo.aac004)"></cell>
        <cell title="身份证号码" :value="baseInfo.aac002"></cell>
        <cell title="经办机构"  :value="baseInfo.aab301"></cell>
        <cell title="文化程度"   :value="baseInfo.aac011" ></cell>
        <cell title="户口性质"   :value="baseInfo.aac009" ></cell>
        <cell title="户口所在地"  :value="baseInfo.aac010"></cell>
        <cell title="通讯地址"   :value="baseInfo.aae006"></cell>
      </Group>
      <div class="notice">
        <div>注：外地户籍人员，请先停医疗保险，再停养老保险。</div>
      </div>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
      </div>
    </div>
    <div v-show="step===2">
      <div class="title ">
        <span>缴费信息(2/2)</span>
      </div>
      <Group class="title_group" label-width="120px">
        <div class="item_wrapper">
          <span class="tip">*</span>
          <popup-radio title="停保险种" :options="options" v-model="baseInfo.aae140"></popup-radio>
        </div>
      </Group>
      <group>
        <cell title="手机号码"  :value="baseInfo.aae005"></cell>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="验证码"   v-model="baseInfo.seccode"></x-input>
          <x-button  mini class="verify_button" @click.native="VerifyCode" :disabled="disabled">{{text}}</x-button>
        </div>
      </group>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="submit">提交</x-button>
        <x-button class="pre_next" @click.native="preStep">返回上一步</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Cell, Group, PopupRadio, XInput, XButton} from 'vux'
import api from '../../router/api'
export default {
  name: 'canbaodengji',
  components: {XHeader, Cell, Group, PopupRadio, XInput, XButton},
  data () {
    return {
      step: 1,
      text: '获取验证码',
      disabled: false,
      options: [ {
        key: '31',
        value: '医疗保险'
      }, {
        key: '11',
        value: '养老保险'
      }],
      baseInfo: {
        aac003: '', // 姓名
        aac004: '', // 性别
        aac002: '', // 身份证号
        aac005: '', // 民族
        aac006: '', // 出生日期
        aac024: '', // 政治面貌
        aab301: '', // 所属区县
        aac012: '', // 个人身份
        aac011: '', // 文化程度
        aac009: '', // 户口性质
        aac010: '', // 户口所在地
        aae006: '', // 通讯地址
        aae005: '', // 联系电话
        seccode: '', // 验证码
        aae140: '',
        aab001: '',
        cac061: ''
      }
    }
  },
  created () {},
  mounted () {
    this.queryPersonInfo()
  },
  methods: {
    // 查停保资格
    queryPersonInfo () {
      const params = api.getParam('Y001.001.007')
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.baseInfo.aac003 = data.data[0].aac003
          this.baseInfo.aac004 = data.data[0].aac004
          this.baseInfo.aac002 = data.data[0].aac002
          this.baseInfo.aac005 = data.data[0].aac005
          this.baseInfo.aac006 = data.data[0].aac006
          this.baseInfo.aac024 = data.data[0].aac024
          this.baseInfo.aae005 = data.data[0].aae005
          this.baseInfo.aab001 = data.data[0].aab001
          this.baseInfo.aab301 = data.data[0].aab301
          this.baseInfo.aac011 = data.data[0].aac011
          this.baseInfo.aac009 = data.data[0].aac009
          this.baseInfo.aac010 = data.data[0].aac010
          this.baseInfo.aae006 = data.data[0].aae006
          this.akc026 = data.data[4].akc026
          this.baseInfo.cac061 = data.data[5].cac061
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: data.msg
          })
          if (data.returnCode === -1) return
          history.go(-1)
        }
      }).catch((code) => {
        this.$vux.loading.hide()
      })
    },
    // 发送验证码
    getCode () {
      const params = api.getParam('Y001.001.002', {aae005: this.baseInfo.aae005})
      api.postData(this, params).then((data) => {
        if (data.code === 0) {
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
      })
    },
    VerifyCode () {
      if (this.text !== '获取验证码') return
      let text = ''
      if (this.baseInfo.aae005 === '') text = '请输入手机号'
      if (text !== '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: text
        })
        return
      }
      this.getCode()
      this.disabled = true
      let sendTimer
      let s = 60
      this.text = s + '秒'
      sendTimer = setInterval(() => {
        this.text = --s + '秒'
        if (s <= 0) {
          this.text = '获取验证码'
          this.disabled = false
          clearInterval(sendTimer)
          sendTimer = 0
        }
      }, 1000)
    },
    fmtSex (num) {
      if (num === '1') {
        return '男'
      } else if (num === '0') {
        return '女'
      }
    },
    nextStep () {
      if (this.step === 1) {
      } else if (this.step === 2) {
      } else if (this.step === 3) {
      }
      this.step = this.step + 1
      this.$nextTick(() => {
        document.body.scrollTop = 0
      })
    },
    preStep () {
      this.step = this.step - 1
      this.$nextTick(() => {
        document.body.scrollTop = 0
      })
    },
    submit () {
      if (this.baseInfo.aae140 === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请选择停保险种'
        })
        return
      }
      let param = {
        aac002: this.baseInfo.aac002, // 身份证
        aac003: this.baseInfo.aac003, // 姓名
        aac004: this.baseInfo.aac004, // 性别
        seccode: this.baseInfo.seccode,
        cac061: this.baseInfo.cac061,
        aae140: this.baseInfo.aae140,
        aae005: this.baseInfo.aae005,
        aab001: this.baseInfo.aab001
      }
      const params = api.getParam('Y001.001.008', param)
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.$vux.toast.text(data.msg, '')
          history.go(-1)
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    }
  }
}
</script>

<style lang="less">
  .tbdj {
    .verify_button {
      position: absolute;
      top: 1px;
      right: 15px;
      bottom: 0;
      border-left: solid 1px #d9d9d9;
      background-color: #fff;
      color: #0084ff;
      border-radius: 0;
      &.weui-btn:after {
        border: none;
      }
      &.weui-btn_disabled {
        color:rgba(0, 0, 0, 0.3)
      }
    }
    .next_btn {
      margin: 15px auto;
    }
    .title {
      margin-top: 0;
    }
    .weui-cells {
      margin-top: 15px;
    }
  }
</style>

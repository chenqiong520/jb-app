<template>
  <div class="jbxxxg">
    <x-header :left-options="{backText: ''}">基本信息修改</x-header>
    <div v-show="step===1">
      <div class="title ">
        <span>基本信息(1/2)</span>
      </div>
      <Group class="title_group">
        <x-input class="key_info" :class="(newInfo.aac003 && newInfo.aac003 !== oldInfo.aac003) ? 'modify': ''" title="姓名" v-model="baseInfo.aac003"></x-input>
        <x-input class="key_info" :class="(newInfo.aac002 && newInfo.aac002 !== oldInfo.aac002) ? 'modify': ''" title="身份证号码" v-model="baseInfo.aac002"></x-input>
        <x-input title="户口所在地"  :class="(newInfo.aac010 && newInfo.aac010 !== oldInfo.aac010) ? 'modify': ''" v-model="baseInfo.aac010"></x-input>
        <popup-picker title="文化程度"  :class="(newInfo.aac011 && newInfo.aac011 !== oldInfo.aac011) ? 'modify': ''" v-model="education" :columns="1" :data="list"  show-name></popup-picker>
        <x-input title="电话"   :class="(newInfo.aae005 && newInfo.aae005 !== oldInfo.aae005) ? 'modify': ''" v-model="baseInfo.aae005" ></x-input>
        <x-input title="电子信箱"  :class="(newInfo.aae015 && newInfo.aae015 !== oldInfo.aae015) ? 'modify': ''"  v-model="baseInfo.aae015" ></x-input>
        <x-input title="通讯地址"  :class="(newInfo.aae006 && newInfo.aae006 !== oldInfo.aae006) ? 'modify': ''" v-model="baseInfo.aae006"></x-input>
        <div class="item_wrapper">
          <span class="tip">*</span>
        <PopupRadio title="原因"  v-model="baseInfo.bcc001" :options="reasonList"></PopupRadio>
        </div>
      </Group>
      <div class="notice">
        <div>注：红色为修改后的信息，蓝色字体为关键信息，修改关键信息需上传相关附件。身份证和姓名网上只能修改一次，如需多次修改，请前往所在社保经办机构进行修改。</div>
      </div>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
      </div>
    </div>
    <div v-show="step===2">
      <div class="title ">
        <span>所需附件(2/2)</span>
      </div>
      <Group class="title_group">
        <cell v-if="gabkjzmwj.url" title="公安部门开具证明文件" value="预览"  is-link  @click.native="viewImg(gabkjzmwj)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="gabkjzmwj"></image-upload>
        <cell v-if="grsfzzm.url" title="个人身份证正面" value="预览" is-link  @click.native="viewImg(grsfzzm)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="grsfzzm"></image-upload>
        <cell v-if="grsfzfm.url" title="个人身份证反面"  value="预览"  is-link  @click.native="viewImg(grsfzfm)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="grsfzfm"></image-upload>
      </Group>
      <group>
        <cell title="手机号码"  :value="baseInfo.aae005"></cell>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="验证码"   v-model="baseInfo.seccode"></x-input>
          <x-button  mini class="verify_button" @click.native="VerifyCode" :disabled="disabled">{{text}}</x-button>
        </div>
      </group>
      <div class="notice">
        <div>注：上传的附件必须为原件照片，复印件不受理。</div>
      </div>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="submit">变更申报</x-button>
        <x-button class="pre_next" @click.native="preStep">返回上一步</x-button>
      </div>
    </div>
    <image-view v-model="showImg"  :aac002="baseInfo.aac002" :oae001="baseInfo.oae001"  :imgObj="imgObj"></image-view>
  </div>
</template>

<script>
import {XHeader, Cell, Group, PopupRadio, XInput, XButton, PopupPicker, XTextarea} from 'vux'
import api from '../../router/api'
import imageUpload from '@/components/imageUpload'
import imageView from '@/components/imageView'
export default {
  name: 'jibenxinxixiugai',
  components: {XHeader, Cell, Group, PopupRadio, XInput, XButton, PopupPicker, imageUpload, imageView, XTextarea},
  data () {
    return {
      step: 1,
      list: [],
      education: [],
      text: '获取验证码',
      disabled: false,
      reasonList: [{
        key: '1',
        value: '因公安部门核准改变个人信息'
      }, {
        key: '2',
        value: '因录入错误'
      }],
      oldInfo: {},
      newInfo: {},
      baseInfo: {
        oae001: '',
        aac003: '', // 姓名
        aac002: '', // 身份证号
        aac010: '', // 户口所在地
        aac011: '', // 文化程度
        aae005: '', // 联系电话
        aae015: '', // 电子邮箱
        aae006: '', // 通讯地址
        bcc001: '', // 修改原因
        aab001: '',
        seccode: '' // 验证码
      },
      gabkjzmwj: {
        lhjy: true,
        bustype: '111',
        filetype: '1041',
        title: '公安部门开具证明文件',
        id: 'personImg',
        url: ''
      },
      grsfzzm: {
        lhjy: true,
        bustype: '111',
        filetype: '1042',
        title: '个人身份证正面',
        id: 'permit',
        url: ''
      },
      grsfzfm: {
        lhjy: true,
        bustype: '111',
        filetype: '1043',
        title: '个人身份证反面',
        id: 'invoice',
        url: ''
      },
      imgObj: {
        bustype: '',
        filetype: '',
        title: '',
        id: '',
        url: ''
      },
      showImg: false
    }
  },
  created () {},
  mounted () {
    this.queryPersonInfo()
  },
  methods: {
    // 查询个人基本信息
    queryPersonInfo () {
      const params = api.getParam('Y001.001.009')
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          if (data.data[2].ac02.oae002 === '2') {
            this.$vux.alert.show({
              title: '提示',
              content: data.msg
            })
          }
          if (data.data[2].ac02.oae002 === '0') {
            let _this = this
            this.$vux.confirm.show({
              title: '提示',
              content: data.msg,
              onCancel () {
                history.go(-1)
              },
              onConfirm () {
                _this.cancelApply(data.data[0].ac01.oae001)
              }
            })
          }
          // 个人基本信息data.data[0].ac01 修改后的信息为data.data[2].ac02
          this.oldInfo = data.data[0].ac01
          this.newInfo = data.data[2].ac02
          for (let key in this.baseInfo) {
            if (data.data[2].ac02[key]) {
              this.baseInfo[key] = data.data[2].ac02[key]
            } else if (data.data[0].ac01[key]) {
              this.baseInfo[key] = data.data[0].ac01[key]
            }
          }
          this.gabkjzmwj.url = data.data[3].file1041 ? data.data[3].file1041 : ''
          this.grsfzzm.url = data.data[3].file1042 ? data.data[3].file1042 : ''
          this.grsfzfm.url = data.data[3].file1043 ? data.data[3].file1043 : ''
          if (this.baseInfo.aac011) this.education = [this.baseInfo.aac011]
          let list = []
          data.data[1].aac011.forEach((e) => {
            list.push({name: e.AAA103, value: e.AAA102})
          })
          this.list = list
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
    // 取消申报
    cancelApply (oae001) {
      const params = api.getParam('Y001.001.011', {oae001: oae001})
      api.postData(this, params).then((data) => {
        if (data.code === 0) {
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
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
    nextStep () {
      if (this.step === 1) {
        if (this.baseInfo.bcc001 === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择修改原因'
          })
          return
        }
      } else if (this.step === 2) {
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
    viewImg (imgObj) {
      this.imgObj = imgObj
      this.showImg = true
    },
    submit () {
      if (this.baseInfo.seccode === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请输入验证码'
        })
        return
      }
      if (this.baseInfo.aac002 !== this.oldInfo.aac002 || this.baseInfo.aac003 !== this.oldInfo.aac003) {
        if (this.gabkjzmwj.url === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请上传公安部门开具证明文件'
          })
          return
        }
        if (this.grsfzzm.url === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请上传身份证正面'
          })
          return
        }
        if (this.grsfzfm.url === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请上传身份证反面'
          })
          return
        }
      }
      let param = {oae001: this.baseInfo.oae001}
      if (this.education.length > 0) this.baseInfo.aac011 = this.education[0]
      for (let key in this.baseInfo) {
        if (this.baseInfo[key] !== this.oldInfo[key]) {
          param[key] = this.baseInfo[key]
        }
      }
      const params = api.getParam('Y001.001.010', param)
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
  .jbxxxg {
    .key_info {
      .weui-label {
        color: #0084ff;
      }
    }
    .title_group .modify {
      .vux-popup-picker-value, input{
        color: red;
      }
    }
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

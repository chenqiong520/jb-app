<template>
  <div class="hospitalcbdj">
    <x-header :left-options="{backText: ''}">医疗参保登记</x-header>
    <div v-show="step===1">
      <div class="title ">
        <span>基本信息(1/2)</span>
      </div>
      <Group class="title_group">
        <cell title="姓名" :value="baseInfo.aac003"></cell>
        <cell title="性别" :value="fmtSex(baseInfo.aac004)"></cell>
        <cell title="身份证号码" :value="baseInfo.aac002"></cell>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <popup-radio title="缴费比例" placeholder="请选择" :options="options1" v-model="baseInfo.aae171"></popup-radio>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <popup-picker title="经办机构" placeholder="请选择" v-model="nowArea" :columns="1" :data="areaList" show-name></popup-picker>
        </div>
        <popup-picker title="文化程度"  placeholder="请选择" v-model="education" :columns="1" :data="educationList"  show-name></popup-picker>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <popup-picker title="户口性质" placeholder="请选择"  v-model="residence" :columns="1" :data="residenceList"  show-name></popup-picker>
        </div>
        <x-input title="户口所在地" v-model="baseInfo.aac010"></x-input>
        <x-input title="通讯地址"  v-model="baseInfo.aae006"></x-input>
      </Group>
      <div class="notice">
        <div>注：外地户籍人员，请先买养老保险，再买医疗保险。</div>
      </div>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
      </div>
    </div>
    <div v-show="step===2">
      <div class="title ">
        <span>附件信息(2/2)</span>
      </div>
      <Group class="title_group">
        <cell v-if="sfzzp.url" title="身份证照片" value="预览"  is-link  @click.native="viewImg(sfzzp)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.cac061" :paramObj ="sfzzp"></image-upload>
        <cell v-if="hkbzp.url" title="户口本照片" value="预览" is-link  @click.native="viewImg(hkbzp)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.cac061" :paramObj ="hkbzp"></image-upload>
        <cell v-if="jzzj.url" title="居住证据"  value="预览"  is-link  @click.native="viewImg(jzzj)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.cac061" :paramObj ="jzzj"></image-upload>
        <cell v-if="cyzj.url" title="从业证据"  value="预览" is-link  @click.native="viewImg(cyzj)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.cac061" :paramObj ="cyzj"></image-upload>
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
    <image-view v-model="showImg"  :aac002="baseInfo.aac002" :oae001="baseInfo.oae001"  :imgObj="imgObj"></image-view>
  </div>
</template>

<script>
import {XHeader, Cell, Group, PopupRadio, XInput, XButton, PopupPicker, Datetime} from 'vux'
import imageUpload from '@/components/imageUpload'
import imageView from '@/components/imageView'
import api from '../../router/api'
export default {
  name: 'hospitalcanbaodengji',
  components: {PopupPicker, XHeader, Cell, Group, PopupRadio, XInput, XButton, imageUpload, imageView, Datetime},
  data () {
    return {
      nowYear: new Date().getFullYear(),
      step: 1,
      nowArea: [],
      areaList: [], // 所属区县
      education: [],
      educationList: [], // 文化程度列表
      residence: [],
      residenceList: [], // 户口性质列表
      identity: [],
      identityList: [], // 个人身份列表
      options1: [{
        key: '1',
        value: '100%'
      }, {
        key: '0.6',
        value: '60%'
      }],
      text: '获取验证码',
      disabled: false,
      akc026: '', // 是否需要上传附件 2 需要上传
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
        cbrq: '', // 参保时间
        aae171: '', // 缴费比例
        aae005: '', // 联系电话
        seccode: '', // 验证码
        aab001: '',
        cac061: '',
        fjlist: {
          file1860: '', // 身份证照片
          file1861: '', // 户口本照片
          file1864: '', // 居住证据
          file1863: '' // 从业证据
        }
      },
      sfzzp: {
        lhjy: true,
        bustype: '147',
        filetype: '1860',
        title: '身份证照片',
        id: 'srzzp',
        url: ''
      },
      hkbzp: {
        lhjy: true,
        bustype: '147',
        filetype: '1861',
        title: '户口本照片',
        id: 'hkbzp',
        url: ''
      },
      jzzj: {
        lhjy: true,
        bustype: '147',
        filetype: '1864',
        title: '居住证据',
        id: 'jzzj',
        url: ''
      },
      cyzj: {
        lhjy: true,
        bustype: '147',
        filetype: '1863',
        title: '从业证据',
        id: 'cyzj',
        url: ''
      },
      imgObj: {
        bustype: '',
        filetype: '',
        title: '',
        id: '',
        url: ''
      },
      value1: [],
      showImg: false
    }
  },
  created () {},
  mounted () {
    this.queryPersonInfo()
  },
  methods: {
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
    // 参保资格查询 查询个人基本信息
    queryPersonInfo () {
      const params = api.getParam('Y001.001.001', {aae140: '31'})
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
          this.akc026 = data.data[4].akc026
          this.baseInfo.cac061 = data.data[5].cac061
          let educationList = []
          let residenceList = []
          let list = []
          data.data[1].AAB324.forEach((e) => {
            list.push({name: e.AAA103, value: e.AAA102})
          })
          data.data[2].AAC011.forEach((e) => {
            educationList.push({name: e.AAA103, value: e.AAA102})
          })
          data.data[3].AAC009.forEach((e) => {
            residenceList.push({name: e.AAA103, value: e.AAA102})
          })
          this.areaList = list
          this.educationList = educationList
          this.residenceList = residenceList
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
    fmtSex (num) {
      if (num === '1') {
        return '男'
      } else if (num === '0') {
        return '女'
      }
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
        if (this.baseInfo.aae171 === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择缴费比例'
          })
          return
        }
        if (this.nowArea.length < 1) {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择经办机构'
          })
          return
        }
        if (this.residence.length < 1) {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择户口性质'
          })
          return
        }
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
      /* if (this.akc026 === '2') {
        if (this.sfzzp.url === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请上传身份证照片'
          })
          return
        }
        if (this.hkbzp.url === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请上传户口本照片'
          })
          return
        }
        if (this.jzzj.url === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请上传居住证据'
          })
          return
        }
        if (this.cyzj.url === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请上传从业证据'
          })
          return
        }
      } */
      let param = {
        aab301: this.nowArea[0], // 经办机构
        aac011: this.education[0], // 文化程度
        aac009: this.residence[0], // 户口性质
        aac002: this.baseInfo.aac002, // 身份证
        aac003: this.baseInfo.aac003, // 姓名
        aac004: this.baseInfo.aac004, // 性别
        aac005: this.baseInfo.aac005, // 民族
        aac006: this.baseInfo.aac006, // 出生日期
        aac024: this.baseInfo.aac024, // 政治面貌
        aae005: this.baseInfo.aae005, // 联系电话
        aac010: this.baseInfo.aac010, // 户口所在地
        aae006: this.baseInfo.aae006, // 通讯地址
        aae171: this.baseInfo.aae171, // 缴费比例
        aab001: this.baseInfo.aab001, // 单位编号
        seccode: this.baseInfo.seccode,
        cac061: this.baseInfo.cac061
      }
      const params = api.getParam('Y001.001.005', param)
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
.hospitalcbdj {
  .verify_button {
    position: absolute;
    top: 1px;
    right: 15px;
    bottom: 0;
    border-left: solid 1px #d9d9d9;
    background-color: #fff;
    color: #0084ff;
    border-radius: 0;
    width: 100px;
    padding: 0;
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

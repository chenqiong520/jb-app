<template>
  <div class="birth_allowance">
    <x-header :left-options="{backText: ''}">生育补贴</x-header>
    <div v-show="step===1">
      <div class="title ">
        <span>基本信息(1/3)</span>
      </div>
      <Group class="title_group">
        <cell title="姓名" :value="baseInfo.aac003"></cell>
        <cell title="个人编号" :value="baseInfo.aac001"></cell>
        <cell title="性别" :value="baseInfo.aac004"></cell>
        <cell title="身份证号码" :value="baseInfo.aac002"></cell>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-address title="现住住址" v-model="nowAddr" :list="addressData"></x-address>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="联系电话"  placeholder="请输入手机号码"  ref="tel" is-type="china-mobile" mask="999 9999 9999" v-model="baseInfo.aae005"></x-input>
        </div>
        <cell title="失业金领取证号" :value="baseInfo.aac021"></cell>
      </Group>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
      </div>
    </div>
    <div v-show="step===2">
      <div class="title ">
        <span>生育补助金申请(2/3)</span>
      </div>
      <Group class="title_group">
        <cell title="待遇金额" :value="baseInfo.ajc140"></cell>
        <cell title="待遇起止年月" :value="baseInfo.aae041 + ' 至 ' + baseInfo.aae042"></cell>
        <cell title="剩余可领取月数" :value="baseInfo.ajc099"></cell>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <datetime title="费用发生开始时间" v-model="baseInfo.sae030" ></datetime>
        </div>
       <div class="item_wrapper">
         <span class="tip">*</span>
         <datetime title="费用发生终止时间" v-model="baseInfo.aae031" ></datetime>
       </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input  title="申报金额"  v-model="baseInfo.ajc350" placeholder="申报金额" type="number"></x-input>
        </div>
      </Group>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
        <x-button class="pre_next" @click.native="preStep">返回上一步</x-button>
      </div>
    </div>
    <div v-show="step===3">
      <div class="title ">
        <span>附件信息(3/3)</span>
      </div>
      <Group class="title_group">
        <cell v-if="zsz.url" title="准生证" value="预览" is-link  @click.native="viewImg(zsz)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="zsz"></image-upload>
        <cell v-if="fp.url" title="发票"  value="预览" is-link  @click.native="viewImg(fp)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="fp"></image-upload>
        <cell v-if="zds.url" title="诊断书"  value="预览" is-link  @click.native="viewImg(zds)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="zds"></image-upload>
        <cell v-if="csz.url" title="出生证"  value="预览" is-link  @click.native="viewImg(csz)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="csz"></image-upload>
      </Group>
      <div class="notice">
        <div>注释：网上审核通过后可打印《长沙市失业人员生育补助金申领申报表》，审核通过后请到现场提供以下资料，准生证（照片）、发票、诊断书（出院小结）、出生证及失业金额取证、长沙市失业人员生育申领报表。</div>
      </div>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="submit">提交</x-button>
        <x-button class="pre_next" @click.native="preStep">返回上一步</x-button>
      </div>
    </div>
    <image-view  v-model="showImg"  :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :imgObj="imgObj"></image-view>
  </div>
</template>

<script>
import {XHeader, Cell, Group, PopupPicker, XInput, XButton, Datetime, XAddress} from 'vux'
import imageUpload from '@/components/imageUpload'
import imageView from '@/components/imageView'
import api from '../router/api'
export default {
  name: 'birthAllowance',
  components: {XHeader, Cell, Group, PopupPicker, XInput, XButton, Datetime, XAddress, imageUpload, imageView},
  data () {
    return {
      step: 1,
      nowAddr: [],
      baseInfo: {
        aac003: '', // 姓名
        aac001: '', // 个人编号
        aac004: '', // 性别
        aac002: '', // 身份证号
        sab105: '', // 区县
        sab103: '', // 街道
        sab101: '', // 社区
        aae006: '', // 详细地址
        aae005: '', // 联系电话
        aac021: '', // 失业金领取证号
        ajc140: '', // 待遇金额
        aae041: '', // 待遇开始年月
        aae042: '', // 待遇终止年月
        ajc099: '', // 剩余可领取月数
        sae030: '', // 费用发生开始时间
        aae031: '', // 费用发生终止时间
        ajc350: '', // 申报金额
        fjlist: {
          file1080: '', // 准生证
          file1081: '', // 发票
          file1082: '', // 诊断书
          file1083: '' // 出生证
        }
      },
      addressData: [],
      zsz: {
        bustype: '113',
        filetype: '1080',
        title: '准生证',
        id: 'permit',
        url: ''
      },
      fp: {
        bustype: '113',
        filetype: '1081',
        title: '发票',
        id: 'invoice',
        url: ''
      },
      zds: {
        bustype: '113',
        filetype: '1082',
        title: '诊断书',
        id: 'diagnosis',
        url: ''
      },
      csz: {
        bustype: '113',
        filetype: '1083',
        title: '出生证',
        id: 'birthCard',
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
  mounted () {
    if (this.$root['address']) {
      this.addressData = this.$root['address']
    } else {
      this.getAddressData()
    }
    this.isCanAppy()
  },
  methods: {
    // 查询地址
    getAddressData () {
      const params = api.getParam('F004.001.001')
      api.postData(this, params).then((data) => {
        if (data.code === 0) {
          let list = []
          data.data.forEach((e) => {
            list.push({name: e.AAA103, value: e.AAA102, parent: e.AAA101})
          })
          this.$root['address'] = list
          this.addressData = list
        } else {
        }
      }).catch((code) => {
      })
    },
    // 查询生育补贴申领资格
    isCanAppy () {
      const params = api.getParam('F006.001.001', {aac002: window.localStorage['aac002']})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          for (let key in data.data) {
            if (!data.data[key]) {
              data.data[key] = ''
            }
          }
          if (data.data.sae030) {
            data.data.sae030 = data.data.sae030.substring(0, 4) + '-' + data.data.sae030.substring(4, 6) + '-' + data.data.sae030.substring(6)
          }
          if (data.data.aae031) {
            data.data.aae031 = data.data.aae031.substring(0, 4) + '-' + data.data.aae031.substring(4, 6) + '-' + data.data.aae031.substring(6)
          }
          this.baseInfo = data.data
          if (data.data.sab105) {
            this.nowAddr = [data.data.sab105, data.data.sab103, data.data.sab101]
          }
          if (data.data.fjlist) {
            this.zsz.url = data.data.fjlist.file1080 ? data.data.fjlist.file1080 : ''
            this.fp.url = data.data.fjlist.file1081 ? data.data.fjlist.file1081 : ''
            this.zds.url = data.data.fjlist.file1082 ? data.data.fjlist.file1082 : ''
            this.csz.url = data.data.fjlist.file1083 ? data.data.fjlist.file1083 : ''
          }
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
        this.$vux.toast.text(code, '')
      })
    },
    nextStep () {
      if (this.step === 1) {
        if (this.nowAddr.length === 0) {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择区街道社区'
          })
          return
        }
        if (this.baseInfo.aae005 === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入电话号码'
          })
          return
        }
        if (!this.$refs.tel.valid) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入正确的电话号码'
          })
          return
        }
      }
      if (this.step === 2) {
        if (this.baseInfo.sae030 === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择费用发生开始时间'
          })
          return
        }
        if (this.baseInfo.aae031 === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择费用发生结束时间'
          })
          return
        }
        if (this.baseInfo.ajc350 === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入申报金额'
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
      if (this.zsz.url === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传准生证'
        })
        return
      }
      if (this.fp.url === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传发票'
        })
        return
      }
      if (this.zds.url === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传诊断书'
        })
        return
      }
      if (this.csz.url === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传出生证'
        })
        return
      }
      let param = {
        oae001: this.baseInfo.oae001,
        sab105: this.nowAddr[0], // 区县
        sab103: this.nowAddr[1], // 街道
        sab101: this.nowAddr[2], // 社区
        aae005: this.baseInfo.aae005, // 联系电话
        sae030: this.baseInfo.sae030.replace(/-/g, ''), // 费用发生开始时间
        aae031: this.baseInfo.aae031.replace(/-/g, ''), // 费用发生终止时间
        ajc350: this.baseInfo.ajc350 // 申请金额
      }
      const params = api.getParam('F006.001.002', param)
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          history.go(-1)
          this.$vux.toast.text(data.msg, '')
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

<style scoped lang="less">
  .birth_allowance {
  }

</style>

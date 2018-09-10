<template>
  <div class="recur_registration">
    <x-header :left-options="{backText: ''}">复发登记</x-header>
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
          <x-address title="现住住址" :list="addressData" v-model="nowAddr"></x-address>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="联系电话"  placeholder="请输入手机号码"  is-type="china-mobile" mask="999 9999 9999" ref="tel" v-model="baseInfo.aae005"></x-input>
        </div>
        <cell title="失业金领取证号" :value="baseInfo.aac021"></cell>
      </Group>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
      </div>
    </div>
    <div v-show="step===2">
      <div class="title ">
        <span>复发申请信息(2/3)</span>
      </div>
      <Group class="title_group" label-width="120px">
        <cell title="所属经办机构" :value="baseInfo.aab034zw"></cell>
        <cell title="原工作单位名称" :value="baseInfo.aab004"></cell>
        <cell title="原单位地址" :value="baseInfo.dwaae006"></cell>
        <cell title="参保起始时间" :value="baseInfo.aac007+ ' 至 '+ baseInfo.ajc090" ></cell>
        <cell title="失业原因" :value="baseInfo.ajc093" ></cell>
        <cell title="失业保险缴费月数" :value="baseInfo.sycbys" ></cell>
        <cell title="待遇金额" :value="baseInfo.ajc140" ></cell>
        <cell title="待遇起止年月" :value="baseInfo.aae041 + ' 至 ' + baseInfo.aae042" ></cell>
        <cell title="剩余可领取月数" :value="baseInfo.ajc099" ></cell>
      </Group>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
        <x-button class="pre_next" @click.native="preStep">返回上一步</x-button>
      </div>
    </div>
    <div v-show="step===3">
      <div class="title ">
        <span>附件上传(3/3)</span>
      </div>
      <Group class="title_group">
        <cell v-if="jcldgxzm.url" title="解除劳动关系证明" value="预览" is-link  @click.native="viewImg(jcldgxzm)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="jcldgxzm"></image-upload>
      </Group>
      <div class="notice">
        <div>注释：网上审核通过后可打印《长沙市失业人员生育补助金申领申报表》，审核通过后请到现场提供以下资料，准生证（照片）、发票、诊断书（出院小结）、出生证及失业金额取证、长沙市失业人员生育申领报表。</div>
      </div>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="submit">提交</x-button>
        <x-button class="pre_next" @click.native="preStep">返回上一步</x-button>
      </div>
    </div>
    <image-view v-model="showImg"  :aac002="baseInfo.aac002" :oae001="baseInfo.oae001"  :imgObj="imgObj"></image-view>
  </div>
</template>

<script>
import {XHeader, Cell, Group, PopupPicker, XInput, XButton, XAddress} from 'vux'
import imageUpload from '@/components/imageUpload'
import imageView from '@/components/imageView'
import api from '../router/api'
export default {
  name: 'recurRegistration',
  components: {XHeader, Cell, Group, PopupPicker, XInput, XButton, XAddress, imageUpload, imageView},
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
        aab034zw: '', // 经办机构
        aab004: '', // 原工作单位名称
        dwaae006: '', // 原单位地址
        aac007: '', // 参保开始时间
        ajc090: '', // 参保结束时间
        ajc093: '', // 失业原因
        sycbys: '', // 失业保险缴费月数
        fjlist: {
          file1140: '' // 准生证
        }
      },
      addressData: [],
      jcldgxzm: {
        bustype: '119',
        filetype: '1140',
        title: '解除劳动关系证明',
        id: 'permit',
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
    // 查询复发登记申领资格
    isCanAppy () {
      const params = api.getParam('F007.001.001', {aac002: window.localStorage['aac002']})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          for (let key in data.data) {
            if (!data.data[key]) {
              data.data[key] = ''
            }
          }
          this.baseInfo = data.data
          if (data.data.sab105) {
            this.nowAddr = [data.data.sab105, data.data.sab103, data.data.sab101]
          }
          this.jcldgxzm.url = data.data.fjlist.file1140 ? data.data.fjlist.file1140 : ''
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
            title: '输入有误',
            content: '请输入联系电话'
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
      if (this.jcldgxzm.url === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传解除劳动关系证明'
        })
        return
      }
      let param = {
        oae001: this.baseInfo.oae001,
        sab105: this.nowAddr[0], // 区县
        sab103: this.nowAddr[1], // 街道
        sab101: this.nowAddr[2], // 社区
        aae005: this.baseInfo.aae005 // 手机号码
      }
      const params = api.getParam('F007.001.002', param)
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

<style scoped>

</style>

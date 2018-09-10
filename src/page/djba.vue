<template>
  <div class="djba">
    <x-header :left-options="{backText: ''}">登记备案</x-header>
    <div v-show="step===1">
      <div class="title ">
        <span>基本信息(1/4)</span>
      </div>
      <Group class="title_group">
        <cell title="姓名" :value="baseInfo.aac003"></cell>
        <cell title="个人编号" :value="baseInfo.aac001"></cell>
        <cell title="性别" :value="baseInfo.aac004"></cell>
        <cell title="身份证号码" :value="baseInfo.aac002"></cell>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-address title="选择区街社区" v-model="nowAddr" :list="addressData"></x-address>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="详细地址" v-model="baseInfo.aae006"></x-input>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="联系电话"  placeholder="请输入手机号码"  is-type="china-mobile" mask="999 9999 9999"  ref="tel" v-model="baseInfo.aae005"></x-input>
        </div>
      </Group>
      <div class="notice">
        <div>注：所在地区在长沙市以外的区县请选【芙蓉区】，街道请选【市职业技能培训学校】。</div>
      </div>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
      </div>
    </div>
    <div v-show="step===2">
      <div class="title ">
        <span>登记信息(2/4)</span>
      </div>
      <Group class="title_group" label-width="120px">
        <cell title="原工作单位名称" :value="baseInfo.aab004"></cell>
        <cell title="原单位地址" :value="baseInfo.dwaae006"></cell>
        <cell title="参保起止时间" :value="baseInfo.aac007+ ' 至 '+ baseInfo.ajc090"></cell>
        <cell title="失业保险缴费月数" :value="baseInfo.sycbys"></cell>
        <cell title="失业原因" :value="baseInfo.ajc093"></cell>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="就业创业证号"  placeholder="就业创业证号"   v-model="baseInfo.acc020"></x-input>
        </div>
      </Group>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
        <x-button class="pre_next" @click.native="preStep">返回上一步</x-button>
      </div>
    </div>
    <div v-show="step===3">
      <div class="title ">
        <span>待遇方法信息 (3/4)</span>
      </div>
      <Group class="title_group">
        <cell title="所属经办机构" :value="baseInfo.aab034zw"></cell>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <popup-radio  title="是否通过社保卡发放" v-model="baseInfo.bjc205" :options="list" :columns="1"  :readonly="list.length === 1" @on-hide="changeData"></popup-radio>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
        <x-input title="发放银行"  v-model="baseInfo.bjc200" :disabled="baseInfo.bjc205 === '1'"></x-input>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
        <x-input title="发放账号"  :disabled="baseInfo.bjc205 === '1'"  type="number" v-model="baseInfo.aac203"></x-input>
        </div>
      </Group>
      <div class="notice">
        <div>
          注：1、您可以通过查询个人社保卡信息来查询制卡进度，已在长沙制卡的失业金将通过社保卡发放，还未领卡的请尽快到社保卡发卡网点领取；
          <div>2、在外地制卡的暂不支持通过社保卡发放。</div>
          <div>3、不能通过社保卡发放的，所属经办机构为长沙县和世纪的不用填写发放银行账户信息，浏阳市、望城县、宁乡县的必须填写发放银行账户信息，
            浏阳市的必须是工商银行账户，望城县的必须是中国银行望城支行账户，宁乡县必须是邮政储蓄银行账户！</div>
        </div>
      </div>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
        <x-button class="pre_next" @click.native="preStep">返回上一步</x-button>
      </div>
    </div>

    <div v-show="step===4">
      <div class="title ">
        <span>附件信息(4/4)</span>
      </div>
      <Group class="title_group">
        <cell v-if="grxp.url" title="个人相片" value="预览"  is-link  @click.native="viewImg(grxp)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="grxp"></image-upload>
        <cell v-if="jcldgxzm.url" title="解除劳动关系证明" value="预览" is-link  @click.native="viewImg(jcldgxzm)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="jcldgxzm"></image-upload>
        <cell v-if="grsfzzm.url" title="个人身份证正面"  value="预览"  is-link  @click.native="viewImg(grsfzzm)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="grsfzzm"></image-upload>
        <cell v-if="grsfzfm.url" title="个人身份证反面"  value="预览" is-link  @click.native="viewImg(grsfzfm)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="grsfzfm"></image-upload>
        <cell v-if="jsydj.url" title="就失业登记证"  value="预览"  is-link  @click.native="viewImg(jsydj)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="jsydj"></image-upload>
      </Group>
      <div class="notice">
        <div>注：1、申报成功后可在线打印登记表，在建模式时一并登记表、身份证复印件、失业金领取照片、解除劳动合同证明原件上交。</div>
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
import {XHeader, Cell, Group, PopupRadio, XInput, XButton, XAddress} from 'vux'
import imageUpload from '@/components/imageUpload'
import imageView from '@/components/imageView'
import api from '../router/api'
export default {
  name: 'djba',
  components: {XHeader, Cell, Group, PopupRadio, XInput, XButton, XAddress, imageUpload, imageView},
  data () {
    return {
      step: 1,
      list: [{value: '是', key: '1'}, {value: '否', key: '0'}],
      nowAddr: [],
      baseInfo: {
        aac003: '', // 姓名
        aac001: '', // 个人编号
        aac004: '', // 性别
        aac002: '', // 身份证号
        aab004: '', // 原工作单位名称
        dwaae006: '', // 原工作单位地址
        sycbys: '', // 失业保险缴费月数
        ajc093: '', // 失业原因
        acc020: '', // 就业创业证号
        aab034zw: '', // 经办机构
        bjc205: '', // 社保卡发放标志
        aac203: '', // 银行卡账号
        bjc200: '', // 发放银行
        s_aac203: '', // 社保卡账户
        s_bjc200: '', // 社保卡银行
        aac007: '', // 参保开始时间
        ajc090: '', // 参保结束时间
        sab105: '', // 区县
        sab103: '', // 街道
        sab101: '', // 社区
        aae006: '', // 详细地址
        aae005: '', // 联系电话
        oae001: '', // 流水编号
        fjlist: {
          file0000: '', // 个人照片
          file1140: '', // 解除劳动关系证明
          file1042: '', // 个人身份证正面
          file1043: '', // 个人身份证反面
          file1320: '' // 就失业登记证
        }
      },
      param: {
        aac203: '', // 社保卡账号
        bjc200: '' // 发放银行
      },
      jcldgxzm: {
        bustype: '115',
        filetype: '1140',
        title: '解除劳动关系证明',
        id: 'permit',
        url: ''
      },
      grxp: {
        bustype: '115',
        filetype: '0000',
        title: '个人相片',
        id: 'personImg',
        url: ''
      },
      grsfzzm: {
        bustype: '115',
        filetype: '1042',
        title: '个人身份证正面',
        id: 'invoice',
        url: ''
      },
      grsfzfm: {
        bustype: '115',
        filetype: '1043',
        title: '个人身份证反面',
        id: 'diagnosis',
        url: ''
      },
      jsydj: {
        bustype: '115',
        filetype: '1320',
        title: '就失业登记',
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
      value1: [],
      addressData: [],
      showImg: false
    }
  },
  created () {},
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
    // 查询失业金申领资格
    isCanAppy () {
      const params = api.getParam('F004.001.002', {aac002: window.localStorage['aac002']})
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
          this.grxp.url = data.data.fjlist.file0000 ? data.data.fjlist.file0000 : ''
          this.jcldgxzm.url = data.data.fjlist.file1140 ? data.data.fjlist.file1140 : ''
          this.grsfzzm.url = data.data.fjlist.file1042 ? data.data.fjlist.file1042 : ''
          this.grsfzfm.url = data.data.fjlist.file1043 ? data.data.fjlist.file1043 : ''
          this.jsydj.url = data.data.fjlist.file1320 ? data.data.fjlist.file1320 : ''
          if (!data.data.s_aac203) {
            this.list = [{value: '否', key: '0'}]
          } else {
            this.param.aac203 = data.data.s_aac203
            this.param.bjc200 = data.data.s_bjc200
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
        if (this.baseInfo.aae006 === '') {
          this.$vux.alert.show({
            title: '输入有误',
            content: '请输入详细地址'
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
      } else if (this.step === 2) {
        if (this.baseInfo.acc020 === '') {
          this.$vux.alert.show({
            title: '输入有误',
            content: '请输入就业创业证号'
          })
          return
        }
      } else if (this.step === 3) {
        if (this.baseInfo.bjc200 === '') {
          this.$vux.alert.show({
            title: '输入有误',
            content: '请输入发放银行'
          })
          return
        }
        if (this.baseInfo.aac203 === '') {
          this.$vux.alert.show({
            title: '输入有误',
            content: '请输入发放账号'
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
    changeData () {
      if (this.baseInfo.bjc205 === '1') {
        this.baseInfo.aac203 = this.param.aac203
        this.baseInfo.bjc200 = this.param.bjc200
      } else {
        this.baseInfo.aac203 = ''
        this.baseInfo.bjc200 = ''
      }
    },
    viewImg (imgObj) {
      this.imgObj = imgObj
      this.showImg = true
    },
    submit () {
      if (this.grxp.url === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传个人相片'
        })
        return
      }
      if (this.jcldgxzm.url === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传解除劳动关系证明'
        })
        return
      }
      if (this.grsfzzm.url === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传个人身份证正面照片'
        })
        return
      }
      if (this.grsfzfm.url === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传个人身份证反面照片'
        })
        return
      }
      if (this.jsydj.url === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传就失业登记'
        })
        return
      }
      let param = {
        oae001: this.baseInfo.oae001,
        sab105: this.nowAddr[0], // 区县
        sab103: this.nowAddr[1], // 街道
        sab101: this.nowAddr[2], // 社区
        aae006: this.baseInfo.aae006, // 详细地址
        aae005: this.baseInfo.aae005, // 联系电话
        acc020: this.baseInfo.acc020, // 就业创业证号
        bjc205: this.baseInfo.bjc205, // 社保卡发放标志
        aac203: this.baseInfo.aac203, // 社保卡账号
        bjc200: this.baseInfo.bjc200 // 发放银行
      }
      const params = api.getParam('F004.001.004', param)
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
.djba {
  .next_btn {
    margin: 15px auto;
  }
}
</style>

<template>
  <!--培训补贴-->
  <div class="train_subsidy">
    <x-header :left-options="{backText: ''}">培训补贴</x-header>
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
          <x-address title="选择区街社区" v-model="nowAddr" :list="addressData"></x-address>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="详细地址" v-model="baseInfo.aae006"></x-input>
        </div>
        <cell title="失业金领取证号" :value="baseInfo.aac021"></cell>
      </Group>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
      </div>
    </div>
    <div v-show="step===2">
      <div class="title ">
        <span>非定点培训申请(2/3)</span>
      </div>
      <Group class="title_group">
        <cell title="待遇金额" :value="baseInfo.ajc140"></cell>
        <cell title="待遇起止年月" :value="baseInfo.aae041 + ' 至 ' + baseInfo.aae042"></cell>
        <cell title="剩余可领取月数" :value="baseInfo.ajc099"></cell>
        <div class="item_wrapper">
          <span class="tip">*</span>
        <x-input title="培训机构"  v-model="baseInfo.ahb405" placeholder="培训机构"></x-input>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <cell title="培训工种"  is-link  @click.native="selectType" :value="baseInfo.ahb404"></cell>
        </div>
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
        <cell v-if="grxp.url" title="个人相片" value="预览"  is-link  @click.native="viewImg(grxp)"></cell>
        <image-upload v-else :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :paramObj ="grxp"></image-upload>
      </Group>
      <div class="notice">
        <div>注释：失业人员在失业金领取期间，有参加职业技能培训的愿望，但因为各方面的原因不在定点培训机构参加职业技能培训，需在其他培训机构参加培训，
        在培训前必须进行非定点职业技能培训申报，经批准后方可参加非定点职业技能培训，培训合格后可获得相关补助。对于符合业务规则，约束规则的人员，可以直接在线进行申报，
        获得批准后可以在线打印《长沙市失业人员非定点职业技能培训申报表》，该表需交由培训机构盖章，之后在申请补助时一并提交</div>
      </div>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="submit">提交</x-button>
        <x-button class="pre_next" @click.native="preStep">返回上一步</x-button>
      </div>
    </div>

    <div v-transfer-dom>
      <popup v-model="show" height="282px" style="background-color:#fff">
        <div class="return_btn clear"><span style="float: left;" @click="getPreData(current.sid, current.cid)">上一级</span></div>
        <div class="scroll_content">
          <div class="item_option clear" v-for="(item, i) in typeList" :key="i" @click="getTrianData(item.sid, item.cid, item.sname )">
            {{item.sname}}
            <icon type="success-no-circle" v-if="current.sid ===item.sid" style="float: right; color: #0084ff;line-height: 40px"></icon>
          </div>
        </div>
      </popup>
    </div>
    <image-view  v-model="showImg"  :aac002="baseInfo.aac002" :oae001="baseInfo.oae001" :imgObj="imgObj"></image-view>
  </div>
</template>

<script>
import {XHeader, Cell, Group, PopupPicker, XInput, XButton, XAddress, Popup, TransferDom, Icon} from 'vux'
import api from '../router/api'
import imageUpload from '@/components/imageUpload'
import imageView from '@/components/imageView'
export default {
  name: 'trainSubsidy',
  directives: {
    TransferDom
  },
  components: {XHeader, Cell, Group, PopupPicker, XInput, XButton, XAddress, imageUpload, Popup, Icon, imageView},
  data () {
    return {
      show: false,
      step: 1,
      nowAddr: [],
      type: [],
      baseInfo: {
        aac003: '', // 姓名
        aac001: '', // 个人编号
        aac004: '', // 性别
        aac002: '', // 身份证号
        sab105: '', // 区县
        sab103: '', // 街道
        sab101: '', // 社区
        aae006: '', // 详细地址
        aac021: '', // 失业金领取证号
        ajc140: '', // 待遇金额
        aae041: '', // 待遇开始年月
        aae042: '', // 待遇终止年月
        ajc099: '', // 剩余可领取月数
        ahb405: '', // 培训机构
        ahb403: '', // 培训工种的id
        ahb404: '',
        fjlist: {
          file0000: '' // 个人照片
        }
      },
      grxp: {
        bustype: '116',
        filetype: '0000',
        title: '个人相片',
        id: 'personImg',
        url: ''
      },
      addressData: [],
      typeList: [],
      list: {
        list1: [],
        list2: [],
        list3: [],
        list4: []
      },
      current: { // 当前层级选中的数据
        sid: '',
        cid: '1',
        pid: ''
      },
      activeList: {
        sid1: '',
        sid2: '',
        sid3: '',
        sid4: ''
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
  created () {
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
    // 打开选择培训工种的窗口
    selectType () {
      this.show = true
      if (this.current.sid) {
        this.getCurrentData(this.current.sid, this.current.cid)
      } else {
        this.getTrianData()
      }
    },
    // 获取下一级的培训工种 sid当前节点的id cid当前在那一级 或者选择培训工种
    getTrianData (sid, cid, sname) {
      const params = api.getParam('F005.001.001', {sid: sid, cid: cid})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.activeList['sid' + cid] = sid
          this.typeList = data.data
          if (cid === '1') {
            this.list.list2 = data.data
            this.current.cid = '2'
            this.current.sid = this.activeList.sid2
          } else if (cid === '2') {
            this.list.list3 = data.data
            this.current.cid = '3'
            this.current.sid = this.activeList.sid3
          } else if (cid === '3') {
            this.list.list4 = data.data
            this.current.cid = '4'
            this.current.sid = this.activeList.sid4
          } else {
            this.list.list1 = data.data
            this.current.cid = '1'
          }
        } else {
          if (data.code === 1) {
            this.baseInfo.ahb404 = sname
            this.baseInfo.ahb403 = sid
            this.current.sid = sid
            this.show = false
            this.list = {
              list1: [],
              list2: [],
              list3: [],
              list4: []
            }
          }
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },

    // 获取上一级的培训工种 sid当前节点的id cid当前在那一级
    getPreData (sid, cid) {
      if (this.current.cid === '1') return
      let s = parseInt(cid) - 1
      if (this.list['list' + s].length > 0) {
        this.typeList = this.list['list' + s]
        this.current.cid = '' + s
        this.current.sid = this.activeList['sid' + s]
        return
      }
      const params = api.getParam('F005.001.004', {sid: sid, cid: cid})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.typeList = data.data
          if (s === 1) this.list.list1 = data.data
          for (let i in data.data) {
            if (data.data[i].sid === this.current.pid) {
              this.activeList['sid' + data.data[i].cid] = data.data[i].sid
              this.current.sid = data.data[i].sid
              this.current.pid = data.data[i].pid
              this.current.cid = data.data[i].cid
            }
          }
        } else {
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },

    // 获取同级的培训工种 sid当前节点的id cid当前在那一级
    getCurrentData (sid, cid) {
      const params = api.getParam('F005.001.005', {sid: sid, cid: cid})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.typeList = data.data
          for (let i in data.data) {
            if (data.data[i].sid === sid) {
              this.current.pid = data.data[i].pid
            }
          }
        } else {
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 查询培训补贴申领资格
    isCanAppy () {
      const params = api.getParam('F005.001.002', {aac002: window.localStorage['aac002']})
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
          if (data.data.cid) {
            this.current.cid = data.data.cid
            this.current.sid = data.data.ahb403
            this.activeList['sid' + data.data.cid] = data.data.ahb403
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
      }
      if (this.step === 2) {
        if (this.baseInfo.ahb405 === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入培训机构'
          })
          return
        }
        if (this.baseInfo.ahb404 === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择培训工种'
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
    changeSelect () {
      this.typeList = [{
        name: '测试1',
        value: '01'
      }, {
        name: '测试2',
        value: '01'
      }, {
        name: '测试3',
        value: '01'
      }]
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
      let param = {
        oae001: this.baseInfo.oae001,
        sab105: this.nowAddr[0], // 区县
        sab103: this.nowAddr[1], // 街道
        sab101: this.nowAddr[2], // 社区
        aae006: this.baseInfo.aae006, // 详细地址
        ahb405: this.baseInfo.ahb405, // 培训机构
        ahb404: this.baseInfo.ahb404, // 培训工种
        ahb403: this.baseInfo.ahb403 // 培训工种
      }
      const params = api.getParam('F005.001.003', param)
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

<style scoped lang="less">
.train_subsidy {
  .next_btn {
    margin: 50px 0 15px;
  }
  .btn_group {
    padding: 0 10px;
  }
  .notice {
    font-size: 14px;
    line-height: 25px;
    color: #F8B551;
    padding: 15px;
  }
}
.scroll_content {
  position: absolute;
  width: 100%;
  overflow-y: scroll;
  bottom: 0;
  top: 40px;
  .item_option {
    line-height: 40px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 14px;
  }
}
  .return_btn {
    background-color: #eee;
    height: 40px;
    font-size: 14px;
    span {
      padding: 10px 15px 10px 15px;
    }
  }
</style>

<template>
  <div class="base_info">
    <x-header :left-options="{backText: ''}">个人信息查询</x-header>
    <div class="main_content_wrapper" ref="content">
      <div>
        <div class="info_photo">
          <img src="../assets/user.png"/>
        </div>
        <Group class="title_group">
          <popup-picker title="单位名称(切换账户)" v-model="activeNo" :columns="1" :data="personNoList" show-name @on-change="confirmAccount"></popup-picker>
          <cell title="个人编号" :value="baseInfo.AAC001"></cell>
          <cell title="证件类型" :value="baseInfo.BAC002"></cell>
          <cell title="证件号码" :value="baseInfo.AAC002"></cell>
          <cell title="性别" :value="baseInfo.AAC004"></cell>
          <cell title="参保状态" :value="baseInfo.AAC031"></cell>
          <cell title="单位编号" :value="baseInfo.AAB001"></cell>
          <cell title="医保账户" :value="baseInfo.AAE010"></cell>
          <cell title="社会保险经办机构" :value="baseInfo.AAB034"></cell>
        </Group>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../router/api'
import {XHeader, Group, Cell, PopupPicker} from 'vux'
import BScroll from 'better-scroll'
export default {
  name: 'baseInfo',
  components: {XHeader, Group, Cell, PopupPicker},
  data () {
    return {
      personNoList: [],
      activeNo: [],
      fistLoad: true,
      baseInfo: {
        AAC003: '', // 姓名
        AAC001: '', // 个人编号
        BAC002: '', // 证件类型
        AAC002: '', // 证件号码
        AAC004: '', // 性别
        AAC031: '', // 参保状态
        AAB001: '', // 单位编号
        AAB004: '', // 单位名称
        AAE010: '', // 参保账户
        AAB034: '' // 社保保险经办机构
      }
    }
  },
  created () {
    if (window.localStorage['personNoList']) {
      let list = JSON.parse(window.localStorage['personNoList'])
      list.forEach((e) => {
        this.personNoList.push({name: e.AAB004, value: e.AAC001})
      })
    }
  },
  mounted () {
    this.loadBaseInfo()
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    // 查询个人基本信息
    loadBaseInfo () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('F002.001.001')
      api.postData(this, params, window.localStorage['token']).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.baseInfo = data.data[0]
          this.activeNo = [this.baseInfo.AAC001]
          if (this.baseInfo.AAC001 && window.localStorage['nowPersonNo'] !== this.baseInfo.AAC001) {
            window.localStorage['aac002'] = this.baseInfo.AAC002
            window.localStorage['nowPersonNo'] = this.baseInfo.AAC001
          }
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 确认账户 根据个人编号
    confirmAccount (personNo) {
      if (personNo[0] === this.baseInfo.AAC001) return
      let list = JSON.parse(window.localStorage['personNoList'])
      let aab001 = ''
      for (let i in list) {
        if (list[i].AAC001 === personNo[0]) {
          aab001 = list[i].AAB001
          break
        }
      }
      let params = api.getParam('s32', {aac001: personNo[0], aab001: aab001})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.loadBaseInfo()
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    _initScroll () {
      this.scroll = new BScroll(this.$refs.content, {
        click: true
      })
    }
  }
}
</script>

<style scoped lang="less">
.base_info {
  .content_warpper {
    position: fixed;
    width: 100%;
    bottom: 0;
    top:46px
  }
  .info_photo {
    height: 120px;
    text-align: center;
    background-color: #0084ff;
    img {
      width: 70px;
      height: 70px;
      margin-top: 25px;
    }
  }
}
</style>

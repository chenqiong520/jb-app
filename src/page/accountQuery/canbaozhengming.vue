<template>
  <div class="canbaozhengming">
    <x-header :left-options="{backText: ''}">参保证明</x-header>
    <div>
      <div>
        <Group class="title_group">
         <popup-radio title="生成方式" :options="list" placeholder="" v-model="filetype"></popup-radio>
          <popup-picker title="用途" :data="usageList" placeholder="请选择"  v-model="usage"></popup-picker>
          <datetime v-show="filetype=== '1014'" v-model="yjsjBegin" format="YYYY-MM" :end-date="endDate" title="应缴实缴开始时间" placeholder="开始时间"></datetime>
          <datetime v-show="filetype=== '1014'" v-model="yjsjEnd" format="YYYY-MM" :end-date="endDate" title="应缴实缴结束时间"  placeholder="结束时间"></datetime>
          <datetime v-show="filetype=== '1300'" v-model="ylzhBegin" format="YYYY-MM" :end-date="endDate" title="养老账户开始时间" placeholder="开始时间"></datetime>
          <datetime v-show="filetype=== '1300'" v-model="ylzhEnd" format="YYYY-MM" :end-date="endDate" title="养老账户结束时间" placeholder="结束时间"></datetime>
        </Group>
        <div class="btn_group">
             <x-button class="submit_btn next_btn" @click.native="submit">生成</x-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, PopupPicker, XButton, Datetime, PopupRadio} from 'vux'
import api from '../../router/api'
export default {
  name: 'canbaozhengming',
  components: {XHeader, Group, PopupPicker, XButton, Datetime, PopupRadio},
  data () {
    return {
      list: [{key: '1011', value: '个人基本信息'}, {key: '1014', value: '个人应缴实缴'}, {key: '1300', value: '个人养老账户'}, {key: '1017', value: '个人账户单'}],
      usageList: [['投标专用', '购房证明', '子女入学', '落户证明', '户口迁移', '公积金年审', '年检年审', '社保转移', '办信用卡', '银行贷款', '办理签证',
        '办理失业证', '劳动仲裁', '档案托管', '办理居住证', '建造师注册', '高企申报', '残疾人年审', '在职证明', '其他']],
      filetype: '1011',
      yjsjBegin: '',
      yjsjEnd: '',
      ylzhBegin: '',
      ylzhEnd: '',
      usage: [],
      endDate: ''
    }
  },
  mounted () {
    this.endDate = this.$root.formatDate(new Date(), 'yyyy-MM-dd')
  },
  methods: {
    submit () {
      let param = {filetype: this.filetype}
      if (this.usage.length > 0) {
        param.usage = this.usage[0]
      }
      if (this.filetype === '1014') {
        if (this.yjsjBegin === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择开始时间'
          })
          return
        }
        if (this.yjsjEnd === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择结束时间'
          })
          return
        }
        if (new Date(this.yjsjEnd) <= new Date(this.yjsjBegin)) {
          this.$vux.alert.show({
            title: '提示',
            content: '结束时间要大于开始时间'
          })
          return
        }
        param.aae003Begin = this.yjsjBegin.replace(/-/g, '')
        param.aae003End = this.yjsjEnd.replace(/-/g, '')
      } else if (this.filetype === '1300') {
        if (this.ylzhBegin === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择开始时间'
          })
          return
        }
        if (this.ylzhEnd === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择结束时间'
          })
          return
        }
        if (new Date(this.ylzhEnd) <= new Date(this.ylzhBegin)) {
          this.$vux.alert.show({
            title: '提示',
            content: '结束时间要大于开始时间'
          })
          return
        }
        param.aae003Begin = this.ylzhBegin.replace(/-/g, '')
        param.aae003End = this.ylzhEnd.replace(/-/g, '')
      }
      let params = api.getParam('A002.004.001', param)
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          let url = 'http://' + this.$store.getters.base + data.data
          window.AndroidInterface.DisplayPDF(url)
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
      })
    }
  }
}
</script>

<style scoped lang="less">
.yibaoka {
  .date_flex {
    position: relative;
    .vux-flexbox-item {
      margin-left: 0 !important;
      text-align: center;
    }
    &:before {
      content: " ";
      position: absolute;
      left: 15px;
      top: 0;
      right: 15px;
      height: 1px;
      border-top: 1px solid #D9D9D9;
      color: #D9D9D9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
  .item_record {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .record_con {
    margin-top: 15px;
  }
  .item_content {
    background-color: #fff;
    padding: 10px 15px;
    font-size: 14px;
    position: relative;
    border-top: solid 1px #ebebeb;
    .item_key {
      display: inline-block;
      margin-right: 12px;
    }
    .item_value {
      color: #777;
    }
    .item_state {
      font-size: 13px;
      line-height: 13px;
      position: absolute;
      top: 10px;
      right: 15px;
      width: 135px;
      padding: 5px 0;
      background-color: #0084ff;
      text-align: center;
      color: #fff;
      border-radius: 10px;
    }
  }
}
</style>

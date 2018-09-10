<template>
  <div class="bx_detail">
    <x-header :left-options="{backText: ''}">医疗费明细</x-header>
    <div class="record_wrapper">
      <div class="item_record"><span class="item_key">床位费</span> <span class="item_value">{{info.AKC240_34}}</span></div>
      <div class="item_record"><span class="item_key">诊察费</span> <span class="item_value">{{info.AKC240_27}}</span></div>
      <div class="item_record"><span class="item_key">护理费</span> <span class="item_value">{{info.AKC240_33}}</span></div>
      <div class="item_record"><span class="item_key">输氧费</span> <span class="item_value">{{info.AKC240_23}}</span></div>
      <div class="item_record"><span class="item_key">输血费</span> <span class="item_value">{{info.AKC240_26}}</span></div>
      <div class="item_record"><span class="item_key">医疗服务费</span> <span class="item_value">{{info.AKC240_41}}</span></div>
      <div class="item_record"><span class="item_key">西药</span> <span class="item_value">{{info.AKC240_11}}</span></div>
      <div class="item_record"><span class="item_key">中成药</span> <span class="item_value">{{info.AKC240_12}}</span></div>
      <div class="item_record"><span class="item_key">中草药</span> <span class="item_value">{{info.AKC240_13}}</span></div>
      <div class="item_record"><span class="item_key">产前检查费</span> <span class="item_value">{{info.AKC240_44}}</span></div>
      <div class="item_record"><span class="item_key">化验费</span> <span class="item_value">{{info.AKC240_25}}</span></div>
      <div class="item_record"><span class="item_key">检查费</span> <span class="item_value">{{info.AKC240_21}}</span></div>
      <div class="item_record"><span class="item_key">特殊检查费</span> <span class="item_value">{{info.AKC240_22}}</span></div>
      <div class="item_record"><span class="item_key">治疗费</span> <span class="item_value">{{info.AKC240_31}}</span></div>
      <div class="item_record"><span class="item_key">特殊治疗费</span> <span class="item_value">{{info.AKC240_32}}</span></div>
      <div class="item_record"><span class="item_key">手术费</span> <span class="item_value">{{info.AKC240_24}}</span></div>
      <div class="item_record"><span class="item_key">麻醉费</span> <span class="item_value">{{info.AKC240_42}}</span></div>
      <div class="item_record"><span class="item_key">材料费</span> <span class="item_value">{{info.AKC240_94}}</span></div>
      <div class="item_record"><span class="item_key">内置材料费</span> <span class="item_value">{{info.AKC240_93}}</span></div>
      <div class="item_record"><span class="item_key">其他费用</span> <span class="item_value">{{info.AKC240_91}}</span></div>
      <div class="total_text">总费用</div>
      <div class="item_record"><span class="item_key">本次住院医疗费总额</span> <span class="item_value">{{info.AKC264}}</span></div>
      <div class="item_record"><span class="item_key">个人政策自付（部分自付）</span> <span class="item_value">{{info.BFZF}}</span></div>
      <div class="item_record"><span class="item_key">个人政策自付（完全自付）</span> <span class="item_value">{{info.WQZF}}</span></div>
      <div class="item_record"><span class="item_key">应付起付线</span> <span class="item_value">{{info.YFQFX}}</span></div>
      <div class="item_record"><span class="item_key">公务员补助</span> <span class="item_value">{{info.GWYBZQFX}}</span></div>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, Cell} from 'vux'
import api from '../../router/api.js'
export default {
  name: 'yiliaofeimingxi',
  components: {XHeader, Group, Cell},
  data () {
    return {
      info: {}
    }
  },
  mounted () {
    if (this.$route.params.akc190 && this.$route.params.akc190 !== 'undefined') {
      if (this.$route.params.aae072 && this.$route.params.aae072 !== 'undefined') {
        this.loadInfo(this.$route.params.akc190, this.$route.params.aae072)
      }
    }
  },
  methods: {
    loadInfo (akc190, aae072) {
      let params = api.getParam('F010.001.004', {aac001: window.localStorage['nowPersonNo'], akc190: akc190, aae072: aae072})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params, window.localStorage['token']).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.info = data.data[0]
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
.total_text {
  margin: 0 15px;
  line-height: 35px;
  border-top: 1px solid #ededed;
  font-weight: bold;
}
</style>

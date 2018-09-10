<template>
  <div class="bx_detail">
    <x-header :left-options="{backText: ''}">既往费用</x-header>
    <div class="record_wrapper">
      <div class="item_record"><span class="item_key">医疗费合计</span> <span class="item_value">{{info.BKC206}}</span></div>
      <div class="item_record"><span class="item_key">已付起付钱</span> <span class="item_value">{{info.BKC207}}</span></div>
      <div class="item_record"><span class="item_key">统筹基金支付</span> <span class="item_value">{{info.AKC251}}</span></div>
      <div class="item_record"><span class="item_key">完全政策支付</span> <span class="item_value">{{info.BKC208}}</span></div>
      <div class="item_record"><span class="item_key">部分政策自付</span> <span class="item_value">{{info.BKC209}}</span></div>
      <div class="item_record"><span class="item_key">分段比例自付</span> <span class="item_value">{{info.BKC210}}</span></div>
      <div class="item_record"><span class="item_key">大病互助支付</span> <span class="item_value">{{info.BKC251}}</span></div>
      <div class="item_record"><span class="item_key">公务员补助</span> <span class="item_value">{{info.BKC252}}</span></div>
      <div class="item_record"><span class="item_key">本年住院次数</span> <span class="item_value">{{info.BKC204}}</span></div>
      <div class="item_record"><span class="item_key">本年度分段计算费用累计</span> <span class="item_value">{{info.BKC253}}</span></div>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, Cell} from 'vux'
import api from '../../router/api.js'
export default {
  name: 'bxDetail',
  components: {XHeader, Group, Cell},
  data () {
    return {
      info: {}
    }
  },
  mounted () {
    if (this.$route.params.akc190 && this.$route.params.akc190 !== 'undefined') {
      this.loadInfo(this.$route.params.akc190)
    }
  },
  methods: {
    loadInfo (akc190) {
      let params = api.getParam('F010.001.003', {aac001: window.localStorage['nowPersonNo'], akc190: akc190})
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

</style>

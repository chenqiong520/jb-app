<template>
  <div class="bx_detail">
    <x-header :left-options="{backText: ''}">详情</x-header>
    <div class="record_wrapper">
      <div class="record_title">诊断情况</div>
      <div class="item_record"><span class="item_key">入院诊断</span> <span class="item_value">{{info.AKC231}}</span></div>
      <div class="item_record"><span class="item_key">出院诊断</span> <span class="item_value">{{info.AKC232}}</span></div>
    </div>
    <div class="record_wrapper">
      <div class="record_title">住院情况</div>
      <div class="item_record"><span class="item_key">住院号</span> <span class="item_value">{{info.AKC190}}</span></div>
      <div class="item_record"><span class="item_key">入院日期</span> <span class="item_value">{{info.AKC192}}</span></div>
      <div class="item_record"><span class="item_key">住院天数</span> <span class="item_value">{{info.AKC192M}}</span></div>
    </div>
    <Group >
      <cell title="本次门诊医疗费明细" is-link @click.native="medicalFeeDetail"></cell>
      <cell title="本次费用分段计算明细" is-link @click.native="segmentsDetail"></cell>
      <cell title="既往费用" is-link @click.native="passFee"></cell>
      <cell title="日结清单" is-link @click.native="dayBill"></cell>
      <cell title="住院明细" is-link @click.native="zymx"></cell>
    </Group>
    <div class="record_wrapper">
      <div class="record_title">本次总支出</div>
      <div class="item_record"><span class="item_key">医疗总费用</span> <span class="item_value">{{info.AKC264}}</span></div>
      <div class="item_record"><span class="item_key">现金支付</span> <span class="item_value">{{info.AKC261}}</span></div>
      <div class="item_record"><span class="item_key">统筹支付</span> <span class="item_value">{{info.AKC260}}</span></div>
      <div class="item_record"><span class="item_key">账户支付</span> <span class="item_value">{{info.AKC255}}</span></div>
      <div class="item_record"><span class="item_key">大病互助支付</span> <span class="item_value">{{info.AKC283}}</span></div>
      <div class="item_record"><span class="item_key">公务员补助支付</span> <span class="item_value">{{info.AKC285}}</span></div>
      <div class="item_record"><span class="item_key">其中公务员特殊补助</span> <span class="item_value">{{info.AKC303}}</span></div>
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
    if (this.$route.params.id && this.$route.params.id !== 'undefined') {
      this.loadInfo(this.$route.params.id)
    }
  },
  methods: {
    loadInfo (akc190) {
      let params = api.getParam('F010.001.002', {aac001: window.localStorage['nowPersonNo'], akc190: akc190})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params, window.localStorage['token']).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          if (data.data[0].AKC192) {
            data.data[0].AKC192 = this.$root.formatDate(new Date(data.data[0].AKC192), 'yyyy-MM-dd hh:mm:ss')
          }
          this.info = data.data[0]
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    medicalFeeDetail () {
      this.$router.push('/yiliaofeimingxi/' + this.info.AKC190 + '/' + this.info.AAE072)
    },
    segmentsDetail () {
      this.$router.push('/fenduanjisuanmingxi/' + this.info.AKC190 + '/' + this.info.AAE072)
    },
    passFee () {
      this.$router.push('/jiwangfeiyong/' + this.info.AKC190)
    },
    dayBill () {
      this.$router.push('/rijieqingdan/' + this.info.AKC190 + '/' + this.info.AAE072)
    },
    zymx () {
      let date
      if (this.info.AKC192) {
        date = this.info.AKC192.substring(0, 10)
      }
      this.$router.push('/rijieqingdanmingxi/' + this.info.AKC190 + '/' + this.info.AAE072 + '/' + date)
    }
  }
}
</script>

<style scoped>

</style>

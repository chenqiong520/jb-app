<template>
  <div class="fdjsmx">
    <x-header :left-options="{backText: ''}">分段计算明细</x-header>
    <div class="record_wrapper">
      <div class="record_title">基本医疗支付</div>
      <div class="flex_box"><div class="key_con underline">起付线以上：0-3000</div> <div class="value_con"><span class="label">比例</span> <span>金额</span></div></div>
      <div  class="flex_box"><div class="key_con">个人比例自付</div> <div class="value_con"><span class="label">{{info.ONEZFBL}}</span> <span>{{info.ONEZFJE}}</span></div></div>
      <div  class="flex_box"><div class="key_con">统筹基金支付</div> <div class="value_con"><span class="label">{{info.ONETCBL}}</span> <span>{{info.ONETCJE}}</span></div></div>
      <div  class="flex_box"><div class="key_con">公务员补助</div> <div class="value_con"><span class="label">{{info.ONEGWYBL}}%</span> <span>{{info.ONEGWYJE}}</span></div></div>

      <div class="flex_box"><div class="key_con underline">3000-10000</div> </div>
      <div  class="flex_box"><div class="key_con">个人比例自付</div> <div class="value_con"><span class="label">{{info.TWOZFBL}}</span> <span>{{info.TWOZFJE}}</span></div></div>
      <div  class="flex_box"><div class="key_con">统筹基金支付</div> <div class="value_con"><span class="label">{{info.TWOTCBL}}</span> <span>{{info.TWOTCJE}}</span></div></div>
      <div  class="flex_box"><div class="key_con">公务员补助</div> <div class="value_con"><span class="label">{{info.TWOGWYBL}}%</span> <span>{{info.TWOGWYJE}}</span></div></div>

      <div class="flex_box"><div class="key_con underline">10000-封顶线</div> </div>
      <div  class="flex_box"><div class="key_con">个人比例自付</div> <div class="value_con"><span class="label">{{info.THEZFBL}}</span> <span>{{info.THEZFJE}}</span></div></div>
      <div  class="flex_box"><div class="key_con">统筹基金支付</div> <div class="value_con"><span class="label">{{info.THETCBL}}</span> <span>{{info.THETCJE}}</span></div></div>
      <div  class="flex_box"><div class="key_con">公务员补助</div> <div class="value_con"><span class="label">{{info.THEGWYBL}}%</span> <span>{{info.THEGWYJE}}</span></div></div>
      <div  class="flex_box"><div class="key_con">个人自付合计</div> <div class="value_con"><span>{{info.ONEHJ}}</span> </div></div>
      <div  class="flex_box"><div class="key_con">统筹支付合计</div> <div class="value_con"><span>{{info.TWOHJ}}</span> </div></div>
      <div  class="flex_box"><div class="key_con">公务员补助合计</div> <div class="value_con"><span>{{info.THEHJ}}</span> </div></div>
    </div>

    <div class="record_wrapper">
      <div class="record_title">大病互助支付</div>
      <div class="flex_box"><div class="key_con underline">80000-200000</div> <div class="value_con"><span class="label">比例</span> <span>金额</span></div></div>
      <div  class="flex_box"><div class="key_con">个人比例自付</div> <div class="value_con"><span class="label">{{info.DBGRBL}}%</span> <span>{{info.DBGRJE}}</span></div></div>
      <div  class="flex_box"><div class="key_con">统筹基金支付</div> <div class="value_con"><span class="label">{{info.DBTCBL}}%</span> <span>{{info.DBTCJE}}</span></div></div>
      <div  class="flex_box"><div class="key_con">公务员补助</div> <div class="value_con"><span class="label">{{info.DBGWYBL}}%</span> <span>{{info.DBGWYJE}}</span></div></div>
      <div  class="flex_box"><div class="key_con">超出大病互助封顶线金额</div> <div class="value_con"><span>{{info.CCMDXJE}}</span> </div></div>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, Cell} from 'vux'
import api from '../../router/api.js'
export default {
  name: 'fenduanjisuanmingxi',
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
      let params = api.getParam('F010.001.005', {aac001: window.localStorage['nowPersonNo'], akc190: akc190, aae072: aae072})
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

<style scoped lang="less">
.fdjsmx {
  .flex_box {
    display: flex;
    line-height: 30px;
    .key_con {
      flex: 0 0 55%;
      padding-left: 15px;
    }
    .underline {
      text-decoration:underline
    }
    .value_con {
      flex: 0 0 45%;
      padding-right: 15px;
      .label {
        display: inline-block;
        width: 40px;
      }
    }
  }
}
</style>

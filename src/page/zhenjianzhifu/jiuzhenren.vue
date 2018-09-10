<template>
  <div class="jiuzhenren">
    <x-header :left-options="{backText: ''}">我的预约</x-header>
    <tab active-color="#0084ff" :line-width="2">
      <tab-item selected @on-item-click="onItemClick">全部</tab-item>
      <tab-item  @on-item-click="onItemClick">待支付</tab-item>
      <tab-item @on-item-click="onItemClick">已支付</tab-item>
    </tab>
    <div>
      <div v-for="(item,i) in list" :key="i">
        <div class="item_wrapper clear" @click="toPay(item)">
          <div class="flt_left">
            <div>{{item.orgName}}&nbsp;&nbsp;</div>
            <div class=" price_value"> {{item.deptName}}&nbsp;&nbsp;{{item.doctorName}}</div>
            <div class="sec_text">就诊时间：{{item.regDate}}</div>
          </div>
          <div class="flt_right">
            <div class="state" :class="item.orderStatus === '已退号'? 'cancel_state': ''">{{item.orderStatus}}</div>
            <div class="price">{{item.visitCost}}元</div>
          </div>
        </div>
        <div class="btn_div" v-if="item.orderStatus === '已支付'">
          <a class="btn">去评价</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Tab, TabItem} from 'vux'
import api from '../../router/api'
export default {
  name: 'jiuzhenren',
  components: {XHeader, Tab, TabItem},
  data () {
    return {
      activeIndex: 0,
      list: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    onItemClick (index) {
      this.activeIndex = index
      if (index === 0) {
        this.getList()
      } else if (index === 1) {
        this.getPayList()
      } else if (index === 2) {
        this.getHasPaidList()
      }
    },
    // 获取所有的订单列表
    getList () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.002.006', {cardId: window.localStorage['aac002']})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.list = data.data
        } else {
          this.list = []
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 获取待支付列表
    getPayList () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.002.004', {cardId: window.localStorage['aac002']})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.list = data.data
        } else {
          this.list = []
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 获取已支付列表
    getHasPaidList () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.002.005', {cardId: window.localStorage['aac002']})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.list = data.data
        } else {
          this.list = []
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    fmtStatus (status) {
      if (status === '1') {
        return '待支付'
      } else if (status === '2') {
        return '已支付'
      } else if (status === '3') {
        return '待退款'
      } else if (status === '4') {
        return '已退款'
      } else if (status === '5') {
        return '已取消'
      } else if (status === '9') {
        return '交易失败'
      } else if (status === '10') {
        return '已取号'
      } else if (status === '11') {
        return '已退号'
      } else if (status === '12') {
        return '爽约'
      }
    },
    toPay (item) {
      this.$router.push('/guahaoxiangqing/' + item.orderId)
    }
  }
}
</script>

<style scoped lang="less">
.jiuzhenren {
  .item_wrapper {
    padding: 15px;
    background-color: #fff;
    margin-top: 15px;
    .flt_left {
      float: left;
      .sec_text {
        font-size: 13px;
        color: #777;
      }
      .price_value {
        margin: 6px 0 4px 0;
      }
    }
    .flt_right {
      float: right;
      .state {
        color: #fea813;
        &.cancel_state {
          color: #b2b2b2;
        }
      }
      .price {
        color: #0084ff;
        font-size: 13px;
        margin-top: 6px;
      }
    }
  }
  .btn_div {
    padding: 15px;
    text-align: right;
    border-top: 1px solid #ebebeb;
    background-color: #fff;
    .btn {
      padding: 5px 10px;
      border-radius: 6px;
      border: solid 1px #0084ff;
      color: #0084ff;
    }
  }
}
</style>

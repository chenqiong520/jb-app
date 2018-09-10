<template>
  <div class="dzfxq">
    <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="goBack">挂号详情</x-header>
    <div class="tips_bg" v-if="showPayBt">
     <span class="count_down">{{countDown}} </span> <span v-if="!noTime">后未支付订单将取消！</span>
    </div>
    <Group class="title_group">
      <cell title="预约医院"  :value="orderInfo.orgName"></cell>
      <cell title="预约科室"  :value="orderInfo.deptName"></cell>
      <cell title="预约医生"  :value="orderInfo.doctorName"></cell>
      <cell title="挂号费用"  :value="orderInfo.visitCost +'元'"></cell>
      <cell title="挂号类型"  :value="fmtType(orderInfo.orderNumType)"></cell>
    </Group>
    <Group>
      <cell title="就诊时间"  :value="orderInfo.regDate"></cell>
      <cell title="当前状态" :value="fmtStatus(orderInfo.orderStatus)"></cell>
    </Group>
    <div class="btn_group">
      <x-button v-if="showPayBt && !noTime" class="submit_btn" @click.native="submitPay">确认支付</x-button>
      <x-button v-if="showPayBt  && !noTime" class="cancel" @click.native="cancelAppoint">取消预约</x-button>
      <x-button v-if="showRefundBt  && !noTime" class="submit_btn" @click.native="applyRefund">申请退款</x-button>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, Cell, XButton} from 'vux'
import api from '../../router/api'
export default {
  name: 'daizhifuxiangqing',
  components: {XHeader, Group, Cell, XButton},
  data () {
    return {
      showPayBt: false,
      showRefundBt: false,
      orderInfo: {
        orgName: ''
      },
      countDown: '',
      noTime: false,
      sendTimer: ''
    }
  },
  mounted () {
    this.getOrderDetail()
    // this.countTime()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.preUrl = from.fullPath
    })
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.sendTimer)
    next()
  },
  methods: {
    getOrderDetail () {
      let param = {
        cardId: window.localStorage['aac002'],
        cardType: '1',
        orderId: this.$route.params.orderId
      }
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.002.002', param)
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.orderInfo = data.data
          if (this.orderInfo.orderStatus === '1') {
            this.showPayBt = true
            this.showRefundBt = false
            this.countTime(this.orderInfo.operTime, this.orderInfo.sysdate)
          } else if (this.orderInfo.orderStatus === '2') {
            this.showPayBt = false
            this.showRefundBt = true
          } else {
            this.showPayBt = false
            this.showRefundBt = false
          }
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 倒计时
    countTime (operTime, sysdate) {
      let d = operTime.replace(/\\-/g, '/')
      let sd = sysdate.replace(/\\-/g, '/')
      let time = new Date(d).getTime() // 返回毫秒
      let s = Math.floor((Number(time + 1800000) - new Date(sd).getTime()) / 1000) // 两个时间相差的秒数 向下取整
      if (s <= 0) {
        this.countDown = '已取消'
        this.noTime = true
        return
      }
      let minute = 0
      let second = 0
      this.sendTimer = setInterval(() => {
        minute = Math.floor(s / 60)
        second = s % 60
        this.countDown = minute + '分' + second + '秒'
        --s
        if (s <= 0) {
          this.countDown = '已取消'
          this.noTime = true
          clearInterval(this.sendTimer)
          this.sendTimer = 0
        }
      }, 1000)
    },
    submitPay () {
      this.$router.push('/zhifufangshi')
    },
    // 取消预约
    cancelAppoint () {
      let param = {
        cardId: this.orderInfo.cardId,
        cardType: this.orderInfo.cardType,
        orgCode: this.orderInfo.orgCode,
        orderId: this.orderInfo.orderId,
        hisOrderId: this.orderInfo.hisOrderId,
        scheduleId: this.orderInfo.scheduleId,
        numberinfoId: this.orderInfo.numberinfoId
      }
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.003.001', param)
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.$vux.alert.show({
            title: '提示',
            content: '取消成功'
          })
          this.showPayBt = false
          this.showRefundBt = false
          this.orderInfo.orderStatus = '11'
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    fmtType (typeNo) {
      if (typeNo === '1') {
        return '专家'
      } else if (typeNo === '2') {
        return '普通'
      }
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
    // 申请退款
    applyRefund () {
      let param = {
        cardId: '152524197208291682',
        cardType: '1',
        orgCode: '44494768529212111A1001',
        orderId: '2018072710077532488',
        thirdPartOrderId: '',
        payMode: '',
        hisOrderId: 'G2018072700003',
        scheduleId: '1830',
        numberinfoId: '20180727_HP01_8026_1830',
        refundFee: ''
      }
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.003.002', param)
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.$vux.alert.show({
            title: '提示',
            content: '退款成功'
          })
          this.showPayBt = false
          this.showRefundBt = false
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    goBack () {
      if (this.preUrl !== '/jiuzhenren') {
        this.$router.replace('/jiuzhenren')
      } else {
        history.go(-1)
      }
    }
  }
}
</script>

<style scoped lang="less">
.dzfxq {
  .tips_bg {
    background-color: #f9dfc5;
    padding: 8px 15px;
    font-size: 15px;
    text-align: center;
    color: #fbaa42;
    line-height: 23px;
    .count_down {
      color: #ff0000;
      font-weight: bold;
    }
  }
  .btn_group {
    margin-top: 15px;
    .cancel {
      background-color: #fff;
    }
  }
}
</style>

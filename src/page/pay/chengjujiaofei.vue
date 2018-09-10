<template>
  <div class="ydjf">
    <x-header v-show="!showOrder" :left-options="{backText: ''}">城居缴费单查询</x-header>
    <x-header  v-show="showOrder" :left-options="{backText: '',preventGoBack: true}" @on-click-back="goBack">城居缴费单</x-header>
    <div class="main_content_wrapper" ref="content">
      <div>
        <div  v-show="!showOrder">
          <group class="no_margin">
            <x-input title="身份证" v-model="idCard" ></x-input>
          </group>
          <div class="notice">
            <div>温馨提示：受人民银行清算系统限制每周五至周六及每日19:00-次日7:00为非交易时段，不能缴费。</div>
          </div>
          <div class="btn_group">
            <x-button class="submit_btn next_btn query_btn" :class="idCard ===''? 'disabled': ''" :disabled="idCard ===''"  @click.native="queryPayOrder">查询缴费</x-button>
          </div>
        </div>
        <div v-show="showOrder">
          <Group class="title_group">
            <cell title="个人编号" :value="payOrder.aac001"></cell>
            <cell title="姓名" :value="payOrder.aac003"></cell>
            <cell title="公民身份证" :value="payOrder.aac002"></cell>
            <cell title="经办机构" :value="payOrder.AAB301"></cell>
            <cell title="缴费金额" :value="payOrder.AAB201"></cell>
            <cell title="缴费人数" :value="payOrder.JFRS"></cell>
            <cell title="社保缴费流水号" :value="payOrder.AAE067"></cell>
            <cell title="收入账户" :value="payOrder.BAE010"></cell>
          </Group>
          <div class="btn_group">
            <x-button class="submit_btn next_btn" @click.native="confirmBill">缴费</x-button>
          </div>
        </div>
      </div>
    </div>
    <form  v-show="false" name="zfId" id="zfId" method="post" action="https://pbank.bankofchangsha.com/directBank/paygate/h5/thirdpartyPay.do">
      <input type="hidden" id="Service_version"  name="Service_version" value="1.0"/>
      <input type="hidden" id="Sign"  name="Sign" />
      <input type="hidden" id="ECustName"  name="ECustName"/>
      <input type="hidden" id="ECustId" name="ECustId"/>
      <input type="hidden" id="MerchOrder"  name="MerchOrder"/>
      <input type="hidden" id="OrderAmount"  name="OrderAmount"/>

      <input type="hidden" id="Remark"  name="Remark"/>
      <input type="hidden" id="ReturnUrl"  name="ReturnUrl"/>
      <input type="hidden" id="BackUrl"  name="BackUrl"/>

      <input type="hidden" id="OrderDate" name="OrderDate"/>
      <input type="hidden" id="BusiType"  name="BusiType"/>
    </form>
  </div>
</template>

<script>
import {XHeader, Group, XInput, XButton, Cell} from 'vux'
import api from '../../router/api'
import BScroll from 'better-scroll'
export default {
  name: 'youdanjiaofei',
  components: {XHeader, Group, XInput, XButton, Cell},
  data () {
    return {
      idCard: window.localStorage['aac002'],
      orderNo: '',
      showOrder: false,
      payOrder: {},
      bankInfo: {},
      totalMoney: ''
    }
  },
  methods: {
    goBack () {
      this.showOrder = false
    },
    queryPayOrder () {
      const params = api.getParam('lhjy05', {aac002: this.idCard.trim()})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          if (data.data.resultList.length > 0) {
            this.showOrder = true
            this.payOrder = data.data.resultList[0]
            this.bankInfo = data.data.resultList[1]
            this.totalMoney = data.data.resultLevel
            this.$nextTick(() => {
              this._initScroll()
            })
          } else {
            this.$vux.toast.text(data.data.resultMsg, '')
          }
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 确认缴费
    confirmBill () {
      if (this.bankInfo) {
        // $('#Service_version').val(1.0);
        document.getElementById('Sign').value = this.bankInfo.sign
        document.getElementById('ECustName').value = this.bankInfo.eCustName
        document.getElementById('ECustId').value = (this.bankInfo.eCustId)
        document.getElementById('MerchOrder').value = this.bankInfo.merchOrder
        document.getElementById('OrderAmount').value = this.totalMoney
        document.getElementById('Remark').value = this.bankInfo.remark
        document.getElementById('ReturnUrl').value = this.bankInfo.returnUrl
        document.getElementById('BackUrl').value = this.bankInfo.backUrl
        document.getElementById('OrderDate').value = this.bankInfo.orderTime
        document.getElementById('BusiType').value = this.bankInfo.busiType
        document.getElementById('zfId').submit()
      } else {
        this.$vux.toast.text('查询不到单据信息', '')
      }
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
  .ydjf {
    .query_btn {
      margin-top: 40px;
      color: #fff;
      &.disabled {
        background-image: linear-gradient(#9acefe, #9acefe), linear-gradient(#9acefe, #9acefe);
        background-blend-mode: normal, normal;
      }
    }
  }
</style>

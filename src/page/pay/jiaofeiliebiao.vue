<template>
  <div class="ydjf">
    <x-header  v-show="!showOrder" :left-options="{backText: ''}">有单缴费列表</x-header>
    <x-header v-show="showOrder" :left-options="{backText: '',preventGoBack: true}" @on-click-back="goBack">有单缴费单据</x-header>
    <div class="main_content_wrapper" ref="content">
      <div>
        <div  v-show="!showOrder">
          <div class="record_wrapper" v-for="(item, i) in list" :key="i">
            <div class="item_record"><span class="item_key">单据号</span> <span class="item_value">{{item.aae097}}</span></div>
            <div class="item_record"><span class="item_key">缴费情况</span> <span class="item_value">{{item.aae111}}</span></div>
            <div class="item_record"><span class="item_key">缴费金额</span> <span class="item_value">{{item.aab180}}</span></div>
            <div class="item_record"><span class="item_key">缴费月数</span> <span class="item_value">{{item.aae002}}</span></div>
            <div class="item_record"><span class="item_key">生成日期</span> <span class="item_value">{{item.recordtime}}</span></div>
            <div class="btn_div" v-if="item.isjf === '0'">
              <a class="btn cancel" @click="cancel(item.aae097, item.aac001)">取消单据</a>
              <a class="btn pay" @click="queryPayOrder(item.aae097)">去支付</a>
            </div>
          </div>
          <div v-if="showNoData" style="text-align: center">
            <img style="width: 40%;margin: 10px 0" src="../../assets/no_data.png"/>
            <p>未查询到数据</p>
          </div>
        </div>
        <div v-show="showOrder">
          <Group class="title_group">
            <cell title="个人编号" :value="payOrder.aac001"></cell>
            <cell title="姓名" :value="payOrder.aac003"></cell>
            <cell title="公民身份证" :value="payOrder.aac002"></cell>
            <cell title="经办机构" :value="payOrder.AAB301"></cell>
            <cell title="缴费金额" :value="payOrder.AAB201"></cell>
            <cell title="单据号" :value="payOrder.aae097"></cell>
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
      list: [],
      showOrder: false,
      showNoData: false,
      payOrder: {},
      bankInfo: {}
    }
  },
  mounted () {
    this.queryList()
  },
  methods: {
    goBack () {
      this.showOrder = false
    },
    queryList () {
      const params = api.getParam('lhjy07')
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$nextTick(() => {
          this._initScroll()
        })
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.list = data.data
          if (this.list.length === 0) {
            this.showNoData = true
          }
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    cancel (aae097, aac001) {
      const _this = this
      this.$vux.confirm.show({
        title: '提示',
        content: '确定取消',
        onCancel () {},
        onConfirm () {
          _this.cancelPayBill(aae097, aac001)
        }
      })
    },
    // 取消缴费单
    cancelPayBill (aae097, aac001) {
      const params = api.getParam('lhjy04', {aac002: window.localStorage['aac002'], aae097: aae097, aac001: aac001})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.$vux.toast.text('取消成功', '')
          this.queryList()
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    queryPayOrder (aae097) {
      const params = api.getParam('lhjy06', {aac002: window.localStorage['aac002'], aae097: aae097})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          if (data.data.resultList.length > 0) {
            this.showOrder = true
            this.payOrder = data.data.resultList[0]
            this.bankInfo = data.data.resultList[1]
            this.$nextTick(() => {
              this.scroll.refresh()
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
        document.getElementById('OrderAmount').value = this.bankInfo.aab210
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
    .btn_div {
      padding: 8px 15px;
      border-top: 1px solid #ebebeb;
      text-align: right;
      .btn {
        padding: 4px 10px;
        border-radius: 6px;
        display: inline-block;
        &.pay {
          border: solid 1px #0084ff;
          color: #0084ff;
        }
        &.cancel {
          border: solid 1px #d9d9d9;
          color: #333;
          margin-right: 10px;
        }
      }
    }
    .record_wrapper .item_record {
      padding: 0 15px;
      line-height: 28px;
    }
  }
</style>

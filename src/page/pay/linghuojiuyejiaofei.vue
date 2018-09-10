<template>
  <div class="lhjyjf">
      <x-header :left-options="{backText: ''}">灵活就业缴费</x-header>
      <div class="main_content_wrapper" ref="content">
        <div>
          <group class="no_margin">
            <x-input title="身份证" v-model="idCard" :disabled="true"></x-input>
          </group>
          <div v-show="step===1">
            <div class="title ">
              <span>选择账户(1/6)</span>
            </div>
            <Group class="title_group">
              <PopupPicker title="灵活就业账户" placeholder="请选择" v-model="type"  :columns="1" :data="list"  show-name @on-change="changeAccount"></PopupPicker>
            </Group>
            <div class="notice">
              <div>温馨提示：受人民银行清算系统限制每周五至周六及每日19:00-次日7:00为非交易时段，不能缴费。</div>
            </div>
            <div class="btn_group">
              <x-button class="submit_btn next_btn query_btn" :class="type.length < 1? 'disabled': ''" :disabled="type.length < 1"  @click.native="getPayListForAccount">下一步</x-button>
            </div>
          </div>
          <div v-show="step===2">
            <div class="title">
              <span>查询缴费情况(2/6)</span>
            </div>
            <flexbox class="pay_item" v-for="(item, i) in payList" :key="i">
              <flexbox-item>
                <div class="item"><span class="label">险种</span> <span class="value">{{item.aae140}}</span></div>
                <div class="item"><span class="label">单位编号</span> <span class="value">{{item.aab001}}</span></div>
                <div class="item"><span class="label">单位名称</span> <span class="value">{{item.aab004}}</span></div>
                <div class="item"><span class="label">起止年月</span> <span class="value">{{item.aae041}}-{{item.aae042}}</span></div>
                <div class="item"><span class="label">合计</span> <span class="value">{{item.AAC123}}</span></div>
              </flexbox-item>
              <flexbox-item :span="1">
                <div :class="item.JFQK === '欠费'? 'arrears_state' : 'broken_state'">{{item.JFQK}}</div>
              </flexbox-item>
            </flexbox>
            <div class="btn_group">
              <x-button v-show="payList.length > 0" class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
              <x-button class="pre_next" @click.native="preStep">上一步</x-button>
            </div>
          </div>
          <div v-show="step===3">
            <div class="title ">
              <span>选择险种 (3/6)</span>
            </div>
            <Group class="title_group">
              <PopupPicker title="选择险种" placeholder="请选择" v-model="insurance"  :columns="1" :data="insuranceList"  show-name></PopupPicker>
            </Group>
            <div class="btn_group">
              <x-button class="submit_btn next_btn query_btn" :class="insurance.length < 1? 'disabled': ''" :disabled="insurance.length < 1" @click.native="nextStep">下一步</x-button>
              <x-button class="pre_next" @click.native="preStep">上一步</x-button>
            </div>
          </div>
          <div v-show="step===4">
            <div class="title ">
              <span>选择缴费档次 (4/6)</span>
            </div>
            <Group class="title_group">
              <PopupPicker title="选择缴费档次" placeholder="请选择" v-model="level"  :columns="1" :data="levelList"  show-name></PopupPicker>
            </Group>
            <div class="btn_group">
              <x-button class="submit_btn next_btn query_btn" :class="level.length < 1? 'disabled': ''" :disabled="level.length < 1" @click.native="nextStep">下一步</x-button>
              <x-button class="pre_next" @click.native="preStep">上一步</x-button>
            </div>
          </div>
          <div v-show="step===5">
            <div class="title ">
              <span>选择补缴时间段 (5/6)</span>
            </div>
            <Group class="title_group">
              <datetime v-model="startDate" title="开始日期" placeholder="请选择" format="YYYY-MM" :max-year="maxYear()" year-row="{value}年" month-row="{value}月" > </datetime>
              <datetime v-model="endDate" title="结束日期" placeholder="请选择" format="YYYY-MM" :max-year="maxYear()" year-row="{value}年" month-row="{value}月" > </datetime>
            </Group>
            <div class="btn_group">
              <x-button class="submit_btn next_btn query_btn" :class="startDate === '' || endDate === ''? 'disabled': ''" :disabled="startDate === '' || endDate === ''" @click.native="generateBill">生成单据</x-button>
              <x-button class="pre_next" @click.native="preStep">上一步</x-button>
            </div>
          </div>
          <div v-show="step===6">
            <div class="title ">
              <span>生成补缴单据(6/6)</span>
            </div>
            <Group class="title_group">
              <cell title="单据号" :value="payBill.info.aae097"></cell>
              <cell title="身份证号" :value="payBill.info.aac002"></cell>
              <cell title="个人编号" :value="payBill.info.aac001"></cell>
            </Group>
            <div class="bill_wrapper">
              <flexbox class="pay_item" v-for="(item, i) in payBill.list" :key="i">
                <flexbox-item>
                  <div class="item"><span class="label">险种</span> <span class="value">{{item.aae140}}</span></div>
                  <div class="item"><span class="label">开始年月</span> <span class="value">{{item.aae041}}</span></div>
                  <div class="item"><span class="label">结束年月</span> <span class="value">{{item.aae042}}</span></div>
                  <div class="item"><span class="label">缴费基数</span> <span class="value">{{item.aac150}}</span></div>
                </flexbox-item>
                <flexbox-item>
                  <div class="item"><span class="label">缴费比例</span> <span class="value">{{item.aaa040}}</span></div>
                  <div class="item"><span class="label">本金</span> <span class="value">{{item.AAC123GR}}</span></div>
                  <div class="item"><span class="label">利息</span> <span class="value">{{item.BAC607}}</span></div>
                  <div class="item"><span class="label">合计</span> <span class="value">{{item.HJ}}</span></div>
                </flexbox-item>
              </flexbox>
              <div class="total_wrapper">合计：<span class="total_value">{{totalMoney}}元</span></div>
            </div>
            <div class="btn_group">
              <x-button class="submit_btn next_btn" @click.native="confirmBill">缴费</x-button>
              <x-button class="pre_next" @click.native="cancelPayBill">取消</x-button>
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
import {XHeader, Group, XInput, XButton, PopupPicker, Flexbox, FlexboxItem, Datetime, Cell} from 'vux'
import api from '../../router/api'
import BScroll from 'better-scroll'
export default {
  name: 'linghuojiuyejiaofei',
  components: {XHeader, Group, XInput, XButton, PopupPicker, Flexbox, FlexboxItem, Datetime, Cell},
  data () {
    return {
      payList: [],
      idCard: '',
      showError: false,
      isCorrentId: false,
      step: 1,
      type: [],
      list: [],
      insurance: [],
      insuranceList: [{value: '11', name: '养老'}, {value: '31', name: '基本医疗、大病医疗'}],
      level: [],
      levelList: [{value: '1', name: '100%'}, {value: '0.6', name: '60%'}],
      startDate: '',
      endDate: '',
      selectedAccount: {},
      payBill: {
        info: {
          aae097: '',
          aac002: '',
          aac001: ''
        },
        list: []
      },
      totalMoney: '', // 缴费单所有的合计
      bankInfo: {}
    }
  },
  mounted () {
    this.queryIdCard()
    this._initScroll()
  },
  methods: {
    // 获取账户信息
    queryIdCard () {
      const params = api.getParam('lhjy01')
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          let list = []
          data.data.forEach((e) => {
            list.push({name: e.aab004, value: e.aac001, username: e.aac003, dwbh: e.aab001})
          })
          this.list = list
          this.idCard = data.data[0].aac002
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    changeAccount (value) {
      for (let i in this.list) {
        if (this.list[i].value === value[0]) {
          this.selectedAccount = {aac001: this.list[i].value, aac003: this.list[i].username, aab001: this.list[i].dwbh}
          return
        }
      }
    },
    // 根据个人账户查询缴费信息列表
    getPayListForAccount () {
      const params = api.getParam('lhjy02', this.selectedAccount)
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          if (!data.data.result) {
            this.$vux.toast.text('该账户下没有缴费数据', '')
            return
          }
          this.step = this.step + 1
          this.payList = data.data.resultList[1]
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    nextStep () {
      if (this.step === 3 && this.insurance[0] === '31') {
        this.step = this.step + 2
      } else {
        this.step = this.step + 1
      }
      this.$nextTick(() => {
        this.scroll.refresh()
        this.scroll.scrollTo(0, 0, 500)
      })
    },
    preStep () {
      if (this.step === 5 && this.insurance[0] === '31') {
        this.step = this.step - 2
      } else {
        this.step = this.step - 1
      }
      this.$nextTick(() => {
        this.scroll.refresh()
        this.scroll.scrollTo(0, 0, 500)
      })
    },
    maxYear () {
      let date = new Date().getFullYear()
      return date
    },
    // 生成单据
    generateBill () {
      let startDate = this.startDate.substring(0, 4) + this.startDate.substring(5)
      let endDate = this.endDate.substring(0, 4) + this.endDate.substring(5)
      let jfData = [{aab001: '10004728', aac001: '10312698'}]
      let jsonData = []
      if (this.insurance[0] === '11') {
        // 保险选择为养老
        jsonData.push({aae140: this.insurance[0], aae041: startDate, aae042: endDate, aae171: this.level[0], LXBZ: '1', aaa040: ''})
      } else {
        // 保险选择为基本医疗、大病医疗
        jsonData.push({aae140: this.insurance[0], aae041: this.startDate, aae042: this.endDate, aae171: 1, LXBZ: '1', aaa040: ''})
        jsonData.push({aae140: '32', aae041: this.startDate, aae042: this.endDate, aae171: 1, LXBZ: '1', aaa040: ''})
      }
      let param = {jfData: jfData, jsonData: jsonData}
      this.$vux.loading.show({text: '加载中'})
      const params = api.getParam('lhjy03', param)
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          if (data.data.resultList[0].length > 0) {
            this.step = this.step + 1
            this.payBill.info = data.data.resultList[0][0]
            this.payBill.list = data.data.resultList[1]
            this.bankInfo = data.data.resultList[2]
            this.totalMoney = data.data.resultLevel
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
    // 取消缴费单
    cancelPayBill () {
      const params = api.getParam('lhjy04', this.payBill.info)
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.step = 1
          this.$vux.toast.text(data.data.resultMsg, '')
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
.lhjyjf {
  .danger {
    height:35px;
    background-color: rgba(247, 98, 96, 0.3);
    text-align: center;
    line-height: 35px;
    font-size: 13px;
  }
  .query_btn {
    margin-top: 40px;
    color: #fff;
    &.disabled {
      background-image: linear-gradient(#9acefe, #9acefe), linear-gradient(#9acefe, #9acefe);
      background-blend-mode: normal, normal;
    }
  }
  .pay_item {
    background-color: #fff;
    padding: 15px;
    box-sizing: border-box;
    border-top: solid 1px #ebebeb;
    .item {
      margin-bottom: 8px;
      line-height: 25px;
      font-size: 14px;
    }
    .label {
      display: inline-block;
      width: 70px;
    }
    .value {
      color: #777;
    }
    .arrears_state {
      font-size: 13px;
      color: #ff4200;
      text-align: right;
    }
    .broken_state {
      font-size: 13px;
      color: #fba244;
      text-align: right;
    }
  }
  .total_wrapper {
    background-color: #fff;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    text-align: right;
    padding-right: 15px;
    border-top: solid 1px #ebebeb;
    .total_value {
      color: #0084ff;
    }
  }
  .bill_wrapper {
    margin-top: 15px;
  }
}
</style>

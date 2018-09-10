<template>
  <div class="yibaoka">
    <x-header :left-options="{backText: ''}">医保卡</x-header>
    <div class="main_content_wrapper" ref="content">
      <div>
        <Group class="title_group">
          <cell title="姓名" :value="userInfo.name"></cell>
          <cell title="余额" :value="userInfo.balance"></cell>
          <datetime v-model="queryParam.startTime" title="年月" format="YYYY-MM"  :max-year="maxYear()"  @on-confirm="getList"> </datetime>
        </Group>
        <div class="record_con">
          <div class="item_content" v-for="(item, i) in list" :key="i">
            <div class="item_record"><span class="item_key">交易日期</span> <span class="item_value">{{item.transdate}}</span></div>
            <div class="item_record"><span class="item_key">交易流水号</span> <span class="item_value">{{item.transserial}}</span></div>
            <div class="item_record"><span class="item_key">交易类型</span> <span class="item_value">{{item.transtype}}</span></div>
            <div class="item_record"><span class="item_key">收支类型</span> <span class="item_value">{{item.paytype}}</span></div>
            <div class="item_record"><span class="item_key">交易金额</span> <span class="item_value">{{item.transamt}}</span></div>
            <div class="item_record"><span class="item_key">账户余额</span> <span class="item_value">{{item.transbal}}</span></div>
          </div>
        </div>
        <div v-if="showNoData" style="text-align: center">
          <img style="width: 40%;margin: 10px 0" src="../../assets/no_data.png"/>
          <p>未查询到数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../router/api'
import {XHeader, Group, Cell, Datetime, XButton} from 'vux'
import BScroll from 'better-scroll'
export default {
  name: 'yibaoka',
  components: {XHeader, Group, Cell, Datetime, XButton},
  data () {
    return {
      userInfo: {
        name: '',
        balance: ''
      },
      queryParam: {
        startTime: this.$root.formatDate(new Date(), 'yyyy-MM')
      },
      list: [],
      showNoData: false
    }
  },
  created () {
    if (window.localStorage['userInfo']) {
      let userInfo = JSON.parse(window.localStorage['userInfo'])
      this.userInfo.name = userInfo.fullname
    }
  },
  mounted () {
    this.getBalance()
    this.getList()
    this._initScroll()
  },
  methods: {
    // 获取余额
    getBalance () {
      const params = api.getParam('F002.001.008', {aac001: window.localStorage['nowPersonNo']})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.userInfo.balance = data.data[0].bal + '元'
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    getList () {
      let begin = this.queryParam.startTime.substring(0, 4) + this.queryParam.startTime.substring(5)
      const params = api.getParam('F002.001.009', {aac001: window.localStorage['nowPersonNo'], cxdate: begin})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        this.showNoData = false
        if (data.code === 0) {
          if (data.data.length > 0) {
            this.list = data.data
          } else {
            this.list = []
            this.showNoData = true
          }
          this.$nextTick(() => {
            if (this.scroll) {
              this.scroll.refresh()
              this.scroll.scrollTo(0, 0, 500)
            } else {
              this._initScroll()
            }
          })
        } else {
          if (data.code === 500) {
            this.list = []
            this.showNoData = true
          } else {
            this.$vux.toast.text(data.msg, '')
          }
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
    },
    maxYear () {
      let date = new Date().getFullYear()
      return date
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

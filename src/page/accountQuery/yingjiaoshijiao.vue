<template>
  <div class="yjsj">
    <div>
      <x-header :left-options="{backText: ''}">应缴实缴查询</x-header>
      <div class="main_content_wrapper" ref="content">
        <div>
          <div>
            <group>
              <datetime v-model="query.date" title="年月" format="YYYY-MM" :max-year="maxYear()" @on-confirm="queryToDate"> </datetime>
            </group>
          </div>
          <div v-for="(item, i) in data" :key="i">
            <div class="item_title">({{item.AAE003}}){{item.SAAE140}}</div>
            <div class="item_content" >
              <div class="item_state">{{item.AAE114}}</div>
              <div class="item_record"> <span class="item_key">缴费基数</span> <span class="item_value">{{item.AAC150}}</span></div>
              <div class="item_record"> <span class="item_key">单位缴纳</span> <span class="item_value">{{item.DWJN}}</span></div>
              <div class="item_record"> <span class="item_key">个人缴纳</span> <span class="item_value">{{item.GRJN}}</span></div>
              <div class="item_record"> <span class="item_key">划账总额</span> <span class="item_value">{{item.AAC130}}</span></div>
              <div  class="item_record"> <span class="item_key">缴费类型</span> <span class="item_value">{{item.AAE143}}</span></div>
            </div>
          </div>
          <div v-if="showNoData" style="text-align: center">
            <img style="width: 40%;margin: 10px 0" src="../../assets/no_data.png"/>
            <p>未查询到数据</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Flexbox, FlexboxItem, Datetime, Group, Search} from 'vux'
import api from '../../router/api.js'
import BScroll from 'better-scroll'
export default {
  name: 'yingjiaoshijiao',
  components: {XHeader, Flexbox, FlexboxItem, Datetime, Group, Search},
  data () {
    return {
      query: {
        date: this.$root.formatDate(new Date(), 'yyyy-MM')
      },
      loadDate: '',
      data: [],
      show: false,
      showNoData: false
    }
  },
  mounted () {
    this.queryToDate(this.query.date)
  },
  methods: {
    maxYear () {
      let date = new Date().getFullYear()
      return date
    },
    queryToDate (year) {
      this.loadDate = year
      const params = api.getParam('F002.001.002', {aae003: year})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        this.showNoData = false
        if (data.code === 0) {
          this.data = data.data
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
            this.data = []
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
    infinite (done) {
      /* this.loadDate = this.getNextMonth(this.loadDate)
      const params = api.getParam('F002.001.002', {aac001: window.localStorage['nowPersonNo'], aae003: this.loadDate})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          if (data.data.length > 0) {
          } else {
            this.$refs.my_scroller.finishInfinite(2)
          }
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      }) */
    },
    // 获取上一个月
    getNextMonth (date) {
      let arr = date.split('-')
      let year = arr[0] // 获取当前日期的年份
      let month = arr[1] // 获取当前日期的月份
      let year2 = year
      let month2 = parseInt(month) - 1
      if (month2 === 0) {
        year2 = parseInt(year2) - 1
        month2 = 12
      }
      if (month2 < 10) {
        month2 = '0' + month2
      }
      let t2 = year2 + '-' + month2
      return t2
    },
    _initScroll () {
      this.scroll = new BScroll(this.$refs.content, {
        click: true
      })
    }
  }
}
</script>

<style  lang="less">
  .yjsj {
    .vux-no-group-title {
      margin-top: 0;
    }
    .item_title {
      text-align: center;
      color: #9f9f9f;
      padding: 7px 0;
      font-size: 13px;
    }
    .item_record {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .item_content {
      background-color: #fff;
      padding: 10px 15px;
      font-size: 14px;
      position: relative;
      .item_key {
        color: #212121;
        font-weight: bold;
        display: inline-block;
        margin-right: 12px;
      }
      .item_value {
        color: #a4a4a4;
      }
      .item_state {
        font-size: 13px;
        line-height: 13px;
        position: absolute;
        top:10px;
        right: 15px;
        width: 135px;
        padding: 5px 0;
        background-color: #0084ff;
        text-align: center;
        color: #fff;
        border-radius: 10px;
      }
    }
    .scroller {
      top:97px;
      bottom:0;
      height: auto!important;
    }
  }
</style>

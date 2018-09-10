<template>
  <div class="yanglao">
    <x-header :left-options="{backText: ''}">养老账户</x-header>
    <div class="main_content_wrapper" ref="content">
      <div>
        <div class="record_title clear">
          <span class="span_text">年度养老保险缴费详细记录</span>
          <group class="year_div">
            <datetime v-model="query.year" format="YYYY" :max-year="maxYear()" @on-confirm="queryToYear"> </datetime>
          </group>
        </div>
        <div>
          <div v-for="(item, i) in data" :key="i">
            <div class="item_title">{{fmtMonth(item.AAE003)}}月</div>
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
import {XHeader, Datetime, Group} from 'vux'
import api from '../../router/api'
import BScroll from 'better-scroll'
export default {
  name: 'yanglaozhanghu',
  components: {XHeader, Datetime, Group},
  data () {
    return {
      query: {
        year: new Date().getFullYear().toString()
      },
      data: [],
      show: false,
      showNoData: false
    }
  },
  mounted () {
    this.queryToYear(this.query.year)
  },
  methods: {
    maxYear () {
      let date = new Date().getFullYear()
      return date
    },
    // 根据年份查询养老保险
    queryToYear (year) {
      let params = api.getParam('F002.001.003', {year: year})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params, window.localStorage['token']).then((data) => {
        this.$vux.loading.hide()
        this.showNoData = false
        if (data.code === 0) {
          this.data = data.data
          if (this.scroll) {
            this.scroll.refresh()
            this.scroll.scrollTo(0, 0, 500)
          } else {
            this.$nextTick(() => {
              this._initScroll()
            })
          }
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
    fmtMonth (date) {
      if (date) return date.substring(4)
      return ''
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
  .yanglao {
    .record_title {
      padding: 10px 15px;
      background-color: #fff;
      border-bottom: 1px solid #ededed;
      .year_div {
        float: right;
        .vux-no-group-title {
          margin-top: 0;
        }
        .vux-datetime {
          padding: 4px!important;
          border: 1px solid #ededed;
          border-radius: 4px;
        }
      }
      .span_text {
        line-height: 31px;
        font-size: 14px;
      }
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
  }
</style>

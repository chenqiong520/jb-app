<template>
  <div class="rjqdmx">
    <x-header :left-options="{backText: ''}">住院明细</x-header>
    <Group class="sel_date title_group">
      <datetime title="选择日期" v-model="query.date" :start-date="startDate" :end-date="endDate"  @on-confirm="queryList"> </datetime>
    </Group>
    <div class="main_content_wrapper" ref="content">
      <div>
        <div class="item_content">
          <div class="item_record"><span class="item_key">总计总费用</span> <span class="item_value">{{total.AKC227}}</span></div>
          <div class="item_record"><span class="item_key">总计自付金额</span> <span class="item_value">{{total.AKC228}}</span></div>
          <div class="item_record"><span class="item_key">总计报销金额</span> <span class="item_value">{{total.BXJE}}</span></div>
        </div>
        <div class="item_content" v-for="(item, i) in  list" :key="i">
          <div class="item_record"><span class="item_key">类型</span> <span class="item_value">{{item.AKA063}}</span></div>
          <div class="item_record"><span class="item_key">项目</span> <span class="item_value">{{item.AKC516}}</span></div>
          <div class="item_record"><span class="item_key">单价</span> <span class="item_value">{{item.AKC225}}</span></div>
          <div class="item_record"><span class="item_key">数量</span> <span class="item_value">{{item.AKC226}}</span></div>
          <div class="item_record"><span class="item_key">总费用</span> <span class="item_value">{{item.AKC227}}</span></div>
          <div class="item_record"><span class="item_key">自付金额</span> <span class="item_value">{{item.AKC228}}</span></div>
          <div class="item_record"><span class="item_key">报销金额</span> <span class="item_value">{{item.BXJE }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Datetime, Group, XTable} from 'vux'
import api from '../../router/api.js'
import BScroll from 'better-scroll'
export default {
  name: 'yibaobaoxiao',
  components: {XHeader, Datetime, Group, XTable},
  data () {
    return {
      list: [],
      total: {
        AKC227: '',
        AKC228: '',
        BXJE: ''
      },
      query: {
        date: this.$route.params.date
      },
      startDate: '',
      endDate: '',
      page: {
        pageNow: 1,
        pageSize: 8
      }
    }
  },
  mounted () {
    if (this.$route.params.date) {
      this.queryDetailList(this.query.date)
    }
    this.queryDate()
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    queryList (date) {
      this.page.pageNow = 1
      this.list = []
      this.scroll.finishPullUp()
      this.queryDetailList(date)
    },
    queryDetailList (date) {
      let params = api.getParam('F010.001.007', {akc190: this.$route.params.akc190, aae072: this.$route.params.aae072, zysj: date},
        {paging: true, pageNow: this.page.pageNow, pageSize: this.page.pageSize})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params, window.localStorage['token']).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          if (data.data.rows.length > 0) {
            if (this.list.length > 0) {
              this.list = this.list.concat(data.data.rows)
              this.$nextTick(() => {
                this.scroll.refresh()
              })
              if (data.data.rows.length < this.page.pageSize) return
              this.scroll.finishPullUp()
            } else {
              this.list = data.data.rows
              this.$nextTick(() => {
                this.scroll.refresh()
              })
            }
          }
          if (data.data.value) {
            this.total = data.data.value
          }
        } else {
          if (data.code === 500) this.list = []
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    queryDate () {
      let params = api.getParam('F010.002.001', {akc190: this.$route.params.akc190, aac001: window.localStorage['nowPersonNo']})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.startDate = data.data[0].AKC192
          this.endDate = data.data[0].AKC194
          if (!this.query.date) {
            this.query.date = data.data[0].AKC192
            this.queryDetailList(this.startDate)
          }
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    _initScroll () {
      this.scroll = new BScroll(this.$refs.content, {
        click: true,
        pullUpLoad: {
          threshold: -40
        }
      })
      this.scroll.on('pullingUp', () => {
        this.page.pageNow = this.page.pageNow + 1
        this.queryDetailList(this.query.date)
      })
    }
  }
}
</script>

<style scoped lang="less">
  .rjqdmx {
    .sel_date {
      position: absolute;
      width: 100%;
      z-index:50;
    }
    .main_content_wrapper {
      top:112px;
    }
    .item_content {
      background-color: #fff;
      padding: 10px 15px;
      font-size: 14px;
      position: relative;
      border-top: solid 1px #ebebeb;
      &:first-child {
        border-top: none;
        margin-top: 15px;
      }
      .item_key {
        display: inline-block;
        width: 90px;
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
      .item_record {
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>

<template>
  <div class="social_security">
    <x-header :left-options="{showBack: false}">社保</x-header>
    <div class="main_content_wrapper" ref="content">
      <div>
        <div class="bg_img"></div>
        <grid class="content_wrap" :cols="4" :show-vertical-dividers="false" :show-lr-borders="false">
          <grid-item class="item" :link="item.url" :label="item.name" v-for="(item,i) in menuList" :key="i">
            <img slot="icon"  :src="item.icon"/>
          </grid-item>
        </grid>
          <div>
            <div class="title">
              <span>办理进度</span>
            </div>
            <div class="clear progress_wrapper" v-for="(childItem, k) in pageInfo.progress" :key="k">
              <div class="circle_img">
                <x-circle
                  :percent="fmtPercent(childItem.percent)"
                  :stroke-width="5"
                  stroke-color="#4db7e6">
                  <span class="span_text">{{ childItem.percent }}%</span>
                </x-circle>
              </div>
              <div class="left_wrapper">
                <div class="type">{{childItem.nodename}}</div>
                <div class="desc">{{childItem.describe}}</div>
                <div class="state">{{childItem.appstatus}}</div>
              </div>
              <div class="right_wrapper">
                <span>{{fmtDate(childItem.createtime)}}</span> <i><x-icon type="ios-arrow-right" size="23"></x-icon></i>
              </div>
            </div>
            <div v-if="pageInfo.progress.length === 0"  class="notice_msg progress_wrapper">{{noticeMsg}}</div>
          </div>
        <div  v-if="pageInfo.news.length > 0" class="hot_cont">
          <div class="title">
            <span>热点资讯</span>
          </div>
          <div  v-for="(childItem, h) in pageInfo.news" :key="h" class="clear hot_information" @click="toDetail(childItem.newsid)">
            <div class="left_wrapper">
              <img  class="img" :src="childItem.photopath"/>
            </div>
            <div class="left_wrapper">
              <div class="info_title">{{childItem.nodename}}</div>
              <div class="desc">{{childItem.describe}}</div>
            </div>
            <div class="info_date">
              <span>{{fmtDate(childItem.createtime)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, XCircle, Grid, GridItem, Flexbox, FlexboxItem} from 'vux'
import api from '../router/api'
import BScroll from 'better-scroll'
export default {
  name: 'socialSecurity',
  components: {XHeader, XCircle, Grid, GridItem, Flexbox, FlexboxItem},
  data () {
    return {
      menuList: [{
        name: '灵活就业',
        icon: '../../deploy/static/icon/lhjy.png',
        url: '/linghuojiuyejiaofei'
      }, {
        name: '有单缴费',
        icon: '../../deploy/static/icon/ydjf.png',
        url: '/youdanjiaofei'
      }, {
        name: '城居缴费',
        icon: '../../deploy/static/icon/cjjf.png',
        url: '/chengjujiaofei'
      }, {
        name: '应缴实缴',
        icon: '../../deploy/static/icon/yjsj.png',
        url: '/yingjiaoshijiao'
      }, {
        name: '养老账户',
        icon: '../../deploy/static/icon/ylzh.png',
        url: '/yanglaozhanghu'
      }, {
        name: '医保划账',
        icon: '../../deploy/static/icon/ybhz.png',
        url: '/yibaohuazhang'
      }, {
        name: '其他',
        icon: '../../deploy/static/icon/more.png',
        url: '/more'
      }],
      percent: 70,
      pageInfo: {
        progress: [],
        news: []
      },
      noticeMsg: '暂无数据'
    }
  },
  created () {
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'index' || from.name === 'mine' || from.name === 'login') {
      to.meta.keepAlive = false
    } else {
      to.meta.keepAlive = true
    }
    next()
  },
  mounted () {
    this._initScroll()
    this.progress()
    this.queryNews()
  },
  methods: {
    // 初始化加载主页页面信息
    progress () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Q009.009.008')
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        this.$nextTick(() => {
          this.scroll.refresh()
        })
        if (data.code === 0) {
          this.pageInfo.progress = data.data.rows
        } else {
          if (data.code === 9021) {
            this.pageInfo.progress = []
            this.noticeMsg = data.msg
          }
        }
      }).catch(() => {
        this.$vux.loading.hide()
      })
    },
    // 初始化加载新闻
    queryNews () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Q009.009.009')
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        this.$nextTick(() => {
          this.scroll.refresh()
        })
        if (data.code === 0) {
          this.pageInfo.news = data.data.rows
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 格式化日期
    fmtDate (dateString) {
      if (dateString) {
        return dateString.substring(0, 10)
      }
    },
    // 格式化百分比
    fmtPercent (pecent) {
      return parseFloat(pecent)
    },
    toDetail (newsid) {
      this.$router.push('/news/' + newsid)
    },
    _initScroll () {
      this.scroll = new BScroll(this.$refs.content, {
        click: true
      })
    }
  }
}
</script>

<style lang="less">
  .social_security {
    margin-bottom: 24px;
    .bg_img {
      background-image: url("../assets/bg.png");
      background-size: 100% 100%;
      height: 117px;
    }
    .notice_msg {
      background-color: #fff;
      font-size: 15px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    .first {
      margin-top: 0;
    }
    .content_wrap {
      background-color: #fff;
      .weui-grid:after {
        border-bottom: none;
      }
      &.weui-grids:before {
        border-top:none;
      }
    }
    .item {
      text-align: center;
      .weui-grid__icon {
        display: inline-block;
      }
      .weui-grid__label {
        font-size: 13px;
        color: #333;
      }
    }
    .progress_wrapper {
      background-color: #fff;
      padding: 15px;
      border-top: solid 1px #ebebeb;
      .circle_img {
        width:50px;
        height:50px;
        float: left;
        margin-right: 12px;
        .span_text {
          font-size:12px;
        }
      }
      .left_wrapper {
        float: left;
        .type {
          font-size: 15px;
          line-height: 19px;
          color: #333;
        }
        .desc, .state {
          font-size: 12px;
          line-height: 19px;
          color: #888;
        }
      }
      .right_wrapper {
        float: right;
        position: relative;
        height: 57px;
        span {
          font-size: 13px;
          color: #777;
          line-height: 57px;
          display: inline-block;
          margin-right: 23px;
        }
        i {
          position: absolute;
          bottom: 13px;
          right: 0;
        }
        .vux-x-icon {
          fill: #777;
        }
      }
    }
    .hot_cont {
      .hot_information {
        padding: 15px;
        background-color: #fff;
        border-top: solid 1px #ebebeb;
        position: relative;
        .left_wrapper {
          float: left;
        }
        .img {
          width: 47px;
          height: 36px;
          margin-right: 10px;
        }
        .info_title {
          font-size: 15px;
          color: #333;
          line-height: 15px;
        }
        .desc {
          margin-top: 8px;
          font-size: 12px;
          line-height: 12px;
          color: #777;
        }
        .info_date {
          position: absolute;
          bottom: 15px;
          right: 15px;
          font-size: 13px;
          color: #777;
        }
      }
    }
  }
</style>

<template>
  <div class="index">
    <x-header :left-options="{showBack: false}">社保小助手</x-header>
    <grid class="content_wrap_bottom" :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item class="item" link="" label="扫一扫" onclick="window.AndroidInterface.ScanQRCode()">
        <img slot="icon"  src="../assets/扫一扫.png"/>
      </grid-item>
      <grid-item  class="item" link="" label="缴费">
        <img slot="icon"  src="../assets/缴费.png"/>
      </grid-item>
      <grid-item  class="item" link="" label="补贴">
        <img slot="icon"  src="../assets/补贴.png"/>
      </grid-item>
      <grid-item  class="item" link="" label="认证" @click.native="verifyCode">
        <img slot="icon"  src="../assets/认证.png"/>
      </grid-item>
    </grid>
    <grid class="content_wrap" :cols="4" :show-vertical-dividers="false" :show-lr-borders="false">
      <grid-item class="mgrid_item" :link="item.url" :label="item.name" v-for="(item,i) in menuList" :key="i">
        <img slot="icon"  :src="item.icon"/>
    </grid-item>
    </grid>
    <div>
      <div class="clear progress_wrapper">
        <div class="left_wrapper">
          <div class="type">•&nbsp;&nbsp;您已支付挂号费4元
            <span class="desc">&nbsp;&nbsp;1天前</span>
          </div>
          <div class="type">•&nbsp;&nbsp;您已支付挂号费4元
            <span class="desc">&nbsp;&nbsp;1天前</span>
          </div>
        </div>
        <div class="right_wrapper">
          <span></span> <i> <x-icon type="ios-arrow-right" size="23"></x-icon></i>
        </div>
      </div>
    </div>
    <div class="">
      <div class="ad clear">
        <div class="ad_con">
          <div class="m_title">热烈庆祝便民一卡通APP上线</div>
          <div class="txt">专属你的APP</div>
        </div>
        <img  class="right_img" src="../assets/index.png"/>
      </div>
    </div>
    <div class="hot_cont">
      <div class="title">
        <span>热点资讯</span>
      </div>
      <div class="clear hot_information">
        <div class="left_wrapper">
          <img  class="img" src="../assets/news.png"/>
        </div>
        <div class="left_wrapper">
          <div class="info_title">社保卡的使用</div>
          <div class="desc">分类社保卡的使用</div>
        </div>
        <div class="info_date">
          <span>2018-4-13</span>
        </div>
      </div>
      <div class="clear hot_information">
        <div class="left_wrapper">
          <img class="img" src="../assets/news.png" />
        </div>
        <div class="left_wrapper">
          <div class="info_title">诊间支付的帮助</div>
          <div class="desc">如何使用诊间支付</div>
        </div>
        <div class="info_date">
          <span>2018-4-13</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Cell, Group, XCircle, Grid, GridItem, Flexbox, FlexboxItem} from 'vux'
export default {
  name: 'm_index',
  components: {XHeader, Cell, Group, XCircle, Grid, GridItem, Flexbox, FlexboxItem},
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
        name: '账户单',
        icon: '../../deploy/static/icon/sbkxx.png',
        url: '/gerenzhanghudan'
      }, {
        name: '登记备案',
        icon: '../../deploy/static/icon/djba.png',
        url: '/djba'
      }],
      userInfo: {}
    }
  },
  methods: {
    verifyCode () {
      this.userInfo = JSON.parse(window.localStorage['userInfo'])
      if (this.userInfo) {
        window.AndroidInterface.StartIdentify(this.userInfo.fullname, this.userInfo.aac002)
      } else {
        this.$vux.toast.text('请先登录', '')
      }
    }
  }
}
</script>

<style lang="less">
  .index {
    .first {
      margin-top: 0;
    }
    .content_wrap_bottom {
      background-color: #0084ff;
      a:active {
        background-color: #0084ff;
      }
    }
    .content_wrap_bottom:before {
       position: relative;
     }
    .content_wrap {
      background-color: #ffffff;
      grid-row-gap: 0px;
    }
    .grid-center {
      display: block;
      text-align: center;
      color: #666;
    }
    .mgrid_item:after {
      margin-top: 0px;
      border-bottom-style: none;
    }
    .item {
      text-align: center;
      .weui-grid__icon {
        display: inline-block;
        width: 34px;
        height: 34px;
      }
      .weui-grid__label {
        font-size: 13px;
        color: #fff;
      }
    }
    .mgrid_item {
      text-align: center;
      .weui-grid__icon {
        display: inline-block;
        width: 34px;
        height: 34px;
      }
      .weui-grid__label {
        font-size: 13px;
        color: #333;
      }
    }
    .progress_wrapper {
      background-color: #fff;
      padding: 15px;
      position: relative;
      margin-top: 15px;
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
        i {
          position: absolute;
          bottom: 18px;
          right: 15px;
        }
        .vux-x-icon {
          fill: #777;
        }
      }
    }
    .hot_cont {
      margin-bottom: 24px;
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
    .ad {
      margin-top: 15px;
      background-color: #fff;
      position: relative;
      .ad_con {
        position: absolute;
        padding: 17px 0 17px 15px;
        .m_title {
          font-size: 20px;
          font-weight: bold;
        }
        .txt {
          font-size: 15px;
          margin-top: 8px;
          color: #939393;
        }
      }
      .right_img {
        float: right;
        width: 120px;
        height: 90px;
      }
    }
  }
</style>

<template>
  <div class="mine">
    <x-header :left-options="{showBack: false}">我的<a slot="right" style="color: #fff" @click="toSetting">设置</a></x-header>
    <div class="user_info">
      <div class="info">
        <div class="phtoto_div">
          <p class="center"><img src="../../assets/user.png"/></p>
        </div>
        <div class="name_div">
          <p class="nickname">{{userInfo.fullname}}</p>
          <p class="account">{{userInfo.phone}}</p>
        </div>
        <div class="info_detial_div">
          <cell title="" value="" is-link link="/baseInfo"></cell>
        </div>
      </div>
    </div>
    <Group class="title_group">
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/01.png"/></span>
        <cell title="社保卡业务" is-link link="/shebaoka"></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/02.png"/></span>
        <cell title="养老服务" is-link link="/yanglaofuwu"></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/03.png"/></span>
        <cell title="就业业务" is-link link="/jiuye"></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/04.png"/></span>
        <cell title="工伤业务" is-link link="/gongshang"></cell>
      </div>
    </Group>
    <Group>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/05.png"/></span>
        <cell title="缴费业务" is-link link="/shebaojiaofei"></cell>
      </div> <div class="item_wrapper">
      <span class="tip icon"><img src="../../assets/mine/06.png"/></span>
      <cell title="医保业务" is-link link="/yibao"></cell>
    </div> <div class="item_wrapper">
      <span class="tip icon"><img src="../../assets/mine/07.png"/></span>
      <cell title="生育业务" is-link link="/shengyu"></cell>
    </div> <div class="item_wrapper">
      <span class="tip icon"><img src="../../assets/mine/08.png"/></span>
      <cell title="失业补贴" is-link link="/shiyebutie"></cell>
    </div>
    </Group>
  </div>
</template>

<script>
// import api from '../../router/api'
import {XHeader, Group, Cell} from 'vux'

export default {
  name: 'mine',
  components: {XHeader, Group, Cell},
  data () {
    return {
      userInfo: {
        fullname: '',
        phone: ''
      }
    }
  },
  mounted () {
    let token = window.localStorage['token']
    if (!token) {
      this.$router.push('/login')
    } else {
      this.userInfo = JSON.parse(window.localStorage['userInfo'])
    }
  },
  methods: {
    toSetting () {
      this.$router.push('/setting')
    }
  }
}
</script>

<style  lang="less">
  .mine {
    .user_info {
      background-color: #0084ff;
      height: 95px;
      .info {
        padding: 10px 0 10px 15px;
        display: table;
        width: 100%;
        box-sizing: border-box;

        .phtoto_div {
          display: table-cell;
          vertical-align: middle;
          width: 80px;
          .center {
            text-align: center;
            width: 67px;
            height: 67px;
          }
          .center img {
            width: 67px;
            height: 67px;
          }
        }

        .name_div {
          color: #ffffff;
          display: table-cell;
          vertical-align: middle;
          margin-left: 90px;
          text-align: left;

          .nickname {
            font-size: 18px;
            margin-bottom: 10px;
          }
          .account {
            font-size: 13px;
          }
        }

        .info_detial_div {
          color: #ffffff;
          display: table-cell;
          vertical-align: middle;
          padding-right: 0;
          .weui-cell_access {

            &:active {
              background-color: transparent;
            }

            .weui-cell__ft {
              text-align: right;
              color: #ffffff;

              &:after {
                border-color: #ffffff;
              }
            }
          }
        }
      }
    }
    .item_wrapper {
      .icon {
        width: 18px;
        height: 18px;
        z-index:2;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .weui-cell {
        padding-left: 40px !important;
      }
    }
  }

</style>

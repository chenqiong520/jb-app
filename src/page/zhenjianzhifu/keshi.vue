<template>
  <div class="keshi">
    <x-header :left-options="{backText: ''}">科室列表</x-header>
        <div>
          <search
            class="search"
            v-model="deptName"
            position="absolute"
            placeholder="输入科室"
            top="46px"
            ref="search">
          </search>
        </div>

        <div class="con_wrapper">
          <flexbox class="item_con">
            <flexbox-item class="left_con">
              <img class="hos_img" src="../../assets/hospital.png"/>
              <div class="text_wrapper">
                <div class="titl">{{hospital.orgName}}</div>
                <div class="desc"><span class="ff">4.8分</span><span>就诊量{{hospital.numVisits}}</span></div>
                <div class="desc"><span class="ff">综合医院</span><span>{{hospital.hospitalGrade}}</span></div>
                <div class="address"><img class="addr_icon" src="../../assets/addr.png" />{{hospital.trafficGuide}}</div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1" class="right_con">
              <div>300m</div>
            </flexbox-item>
          </flexbox>
        </div>
          <flexbox class="department">
            <flexbox-item :span="4" class="left">
              <div class="item" :class="activeIndex === i ? 'active': ''" @click="selectDept(item, i)" v-for="(item, i) in list" :key="i">{{item.deptName}}</div>
            </flexbox-item>
            <flexbox-item class="right">
              <div class="item_detail clear" @click="toMenzhen(item.deptCode, item.deptName)"  v-for="(item, i) in childList" :key="i">{{item.deptName}} <i class="fa fa-angle-right"></i> </div>
            </flexbox-item>
          </flexbox>
    <div class="popup_wrapper" v-show="showPopup">
      <div class="content_box">
        <div class="n_title">挂号须知</div>
        <div class="content">{{hospital.hospitalRule}}</div>
        <div class="footer">
          <a @click="goBack">不接受</a>
          <a class="accept" @click="showPopup=false">知晓并接受</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Tab, TabItem, Flexbox, FlexboxItem, Search} from 'vux'
import api from '../../router/api'
export default {
  name: 'hospital',
  components: {XHeader, Tab, TabItem, Flexbox, FlexboxItem, Search},
  data () {
    return {
      orgCode: this.$route.params.orgCode,
      list: [],
      childList: [],
      hospital: {
        hospitalRule: '',
        numVisits: '',
        trafficGuide: ''
      },
      activeIndex: 0,
      showPopup: false,
      deptName: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.fullPath === '/hospital') {
        vm.showPopup = true
      }
    })
  },
  mounted () {
    this.getList()
    this.getHospital()
  },
  methods: {
    // 获取医院信息
    getHospital () {
      let params = api.getParam('Z001.001.001', {orgCode: this.orgCode})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.hospital = data.data[0]
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 获取科室列表
    getList () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.001.002', {orgCode: this.orgCode})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.list = data.data
          this.selectDept(data.data[0], 0)
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    selectDept (item, i) {
      this.activeIndex = i
      if (item.children) {
        if (typeof item.children.child === 'object' && !isNaN(item.children.child.length)) {
          this.childList = item.children.child
        } else {
          this.childList = [item.children.child]
        }
      } else {
        this.childList = [{deptName: item.deptName, deptCode: item.deptCode}]
      }
    },
    goBack () {
      history.go(-1)
    },
    toMenzhen (deptCode, name) {
      this.$router.push('/menzhen/' + this.orgCode + '?deptCode=' + deptCode + '&deptName=' + name)
    }
  }
}
</script>

<style lang="less">
  .vux-search-box.search {
    position: relative!important;
    top: 0!important;
    .weui-search-bar__box .weui-search-bar__input {
      height: 28px;
    }
    .weui-search-bar__label{
      line-height: 26px;
    }
    .weui-search-bar__cancel-btn, .weui-icon-search {
      line-height: 36px;
    }
  }
  .keshi {
    .con_wrapper {
      background-color: #fff;
      padding: 0 15px;
      margin-bottom: 15px;
      .item_con {
        padding: 15px 0;
        .left_con {
          white-space: nowrap;
          .hos_img {
            width: 110px;
            height: 83px;
            vertical-align: top;
          }
          .text_wrapper {
            margin-left: 10px;
            .titl {
              font-size: 15px;
              margin-bottom: 10px;
              line-height: 15px;
            }
            .desc {
              font-size: 12px;
              line-height: 12px;
              color: #a3a7a7;
              margin-bottom: 10px;
              .ff {
                display: inline-block;
                margin-right: 10px;
              }
            }
            .address {
              .addr_icon {
                width: 8px;
                height: 10px;
                margin-right: 5px;
              }
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 12px;
              line-height: 12px;
              color: #a3a7a7;
            }
            display: inline-block;
            max-width: calc(~"100% - 120px");
          }
        }
        .right_con {
          margin-left: 0!important;
          flex: 0 0 12%!important;
          text-align: right;
          color: #fea700;
        }
      }
      .text {
        font-size: 15px;
        height: 44px;
        line-height: 44px;
      }
    }
    .department {
      background-color: #fff;
      position: absolute;
      top:225px;
      width: 100%;
      bottom: 0;
      .left {
        background-color: #e2e2e2;
        height: 100%;
        overflow-y: scroll;
        .item {
          padding: 15px;
          color: #717171;
          &.active {
            background-color: #fff;
            color: #333;
          }
        }
      }
      .right {
        height: 100%;
        overflow-y: scroll;
        .item_detail {
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid #ebebeb;
          .fa-angle-right {
            float: right;
            line-height: 45px;
            padding-right: 15px;
            color: #c7c7cc;
            font-size: 20px;
          }
        }
      }
    }
    .popup_wrapper {
      position: fixed;
      top: 46px;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 120;
      padding: 20px;
      .content_box {
        background: #fff;
        position: relative;
        height: 100%;
        border-radius: 4px;
        .n_title {
          text-align: center;
          line-height: 40px;
          border-bottom: 1px solid #ededed;
        }
        .content {
          position: absolute;
          bottom: 41px;
          top: 41px;
          padding: 10px;
          overflow-y: auto;
          line-height: 30px;
          color: #777;
        }
        .footer {
          position: absolute;
          bottom: 0px;
          height: 40px;
          width: 100%;
          border-top: 1px solid #ededed;
          display: flex;
          a {
            line-height: 40px;
            flex: 1;
            box-sizing: border-box;
            text-align: center;
            &.accept {
              border-left: 1px solid #ededed;
            }
          }
        }
      }
    }
  }
</style>

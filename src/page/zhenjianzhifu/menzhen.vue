<template>
  <div class="menzhen">
    <x-header :left-options="{backText: ''}">{{name}}</x-header>
    <div class="main_content_wrapper" ref="content">
    <div>
      <div  @click="toGuahao(item)" class="item_con" v-for="(item, i) in list" :key="i">
        <flexbox class="flex_box">
          <flexbox-item class="left_con">
            <img class="doc_img" src="../../assets/doctor.png"/>
            <div class="text_wrapper">
              <div class="titl"><span>{{item.doctorName}}</span> <span>{{fmtTitle(item.doctorTitle)}}</span></div>
              <div class="desc"><span class="ff">4.8分</span><span>预约量 <span class="num">3000</span></span></div>
              <div class="hos_name">{{item.orgName}}</div>
            </div>
          </flexbox-item>
          <flexbox-item :span="3" class="right_con">
            <div><a class="btn collect">收藏</a></div>
            <div><a class="btn active">评价</a></div>
          </flexbox-item>
        </flexbox>
        <flexbox class="skill">
          <flexbox-item class="text">擅长：{{item.doctorDesc}}</flexbox-item>
          <flexbox-item class="right_icon"><i class="fa fa-angle-right"></i></flexbox-item>
        </flexbox>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Tab, TabItem, Flexbox, FlexboxItem} from 'vux'
import BScroll from 'better-scroll'
import api from '../../router/api'
export default {
  name: 'menzhen',
  components: {XHeader, Tab, TabItem, Flexbox, FlexboxItem},
  data () {
    return {
      list: [],
      orgCode: this.$route.params.orgCode,
      deptCode: this.$route.query.deptCode,
      name: this.$route.query.deptName
    }
  },
  mounted () {
    this.getList()
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    // 获取医生
    getList () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.001.003', {orgCode: this.orgCode, deptCode: this.deptCode})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.list = data.data
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    toGuahao (item) {
      this.$router.push('/guahao/' + this.orgCode + '?deptCode=' + this.deptCode + '&doctorCode=' + item.doctorCode)
    },
    _initScroll () {
      this.scroll = new BScroll(this.$refs.content, {
        click: true,
        pullUpLoad: {
          threshold: -40
        }
      })
      this.scroll.on('pullingUp', () => {
      })
    },
    fmtTitle (num) {
      if (num === 1) {
        return '住院医生'
      } else if (num === 2) {
        return '主治医生'
      } else if (num === 3) {
        return '副主任医生'
      } else if (num === 4) {
        return '名老专家'
      } else if (num === 0) {
        return '其他'
      }
    }
  }
}
</script>

<style scoped lang="less">
  .menzhen {
    .item_con {
      padding: 0 15px;
      background-color: #fff;
      box-sizing: border-box;
      margin-top: 15px;
      &:first-child {
        margin-top: 0;
      }
      .flex_box {
        padding: 15px 0;
      }
      .left_con {
        .doc_img {
          width: 45px;
          height: 45px;
          vertical-align: top;
        }
        .text_wrapper {
          display: inline-block;
          margin-left: 10px;
          .titl {
            margin-bottom: 8px;
            line-height: 15px;
          }
          .desc {
            font-size: 12px;
            margin-bottom: 8px;
            line-height: 12px;
            color: #a3a7a7;
            .ff {
              color: #ff9b0b;
              margin-right: 10px;
            }
            .num {
              color: #0084ff;
            }
          }
          .hos_name {
            color: #a3a7a7;
            font-size: 12px;
            line-height: 12px;

          }
        }
      }
      .right_con {
        text-align: right;
        .btn {
          padding: 5px 15px;
          color: #0084ff;
          border-radius: 6px;
          font-size: 12px;
          line-height: 12px;
          display: inline-block;
          border:1px solid #0084ff;
          &.collect {
            margin-bottom: 6px;
          }
          &.active {
            color: #fff;
            background-color: #0084ff;
          }
        }
      }
      .fa-angle-right {
        color: #c7c7cc;
        font-size: 20px;
      }
      .skill {
        height: 44px;
        line-height: 44px;
        color: #777;
        border-bottom: 1px solid #ebebeb;
        border-top: 1px solid #ebebeb;
        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .right_icon {
          flex: 0 0 10px;
          text-align: right;
        }
      }
      .appointment_time {
        height: 44px;
        line-height: 44px;
        color: #777;
        .right {
          float: right;
          .surplus {
            .num {
              color: #0084ff;
              margin-right: 10px;
            }
          }
        }
        .left {
          float: left;
          .date_img {
            width: 17px;
            height: 16px;
            vertical-align: text-top;
          }
        }
      }
    }
  }
</style>
